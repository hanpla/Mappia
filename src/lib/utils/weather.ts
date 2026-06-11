import type { SkyStatus } from '@/types/weather';

/**
 * 단기예보 기준 시간 계산 헬퍼 (0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300)
 */
export const getShortTermBaseDateTime = (): {
  baseDate: string;
  baseTime: string;
} => {
  const offsetNow = new Date();
  const utc = offsetNow.getTime() + offsetNow.getTimezoneOffset() * 60000;
  const kst = new Date(utc + 9 * 60 * 60000); // KST (UTC+9)

  const yyyy = kst.getFullYear();
  const mm = String(kst.getMonth() + 1).padStart(2, '0');
  const dd = String(kst.getDate()).padStart(2, '0');
  const hh = kst.getHours();
  const min = kst.getMinutes();

  let baseDate = `${yyyy}${mm}${dd}`;
  let baseTime = '0500';

  // 발표 시간 15분 이후에 데이터가 생성되므로 안전하게 15분 마진을 둡니다.
  if (hh < 2 || (hh === 2 && min < 15)) {
    const yesterday = new Date(kst.getTime() - 24 * 60 * 60 * 1000);
    const yyyyy = yesterday.getFullYear();
    const ymm = String(yesterday.getMonth() + 1).padStart(2, '0');
    const ydd = String(yesterday.getDate()).padStart(2, '0');
    baseDate = `${yyyyy}${ymm}${ydd}`;
    baseTime = '2300';
  } else if (hh < 5 || (hh === 5 && min < 15)) {
    baseTime = '0200';
  } else if (hh < 8 || (hh === 8 && min < 15)) {
    baseTime = '0500';
  } else if (hh < 11 || (hh === 11 && min < 15)) {
    baseTime = '0800';
  } else if (hh < 14 || (hh === 14 && min < 15)) {
    baseTime = '1100';
  } else if (hh < 17 || (hh === 17 && min < 15)) {
    baseTime = '1400';
  } else if (hh < 20 || (hh === 20 && min < 15)) {
    baseTime = '1700';
  } else if (hh < 23 || (hh === 23 && min < 15)) {
    baseTime = '2000';
  } else {
    baseTime = '2300';
  }

  return { baseDate, baseTime };
};

/**
 * 중기예보 발표 시간 계산 헬퍼 (0600, 1800)
 */
export const getMidTermBaseDateTime = (): string => {
  const offsetNow = new Date();
  const utc = offsetNow.getTime() + offsetNow.getTimezoneOffset() * 60000;
  const kst = new Date(utc + 9 * 60 * 60000);

  const yyyy = kst.getFullYear();
  const mm = String(kst.getMonth() + 1).padStart(2, '0');
  const dd = String(kst.getDate()).padStart(2, '0');
  const hh = kst.getHours();
  const min = kst.getMinutes();

  // 06:15 이전이면 어제 18:00
  if (hh < 6 || (hh === 6 && min < 15)) {
    const yesterday = new Date(kst.getTime() - 24 * 60 * 60 * 1000);
    const yyyyy = yesterday.getFullYear();
    const ymm = String(yesterday.getMonth() + 1).padStart(2, '0');
    const ydd = String(yesterday.getDate()).padStart(2, '0');
    return `${yyyyy}${ymm}${ydd}1800`;
  }
  // 06:15 ~ 18:15 사이면 오늘 06:00
  if (hh < 18 || (hh === 18 && min < 15)) {
    return `${yyyy}${mm}${dd}0600`;
  }
  // 18:15 이후면 오늘 18:00
  return `${yyyy}${mm}${dd}1800`;
};

/**
 * 요일 반환 헬퍼 (YYYY-MM-DD -> 요일)
 */
export const getDayOfWeek = (dateStr: string): string => {
  const year = parseInt(dateStr.substring(0, 4));
  const month = parseInt(dateStr.substring(5, 7)) - 1;
  const day = parseInt(dateStr.substring(8, 10));
  const date = new Date(year, month, day);
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  return week[date.getDay()];
};

/**
 * 날짜 포맷 변환 (YYYYMMDD -> YYYY-MM-DD)
 */
export const formatDate = (dateStr: string): string => {
  return `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;
};

/**
 * 중기 날씨 텍스트를 SkyStatus로 변환
 */
export const parseMidWeather = (wf: string): SkyStatus => {
  if (wf.includes('비') || wf.includes('소나기')) return 'rainy';
  if (wf.includes('눈')) return 'snowy';
  if (wf.includes('맑음')) return 'sunny';
  if (wf.includes('구름많음')) return 'cloudy';
  if (wf.includes('흐림')) return 'overcast';
  return 'sunny';
};
