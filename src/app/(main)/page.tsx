'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';

import CategoryButton from '@/components/common/button/CategoryButton';
import SortDropdown from '@/components/common/dropdown/SortDropdown';
import IconChevronLeft from '@/components/common/icon/IconChevronLeft';
import IconChevronRight from '@/components/common/icon/IconChevronRight';
import Pagination from '@/components/common/pagination/Pagination';
import Searchbar from '@/components/searchbar/Searchbar';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Activity {
  id: number;
  title: string;
  rating: number;
  reviewCount: number;
  price: number;
  imageUrl: string;
  category: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const POPULAR_ACTIVITIES: Activity[] = [
  {
    id: 1,
    title: '함께 배우면 즐거운 스트릿 댄스',
    rating: 4.9,
    reviewCount: 793,
    price: 38000,
    imageUrl:
      'https://images.unsplash.com/photo-1545959570-a94084071b5d?w=400&q=80',
    category: '문화·예술',
  },
  {
    id: 2,
    title: '연인과 사랑의 징검다리 건너기',
    rating: 4.9,
    reviewCount: 593,
    price: 5600,
    imageUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    category: '투어',
  },
  {
    id: 3,
    title: 'VR 게임 마스터 하는 법',
    rating: 4.9,
    reviewCount: 241,
    price: 38000,
    imageUrl:
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&q=80',
    category: '스포츠',
  },
  {
    id: 4,
    title: '피오르 체험',
    rating: 3.9,
    reviewCount: 106,
    price: 42800,
    imageUrl:
      'https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=400&q=80',
    category: '투어',
  },
];

const ALL_ACTIVITIES: Activity[] = [
  {
    id: 5,
    title: '해안가 마을에서 1주일 살아보기',
    rating: 2.9,
    reviewCount: 67,
    price: 217000,
    imageUrl:
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=80',
    category: '투어',
  },
  {
    id: 6,
    title: '부모님과 함께 갈대숲 체험',
    rating: 4.0,
    reviewCount: 113,
    price: 6000,
    imageUrl:
      'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&q=80',
    category: '문화·예술',
  },
  {
    id: 7,
    title: '열기구 페스티벌',
    rating: 4.1,
    reviewCount: 85,
    price: 35000,
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    category: '스포츠',
  },
  {
    id: 8,
    title: '베트남 자전거 여행',
    rating: 3.9,
    reviewCount: 108,
    price: 42800,
    imageUrl:
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&q=80',
    category: '투어',
  },
  {
    id: 9,
    title: '다양한 딸대어 구경하기',
    rating: 2.9,
    reviewCount: 67,
    price: 217000,
    imageUrl:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80',
    category: '관광',
  },
  {
    id: 10,
    title: '세상에서 가장 멋진 석양',
    rating: 4.0,
    reviewCount: 113,
    price: 6000,
    imageUrl:
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80',
    category: '관광',
  },
  {
    id: 11,
    title: '여행 가이드와 함께하는 숲',
    rating: 4.1,
    reviewCount: 85,
    price: 35000,
    imageUrl:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80',
    category: '투어',
  },
  {
    id: 12,
    title: '썰매견과 함께 히말라야 건너기',
    rating: 3.9,
    reviewCount: 108,
    price: 42800,
    imageUrl:
      'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&q=80',
    category: '투어',
  },
  {
    id: 13,
    title: '함께 배우면 즐거운 스트릿 댄스',
    rating: 4.9,
    reviewCount: 793,
    price: 38000,
    imageUrl:
      'https://images.unsplash.com/photo-1545959570-a94084071b5d?w=400&q=80',
    category: '문화·예술',
  },
  {
    id: 14,
    title: '연인과 사랑의 징검다리 건너기',
    rating: 4.9,
    reviewCount: 593,
    price: 5600,
    imageUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    category: '투어',
  },
  {
    id: 15,
    title: 'VR 게임 마스터 하는 법',
    rating: 4.9,
    reviewCount: 241,
    price: 38000,
    imageUrl:
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&q=80',
    category: '스포츠',
  },

  {
    id: 16,
    title: '피오르 체험',
    rating: 3.9,
    reviewCount: 106,
    price: 42800,
    imageUrl:
      'https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=400&q=80',
    category: '투어',
  },
];

const CATEGORIES = ['문화·예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-yellow-FFC flex items-center gap-0.5 text-xs font-semibold">
      ★ {rating}
    </span>
  );
}

function PopularActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="group relative w-56 flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl md:w-96">
      <div className="relative h-40 overflow-hidden md:h-96">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activity.imageUrl}
          alt={activity.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
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
    </div>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="group w-[168px] cursor-pointer md:w-[221px] lg:w-[283px]">
      <div className="mb-3 h-[168px] w-[168px] overflow-hidden rounded-2xl md:h-[221px] md:w-[221px] lg:h-[283px] lg:w-[283px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activity.imageUrl}
          alt={activity.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
    </div>
  );
}

function MainPageContent() {
  const [searchValue, setSearchValue] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get('page')) || 1;

  const [pageSize, setPageSize] = useState(8);

  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const [isPc, setIsPc] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsPc(width >= 1024);

      if (width >= 1024) {
        setPageSize(8);
      } else if (width >= 768) {
        setPageSize(9);
      } else {
        setPageSize(4);
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
  }, []);

  const effectiveOffset = isPc ? offset : 0;
  const isScrollableLeft = effectiveOffset > 0;
  const isScrollableRight = effectiveOffset < maxOffset;

  const moveTrack = (direction: 'left' | 'right') => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const amount = viewport.clientWidth * 0.8;
    setOffset((prev) => {
      const next = direction === 'left' ? prev - amount : prev + amount;
      return Math.min(Math.max(0, next), maxOffset);
    });
  };

  const filteredActivities = ALL_ACTIVITIES.filter((a) =>
    activeCategory ? a.category === activeCategory : true,
  );

  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredActivities.length / pageSize),
  );
  const safePage = Math.min(currentPage, totalPages);
  const visibleActivities =
    paginatedActivities.length > 0
      ? paginatedActivities
      : filteredActivities.slice(
          (safePage - 1) * pageSize,
          safePage * pageSize,
        );

  useEffect(() => {
    if (currentPage > totalPages) {
      const params = new URLSearchParams(searchParams?.toString());
      params.set('page', String(totalPages));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [currentPage, totalPages, pathname, router, searchParams]);

  return (
    <>
      <section className="relative right-1/2 left-1/2 -mx-[50vw] h-60 w-screen overflow-hidden md:h-[550px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1545959570-a94084071b5d?w=1200&q=80"
          alt="hero"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        <div className="inner absolute inset-0 flex flex-col justify-center">
          <h1 className="text-white-FFF text-[24px] leading-tight font-bold md:text-[54px] lg:text-[68px]">
            함께 배우면 즐거운
            <br />
            스트릿 댄스
          </h1>
          <p className="text-white-FFF/80 mt-2 text-[14px] md:text-[26px]">
            1월의 인기 체험 BEST 🔥
          </p>
        </div>
      </section>

      <div className="relative z-10 -mt-6">
        <Searchbar value={searchValue} setValue={setSearchValue} />
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
            {POPULAR_ACTIVITIES.map((activity) => (
              <PopularActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </section>

      <div className="mb-5 flex items-center justify-between gap-2">
        <div className="scrollbar-hide flex min-w-0 flex-1 gap-2 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <CategoryButton
              key={cat}
              size="sm"
              isActive={activeCategory === cat}
              className="h-[41px] w-[80px] shrink-0 px-1 whitespace-nowrap md:h-[58px] md:w-[120px] md:px-5 lg:w-[127px]"
              onClick={() =>
                setActiveCategory(activeCategory === cat ? null : cat)
              }
            >
              {cat}
            </CategoryButton>
          ))}
        </div>
        <div className="shrink-0">
          <SortDropdown className="h-[41px] w-[80px] min-w-0 px-3 md:h-[58px] md:w-[120px] md:px-5 lg:w-[127px]" />
        </div>
      </div>

      <section className="mb-8 md:mb-10">
        <h2 className="text-black-1B1 mb-4 text-[21px] font-bold md:text-[43px]">
          🛼 모든 체험
        </h2>
        <div className="grid grid-cols-[repeat(2,168px)] justify-center gap-x-3 gap-y-6 md:grid-cols-[repeat(3,221px)] md:gap-x-4 lg:grid-cols-[repeat(4,283px)]">
          {visibleActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>

      <div className="flex items-center justify-center">
        <Pagination
          totalCount={filteredActivities.length}
          pageSize={pageSize}
        />
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
