'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';

import type { ActivitySort } from '@/lib/api/activities';

import { useActivities, usePopularActivities } from '@/hooks/useActivities';

import type { ActivityCategory, BaseActivity } from '@/types/activities';

import CategoryButton from '@/components/common/button/CategoryButton';
import SortDropdown from '@/components/common/dropdown/SortDropdown';
import IconChevronLeft from '@/components/common/icon/IconChevronLeft';
import IconChevronRight from '@/components/common/icon/IconChevronRight';
import ImageWithFallback from '@/components/common/image/ImageWithFallback';
import Pagination from '@/components/common/pagination/Pagination';
import Searchbar from '@/components/searchbar/Searchbar';

const CATEGORIES: ActivityCategory[] = [
  '문화 · 예술',
  '식음료',
  '스포츠',
  '투어',
  '관광',
  '웰빙',
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-yellow-FFC flex items-center gap-0.5 text-xs font-semibold">
      ★ {rating}
    </span>
  );
}

function PopularActivityCard({ activity }: { activity: BaseActivity }) {
  return (
    <Link
      href={`/activities/${activity.id}`}
      className="group relative w-56 shrink-0 cursor-pointer overflow-hidden rounded-2xl md:w-96"
    >
      <div className="relative h-40 overflow-hidden md:h-96">
        <ImageWithFallback
          src={activity.bannerImageUrl}
          alt={activity.title}
          fill
          sizes="(max-width: 768px) 224px, 384px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
        <div className="text-white-FFF absolute bottom-0 left-0 p-3 md:p-4">
          <div className="mb-1 flex items-center gap-1">
            <StarRating rating={activity.rating} />
            <span className="text-white-FFF/70 text-xs">
              ({activity.reviewCount})
            </span>
          </div>
          <p className="line-clamp-2 max-w-[146px] text-[18px] leading-snug font-bold md:max-w-[251px] md:text-[32px]">
            {activity.title}
          </p>
          <p className="mt-1 text-[16px] font-bold md:text-[20px]">
            ₩ {activity.price.toLocaleString()}
            <span className="text-gray-A1A text-[14px] font-normal"> / 인</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

function ActivityCard({ activity }: { activity: BaseActivity }) {
  return (
    <Link
      href={`/activities/${activity.id}`}
      className="group w-full cursor-pointer"
    >
      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-2xl">
        <ImageWithFallback
          src={activity.bannerImageUrl}
          alt={activity.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div>
        <div className="mb-1 flex items-center gap-1">
          <StarRating rating={activity.rating} />
          <span className="text-gray-A1A text-xs">
            ({activity.reviewCount})
          </span>
        </div>
        <p className="text-black-1B1 line-clamp-2 text-sm leading-snug font-medium">
          {activity.title}
        </p>
        <p className="text-black-1B1 mt-1 text-sm font-bold">
          ₩ {activity.price.toLocaleString()} / 인
        </p>
      </div>
    </Link>
  );
}

function MainPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams?.get('page')) || 1;
  const activeCategory =
    (searchParams?.get('category') as ActivityCategory | null) ?? null;
  const keyword = searchParams?.get('keyword') ?? '';
  const sort = (searchParams?.get('sort') as ActivitySort | null) ?? undefined;

  const [searchValue, setSearchValue] = useState(keyword);

  const [visibleCount, setVisibleCount] = useState(12);

  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const [isPc, setIsPc] = useState(false);

  const { data: popularData } = usePopularActivities(10);
  const popularActivities = popularData?.activities ?? [];

  const heroActivity = popularActivities[0];
  const HERO_FALLBACK_IMAGE =
    'https://images.unsplash.com/photo-1545959570-a94084071b5d';

  const {
    data: allData,
    isLoading,
    isError,
  } = useActivities({
    method: 'offset',
    page: currentPage,
    size: visibleCount,
    category: activeCategory ?? undefined,
    keyword: keyword || undefined,
    sort,
  });
  const allActivities = allData?.activities ?? [];
  const totalCount = allData?.totalCount ?? 0;

  const updateQuery = (mutate: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    mutate(params);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCategoryClick = (category: ActivityCategory) => {
    updateQuery((params) => {
      if (activeCategory === category) {
        params.delete('category');
      } else {
        params.set('category', category);
      }
    });
  };

  const handleAllClick = () => {
    updateQuery((params) => params.delete('category'));
  };

  const handleSearchSubmit = () => {
    updateQuery((params) => {
      const trimmed = searchValue.trim();
      if (trimmed) {
        params.set('keyword', trimmed);
      } else {
        params.delete('keyword');
      }
    });
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsPc(width >= 1024);

      if (width >= 1024) {
        setVisibleCount(8);
      } else if (width >= 768) {
        setVisibleCount(9);
      } else {
        setVisibleCount(4);
      }

      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (track && viewport) {
        const max = Math.max(0, track.scrollWidth - viewport.clientWidth);
        setMaxOffset(max);
        setOffset((prev) => Math.min(prev, max));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [popularActivities.length]);

  const effectiveOffset = isPc ? offset : 0;
  const isScrollableLeft = effectiveOffset > 0;
  const isScrollableRight = effectiveOffset < maxOffset;

  const CARDS_PER_MOVE = 2;

  const getCardStep = () => {
    const track = trackRef.current;
    if (!track || track.children.length < 2) {
      return track?.children[0]?.getBoundingClientRect().width ?? 0;
    }
    const first = track.children[0].getBoundingClientRect();
    const second = track.children[1].getBoundingClientRect();
    return second.left - first.left;
  };

  const moveTrack = (direction: 'left' | 'right') => {
    const step = getCardStep();
    if (step <= 0) return;
    const amount = step * CARDS_PER_MOVE;
    setOffset((prev) => {
      const next = direction === 'left' ? prev - amount : prev + amount;
      return Math.min(Math.max(0, next), maxOffset);
    });
  };

  return (
    <>
      <section className="relative right-1/2 left-1/2 mx-[-50vw] h-60 w-screen overflow-hidden md:h-[550px]">
        <ImageWithFallback
          src={heroActivity?.bannerImageUrl ?? HERO_FALLBACK_IMAGE}
          alt={heroActivity?.title ?? 'hero'}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/30" />
        {heroActivity ? (
          <Link
            href={`/activities/${heroActivity.id}`}
            className="inner absolute inset-0 flex flex-col justify-center"
          >
            <p className="text-white-FFF/80 text-[14px] md:text-[26px]">
              🔥 이달의 인기 체험
            </p>
            <h1 className="text-white-FFF mt-2 line-clamp-2 max-w-[600px] text-[24px] leading-tight font-bold md:text-[54px] lg:text-[68px]">
              {heroActivity.title}
            </h1>
          </Link>
        ) : (
          <div className="inner absolute inset-0 flex flex-col justify-center">
            <h1 className="text-white-FFF text-[24px] leading-tight font-bold md:text-[54px] lg:text-[68px]">
              함께 배우면 즐거운
              <br />
              스트릿 댄스
            </h1>
            <p className="text-white-FFF/80 mt-2 text-[14px] md:text-[26px]">
              이달의 인기 체험 BEST 🔥
            </p>
          </div>
        )}
      </section>

      <div className="relative z-10 -mt-6">
        <Searchbar
          value={searchValue}
          setValue={setSearchValue}
          onSubmit={handleSearchSubmit}
        />
      </div>

      <section className="mt-6 mb-8 md:mt-8 md:mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-black-1B1 text-[21px] font-bold md:text-[43px]">
            🔥 인기 체험
          </h2>
          <div className="hidden gap-1 lg:flex">
            <button
              aria-label="이전"
              onClick={() => moveTrack('left')}
              disabled={!isScrollableLeft}
              className={`flex h-11 w-11 items-center justify-center ${
                isScrollableLeft
                  ? 'hover:bg-gray-FAF cursor-pointer rounded-full transition-colors'
                  : 'cursor-default'
              }`}
            >
              <IconChevronLeft
                size={44}
                color={isScrollableLeft ? '#4B4B4B' : '#A1A1A1'}
              />
            </button>
            <button
              aria-label="다음"
              onClick={() => moveTrack('right')}
              disabled={!isScrollableRight}
              className={`flex h-11 w-11 items-center justify-center ${
                isScrollableRight
                  ? 'hover:bg-gray-FAF cursor-pointer rounded-full transition-colors'
                  : 'cursor-default'
              }`}
            >
              <IconChevronRight
                size={44}
                color={isScrollableRight ? '#4B4B4B' : '#A1A1A1'}
              />
            </button>
          </div>
        </div>
        <div
          ref={viewportRef}
          className="scrollbar-hide overflow-x-auto pb-2 lg:overflow-x-hidden"
        >
          <div
            ref={trackRef}
            className="flex gap-3 transition-transform duration-300 ease-out md:gap-4"
            style={{
              transform: isPc ? `translateX(-${effectiveOffset}px)` : undefined,
            }}
          >
            {popularActivities.map((activity) => (
              <PopularActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </section>

      <div className="mb-5 flex items-center justify-between gap-2">
        <div className="scrollbar-hide flex min-w-0 flex-1 gap-2 overflow-x-auto">
          <CategoryButton
            size="sm"
            isActive={activeCategory === null}
            className="h-[41px] w-[80px] shrink-0 px-1 whitespace-nowrap md:h-[58px] md:w-[120px] md:px-5 lg:w-[127px]"
            onClick={handleAllClick}
          >
            전체
          </CategoryButton>
          {CATEGORIES.map((category) => (
            <CategoryButton
              key={category}
              size="sm"
              isActive={activeCategory === category}
              className="h-[41px] w-[80px] shrink-0 px-1 whitespace-nowrap md:h-[58px] md:w-[120px] md:px-5 lg:w-[127px]"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </CategoryButton>
          ))}
        </div>
        <div className="relative shrink-0">
          <div
            aria-hidden
            className="via-ivory-F2E/80 to-ivory-F2E pointer-events-none absolute top-0 right-full bottom-0 w-10 bg-linear-to-r from-transparent lg:hidden"
          />
          <SortDropdown className="h-[41px] w-[80px] min-w-0 px-3 md:h-[58px] md:w-[120px] md:px-5 lg:w-[127px]" />
        </div>
      </div>

      <section className="mb-8 md:mb-10">
        <h2 className="text-black-1B1 mb-4 text-[21px] font-bold md:text-[43px]">
          🛼 모든 체험
        </h2>
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 md:gap-x-4 lg:grid-cols-4">
          {allActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
        {!isLoading && isError && (
          <p className="text-gray-A1A py-20 text-center">
            체험 목록을 불러오지 못했습니다.
          </p>
        )}
        {!isLoading && !isError && allActivities.length === 0 && (
          <p className="text-gray-A1A py-20 text-center">
            검색 결과가 없습니다.
          </p>
        )}
      </section>

      <div className="flex items-center justify-center">
        <Pagination totalCount={totalCount} pageSize={visibleCount} />
      </div>
    </>
  );
}

export default function MainPage() {
  return (
    <Suspense fallback={null}>
      <MainPageContent />
    </Suspense>
  );
}
