'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import Button from '@/components/common/button/Button';
import SelectDropdown from '@/components/common/dropdown/SelectDropdown';
import IconChevronLeft from '@/components/common/icon/IconChevronLeft';
import IconX from '@/components/common/icon/IconX';
import ImageUploadField from '@/components/common/image-upload/ImageUploadField';
import Input from '@/components/common/input/Input';
import Textarea from '@/components/common/input/Textarea';

import ScheduleInput, { Schedule } from './ScheduleInput';

const INPUT_BORDER =
  'border-[#8b7355] focus:border-khaki-6B5 focus-within:border-khaki-6B5';

const CATEGORY_OPTIONS = [
  { label: '문화·예술', value: '문화·예술' },
  { label: '식음료', value: '식음료' },
  { label: '스포츠', value: '스포츠' },
  { label: '투어', value: '투어' },
  { label: '관광', value: '관광' },
  { label: '웰빙', value: '웰빙' },
];

interface ActivityRegisterFormProps {
  mode?: 'register' | 'edit';
}

export default function ActivityRegisterForm({
  mode = 'register',
}: ActivityRegisterFormProps) {
  const router = useRouter();

  const isEdit = mode === 'edit';
  const headingText = isEdit ? '내 체험 수정' : '내 체험 등록';
  const submitText = isEdit ? '수정하기' : '등록하기';

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');

  const scheduleIdRef = useRef(1);

  const [schedules, setSchedules] = useState<Schedule[]>([
    { id: 'schedule-0', date: '', startTime: '0:00', endTime: '0:00' },
  ]);

  const [bannerImages, setBannerImages] = useState<File[]>([]);
  const [introImages, setIntroImages] = useState<File[]>([]);

  const handleAddSchedule = () => {
    setSchedules((prev) => [
      ...prev,
      {
        id: `schedule-${scheduleIdRef.current++}`,
        date: '',
        startTime: '0:00',
        endTime: '0:00',
      },
    ]);
  };

  const handleRemoveSchedule = (id: string) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  };

  const handleScheduleChange = (
    id: string,
    field: keyof Omit<Schedule, 'id'>,
    value: string,
  ) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  };

  const handleSubmit = () => {
    // API 연동 예정
    console.log({
      title,
      category,
      description,
      price,
      address,
      schedules,
      bannerImages,
      introImages,
    });
  };

  return (
    <div className="mx-auto flex max-w-[800px] flex-col gap-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="뒤로가기"
            className="group hidden h-8 w-8 items-center justify-center rounded-full text-[#1b1b1b] transition-colors hover:bg-[#8b7355] hover:text-white md:flex"
          >
            <IconChevronLeft size={24} color="currentColor" />
          </button>
          <h1 className="text2xl-bold text-black-1B1">{headingText}</h1>
        </div>
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="닫기"
          className="group flex h-8 w-8 items-center justify-center rounded-full text-[#1b1b1b] transition-colors hover:bg-[#8b7355] hover:text-white"
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
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해 주세요"
          className={INPUT_BORDER}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="textlg-bold text-black-1B1">카테고리</span>
        <SelectDropdown
          value={category}
          onChange={setCategory}
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
          onChange={(e) => setDescription(e.target.value)}
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
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="체험 금액을 입력해 주세요"
          className={INPUT_BORDER}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="address" className="textlg-bold text-black-1B1">
          주소
        </label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="주소를 입력해 주세요"
          className={INPUT_BORDER}
        />
      </div>

      <div className="flex flex-col gap-3">
        <span className="textlg-bold text-black-1B1">예약 가능한 시간대</span>

        <div className="text-gray-4B4 mobile:flex hidden items-center gap-2 text-sm">
          <span className="flex-1">날짜</span>
          <span className="w-[120px]">시작 시간</span>
          <span className="w-[12px]" />
          <span className="w-[120px]">종료 시간</span>
          <span className="w-14" />
        </div>

        <div className="flex flex-col gap-2">
          {schedules.map((schedule, index) => (
            <ScheduleInput
              key={schedule.id}
              schedule={schedule}
              isFirst={index === 0}
              onAdd={handleAddSchedule}
              onRemove={() => handleRemoveSchedule(schedule.id)}
              onChange={handleScheduleChange}
            />
          ))}
        </div>
      </div>

      <ImageUploadField
        name="bannerImages"
        label="배너 이미지 등록"
        maxCount={4}
        images={bannerImages}
        onChange={setBannerImages}
      />

      <ImageUploadField
        name="introImages"
        label="소개 이미지 등록"
        maxCount={4}
        images={introImages}
        onChange={setIntroImages}
      />

      <div className="mt-2 flex justify-center">
        <Button size="lg" className="w-30" onClick={handleSubmit}>
          {submitText}
        </Button>
      </div>
    </div>
  );
}
