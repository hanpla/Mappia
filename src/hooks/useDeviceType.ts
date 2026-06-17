'use client';

import { useEffect, useState } from 'react';

import { DEVICE_QUERIES } from '@/constants/device';

import { DeviceType } from '@/types/device';

interface UseDeviceTypeResult {
  deviceType: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isPc: boolean;
}

export const useDeviceType = (
  defaultDevice: DeviceType = 'pc',
): UseDeviceTypeResult => {
  const [deviceType, setDeviceType] = useState<DeviceType>(defaultDevice);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaPC = window.matchMedia(DEVICE_QUERIES.pc);
    const mediaTablet = window.matchMedia(DEVICE_QUERIES.tablet);

    const updateDevice = () => {
      if (mediaPC.matches) {
        setDeviceType('pc');
      } else if (mediaTablet.matches) {
        setDeviceType('tablet');
      } else {
        setDeviceType('mobile');
      }
    };

    // 최초 마운트 시점에 실제 클라이언트 화면 크기에 맞게 상태 업데이트
    updateDevice();

    // 브레이크포인트를 지날 때만 호출되도록 리스너 등록
    mediaPC.addEventListener('change', updateDevice);
    mediaTablet.addEventListener('change', updateDevice);

    return () => {
      mediaPC.removeEventListener('change', updateDevice);
      mediaTablet.removeEventListener('change', updateDevice);
    };
  }, []);

  return {
    deviceType,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isPc: deviceType === 'pc',
  };
};
