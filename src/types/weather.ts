export type SkyStatus = 'sunny' | 'cloudy' | 'overcast' | 'rainy' | 'snowy';

export interface DailyForecast {
  date: string; // "YYYY-MM-DD"
  dayOfWeek: string; // "일" ~ "토"
  sky: SkyStatus;
  rainProbability: number; // 0 ~ 100
  tempMin: number;
  tempMax: number;
}

export interface KmaParams {
  nx: number;
  ny: number;
  regIdWeather: string;
  regIdTemp: string;
}
