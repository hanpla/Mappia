import { NextResponse } from 'next/server';

import axios from 'axios';

import {
  formatDate,
  getDayOfWeek,
  getMidTermBaseDateTime,
  getShortTermBaseDateTime,
  parseMidWeather,
} from '@/lib/utils/weather';

import type { DailyForecast, SkyStatus } from '@/types/weather';

interface KmaShortTermItem {
  fcstDate: string;
  fcstTime: string;
  category: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

const BASE_URL = 'https://apihub.kma.go.kr/api/typ02/openApi';
const AUTH_KEY = process.env.WEATHER_API_KEY;

export const GET = async (request: Request) => {
  if (!AUTH_KEY) {
    return NextResponse.json(
      { error: 'Weather API Key is not configured.' },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const nx = searchParams.get('nx');
  const ny = searchParams.get('ny');
  const regIdWeather = searchParams.get('regIdWeather');
  const regIdTemp = searchParams.get('regIdTemp');

  if (!nx || !ny || !regIdWeather || !regIdTemp) {
    return NextResponse.json(
      { error: 'Missing required parameters.' },
      { status: 400 },
    );
  }

  try {
    const { baseDate, baseTime } = getShortTermBaseDateTime();
    const tmFc = getMidTermBaseDateTime();

    // 1. 단기예보 호출 (1일차 ~ 3일차)
    const shortTermUrl = `${BASE_URL}/VilageFcstInfoService_2.0/getVilageFcst`;
    const shortTermRes = await axios.get(shortTermUrl, {
      params: {
        authKey: AUTH_KEY,
        dataType: 'JSON',
        numOfRows: 1000,
        pageNo: 1,
        base_date: baseDate,
        base_time: baseTime,
        nx,
        ny,
      },
      timeout: 10000,
    });

    const shortTermData = shortTermRes.data;
    if (
      typeof shortTermData === 'string' &&
      (shortTermData.includes('OpenAPI_ServiceResponse') ||
        shortTermData.includes('SERVICE ERROR'))
    ) {
      throw new Error(
        `KMA Short-term API returned XML error: ${shortTermData}`,
      );
    }

    const shortItems = shortTermData?.response?.body?.items?.item;
    if (!shortItems || !Array.isArray(shortItems)) {
      throw new Error('Failed to retrieve items from KMA Short-term API.');
    }

    // 단기예보 데이터 가공
    const dailyDataMap: Record<
      string,
      {
        tmpList: number[];
        popList: number[];
        skyList: string[];
        ptyList: number[];
      }
    > = {};

    shortItems.forEach((item: KmaShortTermItem) => {
      const date = item.fcstDate;
      const category = item.category;
      const value = item.fcstValue;

      if (!dailyDataMap[date]) {
        dailyDataMap[date] = {
          tmpList: [],
          popList: [],
          skyList: [],
          ptyList: [],
        };
      }

      const valNum = Number(value);

      if (category === 'TMP') {
        dailyDataMap[date].tmpList.push(valNum);
      } else if (category === 'POP') {
        dailyDataMap[date].popList.push(valNum);
      } else if (category === 'SKY') {
        dailyDataMap[date].skyList.push(value);
      } else if (category === 'PTY') {
        dailyDataMap[date].ptyList.push(valNum);
      }
    });

    // 오늘부터 3일간의 데이터 정렬
    const sortedDates = Object.keys(dailyDataMap).sort();
    const shortForecasts: DailyForecast[] = [];

    // 최대 3일만 단기예보에서 채움
    for (let i = 0; i < Math.min(3, sortedDates.length); i++) {
      const dateStr = sortedDates[i];
      const data = dailyDataMap[dateStr];

      const formatted = formatDate(dateStr);
      const tempMin = data.tmpList.length > 0 ? Math.min(...data.tmpList) : 15;
      const tempMax = data.tmpList.length > 0 ? Math.max(...data.tmpList) : 25;
      const rainProbability =
        data.popList.length > 0 ? Math.max(...data.popList) : 0;

      // 대표 날씨 상태 결정 (우선순위: 눈/비 > 흐림 > 구름많음 > 맑음)
      let sky: SkyStatus = 'sunny';
      const maxPty = data.ptyList.length > 0 ? Math.max(...data.ptyList) : 0;

      if (maxPty > 0) {
        sky = maxPty === 3 ? 'snowy' : 'rainy';
      } else if (data.skyList.length > 0) {
        // 가장 많이 나타난 하늘상태 추출
        const counts: Record<string, number> = {};
        data.skyList.forEach((s) => {
          counts[s] = (counts[s] || 0) + 1;
        });
        const modeSky = Object.keys(counts).reduce((a, b) =>
          counts[a] > counts[b] ? a : b,
        );

        if (modeSky === '4') sky = 'overcast';
        else if (modeSky === '3') sky = 'cloudy';
        else sky = 'sunny';
      }

      shortForecasts.push({
        date: formatted,
        dayOfWeek: getDayOfWeek(formatted),
        sky,
        rainProbability,
        tempMin: Math.round(tempMin),
        tempMax: Math.round(tempMax),
      });
    }

    // 2. 중기예보 호출 (4일차 ~ 7일차)
    const midLandUrl = `${BASE_URL}/MidFcstInfoService/getMidLandFcst`;
    const midTempUrl = `${BASE_URL}/MidFcstInfoService/getMidTa`;

    const [midLandRes, midTempRes] = await Promise.all([
      axios.get(midLandUrl, {
        params: {
          authKey: AUTH_KEY,
          dataType: 'JSON',
          numOfRows: 10,
          pageNo: 1,
          regId: regIdWeather,
          tmFc,
        },
        timeout: 10000,
      }),
      axios.get(midTempUrl, {
        params: {
          authKey: AUTH_KEY,
          dataType: 'JSON',
          numOfRows: 10,
          pageNo: 1,
          regId: regIdTemp,
          tmFc,
        },
        timeout: 10000,
      }),
    ]);

    const midLandData = midLandRes.data;
    const midTempData = midTempRes.data;

    if (
      typeof midLandData === 'string' &&
      (midLandData.includes('OpenAPI_ServiceResponse') ||
        midLandData.includes('SERVICE ERROR'))
    ) {
      throw new Error(`KMA Mid-Land API returned XML error: ${midLandData}`);
    }
    if (
      typeof midTempData === 'string' &&
      (midTempData.includes('OpenAPI_ServiceResponse') ||
        midTempData.includes('SERVICE ERROR'))
    ) {
      throw new Error(`KMA Mid-Temp API returned XML error: ${midTempData}`);
    }

    const landItems = midLandData?.response?.body?.items?.item;
    const tempItems = midTempData?.response?.body?.items?.item;

    if (
      !landItems ||
      !tempItems ||
      landItems.length === 0 ||
      tempItems.length === 0
    ) {
      throw new Error('Failed to retrieve items from KMA Mid-term APIs.');
    }

    const land = landItems[0];
    const temp = tempItems[0];

    const offsetNow = new Date();
    const utc = offsetNow.getTime() + offsetNow.getTimezoneOffset() * 60000;
    const today = new Date(utc + 9 * 60 * 60 * 1000); // KST
    const midForecasts: DailyForecast[] = [];

    // 중기 예보에서 4일차(오늘+3일) ~ 5일차(오늘+4일)를 추출 (총 5일 예보)
    // KMA 중기 예보에서 3일 후 예보는 index 3 (즉 taMin3, rnSt3Am 등)에 대응합니다.
    for (let dayIndex = 3; dayIndex <= 4; dayIndex++) {
      const targetDate = new Date(
        today.getTime() + dayIndex * 24 * 60 * 60 * 1000,
      );
      const targetDateStr = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')}`;

      const rnStAm = land[`rnSt${dayIndex}Am`] ?? 0;
      const rnStPm = land[`rnSt${dayIndex}Pm`] ?? 0;
      const wfAm = land[`wf${dayIndex}Am`] ?? '';
      const wfPm = land[`wf${dayIndex}Pm`] ?? '';

      const maxRainProb = Math.max(Number(rnStAm), Number(rnStPm));

      // 날씨 상태 결정 (오후 날씨 상태를 우선하되, 비/눈이 있으면 비/눈 우선)
      let sky: SkyStatus = 'sunny';
      if (
        wfAm.includes('비') ||
        wfPm.includes('비') ||
        wfAm.includes('소나기') ||
        wfPm.includes('소나기')
      ) {
        sky = 'rainy';
      } else if (wfAm.includes('눈') || wfPm.includes('눈')) {
        sky = 'snowy';
      } else {
        sky = parseMidWeather(wfPm || wfAm);
      }

      const tempMin = temp[`taMin${dayIndex}`] ?? 15;
      const tempMax = temp[`taMax${dayIndex}`] ?? 25;

      midForecasts.push({
        date: targetDateStr,
        dayOfWeek: getDayOfWeek(targetDateStr),
        sky,
        rainProbability: maxRainProb,
        tempMin: Math.round(Number(tempMin)),
        tempMax: Math.round(Number(tempMax)),
      });
    }

    // 1~3일차 단기예보 + 4~5일차 중기예보 병합 (총 5일 예보)
    const combinedForecasts = [...shortForecasts, ...midForecasts];

    return NextResponse.json(combinedForecasts);
  } catch (error) {
    console.error('KMA weather API fetch error:', error);
    // 문제 발생 시 예외를 던지며, 클라이언트는 null을 받도록 500 에러를 리턴합니다.
    return NextResponse.json(null, { status: 500 });
  }
};
