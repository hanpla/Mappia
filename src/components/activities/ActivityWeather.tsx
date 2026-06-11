'use client';

import { ComponentType } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getWeatherForecast } from '@/lib/api/weather';

import type { IconProps } from '@/types/svg';
import type { DailyForecast, SkyStatus } from '@/types/weather';

import IconCloudy from '@/components/common/icon/IconCloudy';
import IconOvercast from '@/components/common/icon/IconOvercast';
import IconRainy from '@/components/common/icon/IconRainy';
import IconSnowy from '@/components/common/icon/IconSnowy';
import IconSun from '@/components/common/icon/IconSun';

// ----------------------------------------------------
// 1. 날씨 아이콘 매핑 객체 정의
// ----------------------------------------------------

const WEATHER_ICON_MAP: Record<SkyStatus, ComponentType<IconProps>> = {
  sunny: IconSun,
  cloudy: IconCloudy,
  overcast: IconOvercast,
  rainy: IconRainy,
  snowy: IconSnowy,
};

function WeatherIcon({ sky }: { sky: SkyStatus }) {
  const IconComponent = WEATHER_ICON_MAP[sky] || IconSun;
  return <IconComponent size={40} className="md:size-12" />;
}

// ----------------------------------------------------
// 2. 개별 일자 날씨 카드 컴포넌트
// ----------------------------------------------------

interface WeatherCardProps extends DailyForecast {
  isToday: boolean;
}

function WeatherCard({
  date,
  dayOfWeek,
  sky,
  rainProbability,
  tempMin,
  tempMax,
  isToday,
}: WeatherCardProps) {
  const dateObj = new Date(date);
  const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;

  return (
    <div className="flex w-20.5 shrink-0 flex-col items-center gap-1.5 rounded-2xl border border-stone-200/60 bg-white p-3 shadow-[0_2px_8px_rgba(17,34,17,0.02)] transition-all hover:border-stone-300 min-[480px]:w-full md:gap-2 md:p-4">
      {/* 요일 및 일자 */}
      <div className="text-center">
        <span
          className={`textxs-bold md:textsm-bold block ${
            isToday ? 'text-black-1B1 font-extrabold' : 'text-gray-4B4'
          }`}
        >
          {isToday ? '오늘' : `${dayOfWeek}요일`}
        </span>
        <span className="textxs-medium md:textsm-medium text-gray-A1A mt-0.5 block">
          {formattedDate}
        </span>
      </div>

      {/* 날씨 아이콘 */}
      <div className="my-1 flex items-center justify-center">
        <WeatherIcon sky={sky} />
      </div>

      {/* 강수 확률 (확률이 0% 이상일 때만 작게 표기) */}
      <div className="h-4">
        {rainProbability > 0 ? (
          <span className="textxs-medium md:textxs-semibold font-semibold text-sky-500">
            ☔ {rainProbability}%
          </span>
        ) : (
          <span className="text-[10px] font-normal text-stone-300 md:text-xs">
            맑음
          </span>
        )}
      </div>

      {/* 기온 레인지 */}
      <div className="textxs-semibold md:textsm-bold text-black-1B1 flex items-center gap-1">
        <span className="font-medium text-sky-600">{tempMin}°</span>
        <span className="text-gray-300">/</span>
        <span className="font-bold text-rose-600">{tempMax}°</span>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 3. 로딩 상태 스켈레톤 카드 컴포넌트
// ----------------------------------------------------

function SkeletonCard() {
  return (
    <div className="flex w-20.5 shrink-0 animate-pulse flex-col items-center gap-1.5 rounded-2xl border border-stone-200/60 bg-white p-3 shadow-[0_2px_8px_rgba(17,34,17,0.02)] min-[480px]:w-full md:gap-2 md:p-4">
      {/* 요일 및 일자 */}
      <div className="flex flex-col items-center text-center">
        <div className="h-3.5 w-8 rounded bg-stone-200 md:h-4 md:w-10" />
        <div className="mt-1 h-3 w-6 rounded bg-stone-100 md:h-3.5 md:w-8" />
      </div>

      {/* 날씨 아이콘 */}
      <div className="my-1 flex items-center justify-center">
        <div className="size-10 rounded-full bg-stone-200 md:size-12" />
      </div>

      {/* 강수 확률 */}
      <div className="flex h-4 items-center justify-center">
        <div className="h-3 w-8 rounded bg-stone-100" />
      </div>

      {/* 기온 레인지 */}
      <div className="flex h-4 items-center justify-center gap-1">
        <div className="h-3.5 w-5 rounded bg-stone-200 md:h-4 md:w-6" />
        <span className="text-xs font-normal text-stone-200">/</span>
        <div className="h-3.5 w-5 rounded bg-stone-200 md:h-4 md:w-6" />
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 4. 메인 날씨 컴포넌트 (Default Export)
// ----------------------------------------------------

interface ActivityWeatherProps {
  address: string;
}

export default function ActivityWeather({ address }: ActivityWeatherProps) {
  const {
    data: forecasts,
    isLoading,
    isError,
  } = useQuery<DailyForecast[] | null>({
    queryKey: ['weather', address],
    queryFn: () => getWeatherForecast(address),
    enabled: !!address,
    staleTime: 1000 * 60 * 60, // 1시간 동안 캐시 유지
    retry: 1, // 실패 시 1회만 재시도
  });

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <section className="space-y-3 border-b border-[#E0E0E5] pb-5 md:pb-7.5 lg:pb-10">
        <div>
          <h3 className="textlg-bold md:text2lg-bold">
            체험 장소 5일 날씨 예보
          </h3>
          <div className="mt-1.5 h-3 w-60 animate-pulse rounded bg-stone-200 md:h-3.5 md:w-80" />
        </div>
        <div className="scrollbar-hide flex gap-2.5 overflow-x-auto pb-1 min-[480px]:grid min-[480px]:grid-cols-5 min-[480px]:gap-3 min-[480px]:overflow-visible md:gap-4">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <SkeletonCard key={i} />
            ))}
        </div>
      </section>
    );
  }

  // 에러 발생 및 데이터가 없을 경우 null 처리 (주문하신 요구사항: 그냥 받아올 수 없으면 null 처리)
  if (isError || !forecasts || forecasts.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3 border-b border-[#E0E0E5] pb-5 md:pb-7.5 lg:pb-10">
      <div>
        <h3 className="textlg-bold md:text2lg-bold">체험 장소 5일 날씨 예보</h3>
        <p className="textxs-medium md:textsm-medium text-gray-A1A mt-0.5">
          기상청 실시간 예보 정보를 바탕으로 예약 일정을 세워보세요.
        </p>
      </div>

      <div className="scrollbar-hide flex gap-2.5 overflow-x-auto pb-1 min-[480px]:grid min-[480px]:grid-cols-5 min-[480px]:gap-3 min-[480px]:overflow-visible md:gap-4">
        {forecasts.map((forecast, index) => (
          <WeatherCard
            key={forecast.date}
            {...forecast}
            isToday={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
