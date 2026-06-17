import { BREAKPOINTS } from '@/constants/device';

import { DeviceType } from '@/types/device';

export const getDeviceType = (width?: number): DeviceType => {
  if (width !== undefined) {
    if (width >= BREAKPOINTS.pc) return 'pc';
    if (width >= BREAKPOINTS.tablet) return 'tablet';
    return 'mobile';
  }

  if (typeof window === 'undefined') return 'pc';

  const currentWidth = window.innerWidth;
  if (currentWidth >= BREAKPOINTS.pc) return 'pc';
  if (currentWidth >= BREAKPOINTS.tablet) return 'tablet';
  return 'mobile';
};

export const getInitialDevice = (fallback: DeviceType = 'pc'): DeviceType => {
  if (typeof window === 'undefined') return fallback;
  return getDeviceType(window.innerWidth);
};
