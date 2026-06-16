'use client';

import Link from 'next/link';

import { motion } from 'motion/react';

import Logo404 from '@/components/common/logo/Logo404';
import LogoTitle from '@/components/common/logo/LogoTitle';

const MotionLink = motion.create(Link);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1] as const,
    },
  },
};

const floatingVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    y: [0, -16, 0],
    transition: {
      opacity: { duration: 1.5, delay: 0.2 },
      scale: { duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const },
      y: {
        duration: 2,
        ease: 'easeInOut' as const,
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    },
  },
};

export default function LandingPage() {
  return (
    <section className="is-landing-page inner relative flex min-h-screen w-full flex-col-reverse items-center justify-center gap-12 overflow-hidden py-10 md:gap-20 lg:flex-row lg:justify-between">
      <motion.div
        className="flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text3xl-medium md:text4xl-medium text-center text-white lg:text-left"
          variants={itemVariants}
        >
          <span className="inline-flex items-center md:items-end">
            <LogoTitle className="h-8.5 w-36 md:h-15.5 md:w-65" />
            <span>에서</span>
          </span>
          <br />
          특별한 하루를 예약하세요!
        </motion.h1>

        <motion.p
          className="textlg-regular md:text2lg-regular mt-6 text-center text-white md:mt-10 lg:text-left"
          variants={itemVariants}
        >
          문화 &middot; 예술, 식음료, 스포츠, 투어, 관광, 웰빙 등<br />
          분야별로 다양한 체험이 기다리고 있습니다.
        </motion.p>

        <motion.div
          className="mt-12 flex justify-center md:mt-16 lg:justify-start"
          variants={itemVariants}
        >
          <MotionLink
            href="/activities"
            className="text2lg-bold md:textxl-bold border-beige-8B7 relative flex h-14 w-full max-w-70 items-center justify-center overflow-hidden rounded-3xl text-white md:h-16 md:max-w-100"
            whileHover="hover"
            initial="rest"
          >
            <div className="bg-beige-8B7 absolute inset-0" />

            <motion.div
              className="absolute top-0 bottom-0 left-0 bg-white"
              variants={{
                rest: { width: '0%' },
                hover: { width: '100%' },
              }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            />
            <motion.span
              className="relative z-10"
              variants={{
                rest: { color: '#FFFFFF' },
                hover: { color: '#8B7355' },
              }}
              transition={{ duration: 0.2 }}
            >
              체험 둘러보기
            </motion.span>
          </MotionLink>
        </motion.div>
      </motion.div>

      <div className="bg-ivory-F2E h-70 w-70 rounded-full md:h-100 md:w-100 lg:h-140 lg:w-140">
        <motion.div
          className="flex items-center justify-center"
          variants={floatingVariants}
          initial="hidden"
          animate="visible"
        >
          <Logo404 className="h-auto w-42 translate-y-4 transform md:w-60 md:translate-y-6 lg:w-82.5 lg:translate-y-8" />
        </motion.div>
      </div>
    </section>
  );
}
