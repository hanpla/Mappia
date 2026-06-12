import axios from 'axios';

import type { DailyForecast, KmaParams } from '@/types/weather';

/**
 * 주소 문자열을 기상청 단기예보 격자(nx, ny) 및 중기예보 구역코드(regIdWeather, regIdTemp)로 매핑합니다.
 */
export const parseAddressToKmaParams = (address: string): KmaParams => {
  // 기본값: 서울특별시 중구 (청계천로 100 기준 또는 시청 기준)
  const defaultParams: KmaParams = {
    nx: 60,
    ny: 127,
    regIdWeather: '11B00000', // 서울, 인천, 경기도
    regIdTemp: '11B10101', // 서울
  };

  if (!address) return defaultParams;

  const trimmed = address.trim();
  const parts = trimmed.split(/\s+/);
  if (parts.length === 0) return defaultParams;

  const firstPart = parts[0];
  const secondPart = parts[1] || '';

  // 1. 서울특별시
  if (firstPart.startsWith('서울')) {
    return {
      nx: 60,
      ny: 127,
      regIdWeather: '11B00000',
      regIdTemp: '11B10101',
    };
  }

  // 2. 인천광역시
  if (firstPart.startsWith('인천')) {
    return {
      nx: 55,
      ny: 124,
      regIdWeather: '11B00000',
      regIdTemp: '11B20201',
    };
  }

  // 3. 경기도
  if (firstPart.startsWith('경기')) {
    // 경기 북부 (고양, 파주, 의정부, 동두천, 양주, 포천, 연천)
    const isNorth = [
      '고양',
      '파주',
      '의정부',
      '동두천',
      '양주',
      '포천',
      '연천',
    ].some((city) => secondPart.startsWith(city));
    if (isNorth) {
      return {
        nx: 60,
        ny: 120, // 경기 기본 격자
        regIdWeather: '11B00000',
        regIdTemp: '11B20301', // 의정부/고양 등 경기북부
      };
    }
    // 경기 남부 (수원, 성남, 안양, 부천, 광명, 평택, 안산, 과천, 오산, 시흥, 군포, 의왕, 하남, 용인, 이천, 안성, 김포, 화성, 광주, 여주, 양평)
    return {
      nx: 60,
      ny: 120, // 수원 기준
      regIdWeather: '11B00000',
      regIdTemp: '11B20601', // 수원
    };
  }

  // 4. 강원도 / 강원특별자치도
  if (firstPart.startsWith('강원')) {
    // 강원 영동 (강릉, 동해, 삼척, 속초, 고성, 양양, 태백)
    const isYeongdong = [
      '강릉',
      '동해',
      '삼척',
      '속초',
      '고성',
      '양양',
      '태백',
    ].some((city) => secondPart.startsWith(city));
    if (isYeongdong) {
      return {
        nx: 92,
        ny: 131, // 강릉 기준 격자
        regIdWeather: '11D20000', // 강원영동 구역코드
        regIdTemp: '11D20501', // 강릉 기온코드
      };
    }
    // 강원 영서 (춘천, 원주, 홍천, 횡성, 영월, 평창, 정선, 철원, 화천, 양구, 인제)
    return {
      nx: 73,
      ny: 134, // 춘천 기준 격자
      regIdWeather: '11D10000', // 강원영서 구역코드
      regIdTemp: '11D10301', // 춘천 기온코드
    };
  }

  // 5. 부산광역시
  if (firstPart.startsWith('부산')) {
    return {
      nx: 98,
      ny: 76,
      regIdWeather: '11H20000', // 부산, 울산, 경상남도
      regIdTemp: '11H20201', // 부산
    };
  }

  // 6. 대구광역시
  if (firstPart.startsWith('대구')) {
    return {
      nx: 89,
      ny: 90,
      regIdWeather: '11H10000', // 대구, 경상북도
      regIdTemp: '11H10701', // 대구
    };
  }

  // 7. 대전광역시
  if (firstPart.startsWith('대전')) {
    return {
      nx: 67,
      ny: 100,
      regIdWeather: '11C20000', // 대전, 세종, 충청남도
      regIdTemp: '11C20401', // 대전
    };
  }

  // 8. 광주광역시
  if (firstPart.startsWith('광주')) {
    return {
      nx: 58,
      ny: 74,
      regIdWeather: '11F20000', // 광주, 전라남도
      regIdTemp: '11F20501', // 광주
    };
  }

  // 9. 울산광역시
  if (firstPart.startsWith('울산')) {
    return {
      nx: 102,
      ny: 84,
      regIdWeather: '11H20000',
      regIdTemp: '11H20101', // 울산
    };
  }

  // 10. 세종특별자치시
  if (firstPart.startsWith('세종')) {
    return {
      nx: 66,
      ny: 103,
      regIdWeather: '11C20000',
      regIdTemp: '11C20401', // 세종/대전 부근
    };
  }

  // 11. 충청북도
  if (firstPart.startsWith('충청북') || firstPart.startsWith('충북')) {
    return {
      nx: 69,
      ny: 107, // 청주 기준
      regIdWeather: '11C10000', // 충청북도
      regIdTemp: '11C10301', // 청주
    };
  }

  // 12. 충청남도
  if (firstPart.startsWith('충청남') || firstPart.startsWith('충남')) {
    return {
      nx: 68,
      ny: 100, // 홍성 기준
      regIdWeather: '11C20000',
      regIdTemp: '11C20401', // 대전 기준 기온
    };
  }

  // 13. 전라북도 / 전북특별자치도
  if (firstPart.startsWith('전라북') || firstPart.startsWith('전북')) {
    return {
      nx: 63,
      ny: 89, // 전주 기준
      regIdWeather: '11F10000', // 전라북도
      regIdTemp: '11F10201', // 전주
    };
  }

  // 14. 전라남도
  if (firstPart.startsWith('전라남') || firstPart.startsWith('전남')) {
    return {
      nx: 58,
      ny: 74, // 목포/광주 중간 기준
      regIdWeather: '11F20000',
      regIdTemp: '11F20501', // 광주 기준 기온
    };
  }

  // 15. 경상북도
  if (firstPart.startsWith('경상북') || firstPart.startsWith('경북')) {
    return {
      nx: 91,
      ny: 106, // 안동 기준
      regIdWeather: '11H10000',
      regIdTemp: '11H10701', // 대구 기준 기온
    };
  }

  // 16. 경상남도
  if (firstPart.startsWith('경상남') || firstPart.startsWith('경남')) {
    return {
      nx: 90,
      ny: 77, // 창원 기준
      regIdWeather: '11H20000',
      regIdTemp: '11H20201', // 부산/창원 기준 기온
    };
  }

  // 17. 제주특별자치도
  if (firstPart.startsWith('제주')) {
    return {
      nx: 52,
      ny: 38, // 제주 기준 격자
      regIdWeather: '11G00000', // 제주도 구역코드
      regIdTemp: '11G00201', // 제주 기온코드
    };
  }

  return defaultParams;
};

/**
 * 체험 장소 주소 정보를 받아 서버 API를 통해 7일간의 날씨 예보 정보를 가져옵니다.
 * 문제 발생 시 예외를 던지며, 프론트엔드에서는 null 처리를 할 수 있도록 설계되었습니다.
 */
export const getWeatherForecast = async (
  address: string,
): Promise<DailyForecast[] | null> => {
  try {
    const params = parseAddressToKmaParams(address);
    const response = await axios.get<DailyForecast[]>('/api/weather', {
      params: {
        nx: params.nx,
        ny: params.ny,
        regIdWeather: params.regIdWeather,
        regIdTemp: params.regIdTemp,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch weather forecast:', error);
    return null;
  }
};
