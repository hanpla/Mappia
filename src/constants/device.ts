export const BREAKPOINTS = {
  tablet: 768,
  pc: 1024,
} as const;

export const DEVICE_QUERIES = {
  tablet: `(min-width: ${BREAKPOINTS.tablet}px)`,
  pc: `(min-width: ${BREAKPOINTS.pc}px)`,
} as const;
