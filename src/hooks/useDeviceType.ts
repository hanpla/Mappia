'use client';

import { useEffect, useState } from 'react';

import { getInitialDevice } from '@/lib/utils/device';

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
  const [deviceType, setDeviceType] = useState<DeviceType>(() =>
    getInitialDevice(defaultDevice),
  );

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
