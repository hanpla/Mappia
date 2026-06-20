'use client';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { createActivity } from '@/lib/api/activities';
import { updateMyActivity } from '@/lib/api/my-activities';
import {
  type ActivityFormValues,
  buildUpdateActivityBody,
} from '@/lib/utils/activityDiff';
import { buildCreateActivityBody } from '@/lib/utils/activityPayload';
import { getApiErrorMessage } from '@/lib/utils/error';
import { getSafePath } from '@/lib/utils/redirect';

import type { ActivityDetailContent } from '@/types/activities';

import Button from '@/components/common/button/Button';
import SelectDropdown from '@/components/common/dropdown/SelectDropdown';
import IconChevronLeft from '@/components/common/icon/IconChevronLeft';
import IconPlus from '@/components/common/icon/IconPlus';
import IconX from '@/components/common/icon/IconX';
import ImageUploadField, {
  UploadImage,
} from '@/components/common/image-upload/ImageUploadField';
import Input from '@/components/common/input/Input';
import Textarea from '@/components/common/input/Textarea';
import LogoSurprise from '@/components/common/logo/LogoSurprise';
import ConfirmModal from '@/components/common/modal/ConfirmModal';

import ScheduleInput, { Schedule } from './ScheduleInput';

const INPUT_BORDER =
  'border-beige-8B7 focus:border-khaki-6B5 focus-within:border-khaki-6B5';

const CATEGORY_OPTIONS = [
  { label: '문화 · 예술', value: '문화 · 예술' },
  { label: '식음료', value: '식음료' },
  { label: '스포츠', value: '스포츠' },
  { label: '투어', value: '투어' },
  { label: '관광', value: '관광' },
  { label: '웰빙', value: '웰빙' },
];

interface ActivityRegisterFormProps {
  mode?: 'register' | 'edit';
  activityId?: number;
  initialData?: ActivityDetailContent;
}

interface DaumPostcodeData {
  address: string;
  roadAddress: string;
  jibunAddress: string;
}

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: {
        oncomplete: (data: DaumPostcodeData) => void;
      }) => { open: () => void };
    };
  }
}

export default function ActivityRegisterForm({
  mode = 'register',
  activityId,
  initialData,
}: ActivityRegisterFormProps) {
  const router = useRouter();
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  const isEdit = mode === 'edit';
  const headingText = isEdit ? '내 체험 수정' : '내 체험 등록';
  const submitText = isEdit ? '수정하기' : '등록하기';

  const [title, setTitle] = useState(initialData?.title ?? '');
  const [titleError, setTitleError] = useState('');
  const [category, setCategory] = useState<string>(initialData?.category ?? '');
  const [description, setDescription] = useState(
    initialData?.description ?? '',
  );
  const [price, setPrice] = useState(
    initialData ? String(initialData.price) : '',
  );
  const [priceError, setPriceError] = useState('');
  const [priceDisplay, setPriceDisplay] = useState(
    initialData ? Number(initialData.price).toLocaleString() : '',
  );
  const [address, setAddress] = useState(initialData?.address ?? '');

  const scheduleIdRef = useRef(1);

  const [schedules, setSchedules] = useState<Schedule[]>(
    initialData && initialData.schedules.length > 0
      ? initialData.schedules.map((s) => ({
          id: `schedule-server-${s.id}`,
          date: s.date,
          startTime: s.startTime,
          endTime: s.endTime,
        }))
      : [],
  );

  const [bannerImages, setBannerImages] = useState<UploadImage[]>(
    initialData?.bannerImageUrl ? [initialData.bannerImageUrl] : [],
  );
  const [introImages, setIntroImages] = useState<UploadImage[]>(
    initialData?.subImages.map((img) => img.imageUrl) ?? [],
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isDirty, setIsDirty] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  const markDirty = () => {
    if (!isDirty) setIsDirty(true);
  };

  const handleAddSchedule = () => {
    markDirty();
    setSchedules((prev) => [
      ...prev,
      {
        id: `schedule-${scheduleIdRef.current++}`,
        date: '',
        startTime: '00:00',
        endTime: '00:00',
      },
    ]);
  };

  const handleRemoveSchedule = (id: string) => {
    markDirty();
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  };

  const handleScheduleChange = (
    id: string,
    field: keyof Omit<Schedule, 'id'>,
    value: string,
  ) => {
    markDirty();
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  };

  const PRICE_MAX = 10000000;
  const TITLE_MAX = 30;

  const handleTitleBlur = () => {
    if (title.length > TITLE_MAX) {
      setTitleError(`제목은 ${TITLE_MAX}자 이하로 입력해 주세요.`);
    } else {
      setTitleError('');
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    markDirty();
    if (priceError) setPriceError('');
    const onlyNumbers = e.target.value.replace(/[^\d]/g, '');
    if (onlyNumbers === '') {
      setPrice('');
      setPriceDisplay('');
      return;
    }
    const numeric = Number(onlyNumbers);
    setPrice(String(numeric));
    setPriceDisplay(onlyNumbers);
  };

  const handlePriceBlur = () => {
    if (price) {
      setPriceDisplay(Number(price).toLocaleString());
      if (Number(price) <= 0) {
        setPriceError('가격은 0보다 큰 금액으로 입력해 주세요.');
      } else if (Number(price) > PRICE_MAX) {
        setPriceError('가격은 10,000,000원 이하로 입력해 주세요.');
      } else {
        setPriceError('');
      }
    }
  };

  const handlePriceFocus = () => {
    setPriceDisplay(price);
  };

  const validateForm = (): string | null => {
    if (!title.trim()) return '제목을 입력해 주세요.';
    if (title.length > TITLE_MAX) {
      return `제목은 ${TITLE_MAX}자 이하로 입력해 주세요.`;
    }
    if (!category) return '카테고리를 선택해 주세요.';
    if (!description.trim()) return '설명을 입력해 주세요.';

    if (!price.trim()) return '가격을 입력해 주세요.';
    const priceNumber = Number(price);
    if (Number.isNaN(priceNumber) || priceNumber <= 0) {
      return '가격은 0보다 큰 금액으로 입력해 주세요.';
    }
    if (priceNumber > PRICE_MAX) {
      return '가격은 10,000,000원 이하로 입력해 주세요.';
    }

    if (!address.trim()) return '주소를 입력해 주세요.';

    const filledSchedules = schedules.filter(
      (schedule) =>
        schedule.date ||
        schedule.startTime !== '00:00' ||
        schedule.endTime !== '00:00',
    );
    if (filledSchedules.length === 0) {
      return '예약 가능한 시간대를 입력해 주세요.';
    }
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    for (const schedule of filledSchedules) {
      if (!schedule.date) return '예약 가능한 시간대의 날짜를 입력해 주세요.';
      const isExisting = schedule.id.startsWith('schedule-server-');
      if (!isExisting && schedule.date < todayStr) {
        return '오늘 이전의 날짜는 선택할 수 없습니다.';
      }
      if (schedule.startTime >= schedule.endTime) {
        return '시작 시간은 종료 시간보다 빨라야 합니다.';
      }
    }

    if (bannerImages.length === 0) {
      return '배너 이미지를 최소 1개 이상 등록해 주세요.';
    }

    return null;
  };

  const isScheduleUntouched = schedules.every(
    (schedule) =>
      !schedule.date &&
      schedule.startTime === '00:00' &&
      schedule.endTime === '00:00',
  );

  const isEmpty =
    !title.trim() &&
    !category &&
    !description.trim() &&
    !price.trim() &&
    !address.trim() &&
    isScheduleUntouched &&
    bannerImages.length === 0 &&
    introImages.length === 0;

  const collectValues = (): ActivityFormValues => ({
    title,
    category,
    description,
    price,
    address,
    schedules,
    bannerImages,
    introImages,
  });

  const handleLeave = () => {
    if (isDirty) {
      setIsLeaveModalOpen(true);
    } else {
      router.back();
    }
  };

  const handleConfirmLeave = () => {
    setIsLeaveModalOpen(false);
    router.back();
  };

  const handleCancelLeave = () => {
    setIsLeaveModalOpen(false);
  };

  const handleEditSubmit = async () => {
    if (!activityId || !initialData) return;

    setIsSubmitting(true);
    try {
      const body = await buildUpdateActivityBody(initialData, collectValues());

      if (Object.keys(body).length === 0) {
        showToast('information', '변경된 내용이 없습니다.');
        return;
      }

      await updateMyActivity(activityId, body);
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['activity', activityId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['my-activities'],
        }),
      ]);
      showToast('success', '체험이 수정되었습니다.');
      const from = new URLSearchParams(window.location.search).get('from');
      router.push(getSafePath(from, '/profile/manages'));
    } catch (error) {
      showToast(
        'error',
        getApiErrorMessage(error, '체험 수정에 실패했습니다.'),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async () => {
    setIsSubmitting(true);
    try {
      const body = await buildCreateActivityBody(collectValues());
      await createActivity(body);
      await queryClient.invalidateQueries({
        queryKey: ['my-activities'],
      });
      showToast('success', '체험이 등록되었습니다.');
      router.push('/profile/manages');
    } catch (error) {
      showToast(
        'error',
        getApiErrorMessage(error, '체험 등록에 실패했습니다.'),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (isSubmitting) return;

    const errorMessage = validateForm();
    if (errorMessage) {
      showToast('error', errorMessage);
      return;
    }

    if (isEdit) {
      handleEditSubmit();
    } else {
      handleRegisterSubmit();
    }
  };

  const handleAddressSearchClick = () => {
    if (!window.daum) {
      showToast(
        'error',
        '주소 검색을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.',
      );
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data) => {
        markDirty();
        setAddress(data.roadAddress || data.address);
      },
    }).open();
  };

  const handleAddressClearClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    markDirty();
    setAddress('');
  };

  return (
    <div className="mx-auto flex max-w-[800px] flex-col gap-6 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLeave}
            aria-label="뒤로가기"
            className="group hover:bg-beige-8B7 hidden h-8 w-8 items-center justify-center rounded-full text-[#1b1b1b] transition-colors hover:text-white md:flex"
          >
            <IconChevronLeft size={24} color="currentColor" />
          </button>
          <h1 className="text2xl-bold text-black-1B1">{headingText}</h1>
        </div>
        <button
          type="button"
          onClick={handleLeave}
          aria-label="닫기"
          className="group hover:bg-beige-8B7 flex h-8 w-8 items-center justify-center rounded-full text-[#1b1b1b] transition-colors hover:text-white"
        >
          <IconX size={24} color="currentColor" />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="textlg-bold text-black-1B1">
          제목
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => {
            markDirty();
            setTitle(e.target.value);
            if (titleError) setTitleError('');
          }}
          onBlur={handleTitleBlur}
          placeholder="제목을 입력해 주세요"
          hasError={!!titleError}
          className={INPUT_BORDER}
        />
        {titleError && (
          <p className="text-red-FF4 textsm-regular">{titleError}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <span className="textlg-bold text-black-1B1">카테고리</span>
        <SelectDropdown
          value={category}
          onChange={(value) => {
            markDirty();
            setCategory(value);
          }}
          options={CATEGORY_OPTIONS}
          placeholder="카테고리를 선택해 주세요"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="textlg-bold text-black-1B1">
          설명
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => {
            markDirty();
            setDescription(e.target.value);
          }}
          placeholder="체험에 대한 설명을 입력해 주세요."
          rows={5}
          className={INPUT_BORDER}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="price" className="textlg-bold text-black-1B1">
          가격
        </label>
        <Input
          id="price"
          type="text"
          inputMode="numeric"
          value={priceDisplay}
          onChange={handlePriceChange}
          onFocus={handlePriceFocus}
          onBlur={handlePriceBlur}
          placeholder="체험 금액을 입력해 주세요"
          hasError={!!priceError}
          className={INPUT_BORDER}
        />
        {priceError && (
          <p className="text-red-FF4 textsm-regular">{priceError}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="address" className="textlg-bold text-black-1B1">
          주소
        </label>
        <div className="flex gap-2">
          <Input
            id="address"
            value={address}
            readOnly
            onClick={handleAddressSearchClick}
            placeholder="주소를 검색해 주세요"
            className={`${INPUT_BORDER} flex-1 cursor-pointer`}
            rightIcon={
              address && (
                <button
                  type="button"
                  onClick={handleAddressClearClick}
                  aria-label="주소 초기화"
                  className="hover:bg-beige-8B7 mr-2 flex h-6 w-6 items-center justify-center rounded-full text-[#1b1b1b] transition-colors hover:text-white"
                >
                  <IconX size={16} color="currentColor" />
                </button>
              )
            }
          />
          <Button
            type="button"
            size="lg"
            variant="outline"
            onClick={handleAddressSearchClick}
            className="h-14"
          >
            주소 검색
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="textlg-bold text-black-1B1">예약 가능한 시간대</span>

        {schedules.length > 0 && (
          <div className="text-gray-4B4 mobile:flex hidden items-center gap-2 text-sm">
            <span className="flex-1">날짜</span>
            <span className="w-[120px]">시작 시간</span>
            <span className="w-[12px]" />
            <span className="w-[120px]">종료 시간</span>
            <span className="w-14" />
          </div>
        )}

        <div className="flex flex-col gap-2">
          {schedules.map((schedule) => (
            <ScheduleInput
              key={schedule.id}
              schedule={schedule}
              onRemove={() => handleRemoveSchedule(schedule.id)}
              onChange={handleScheduleChange}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddSchedule}
          aria-label="시간대 추가"
          className="border-beige-8B7 text-beige-8B7 hover:bg-beige-8B7/5 flex h-14 w-full items-center justify-center rounded-2xl border border-dashed bg-white transition-colors"
        >
          <IconPlus size={24} color="currentColor" />
        </button>
      </div>

      <ImageUploadField
        name="bannerImages"
        label="배너 이미지 등록"
        maxCount={1}
        images={bannerImages}
        onChange={(images) => {
          markDirty();
          setBannerImages(images);
        }}
      />

      <ImageUploadField
        name="introImages"
        label="소개 이미지 등록"
        maxCount={2}
        images={introImages}
        onChange={(images) => {
          markDirty();
          setIntroImages(images);
        }}
      />

      <div className="mt-2 flex justify-center">
        <Button
          size="lg"
          className="w-30"
          hasHover={false}
          onClick={handleSubmit}
          disabled={isSubmitting || isEmpty}
        >
          {submitText}
        </Button>
      </div>

      <ConfirmModal
        isOpen={isLeaveModalOpen}
        icon={
          <span className="block w-20 [&>svg]:h-full [&>svg]:w-full">
            <LogoSurprise />
          </span>
        }
        message={'저장되지 않았습니다.\n정말 뒤로 가시겠습니까?'}
        cancelText="아니오"
        confirmText="네"
        onClose={handleCancelLeave}
        onConfirm={handleConfirmLeave}
      />
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
