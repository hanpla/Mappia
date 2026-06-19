'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { motion, useReducedMotion } from 'motion/react';

import usePointerSpotlight from '@/hooks/usePointerSpotlight';

import Logo404 from '@/components/common/logo/Logo404';
import LogoTitle from '@/components/common/logo/LogoTitle';

import MagnifierIcon from '../common/icon/IconMagnifier';
import DetectivePattern from './DetectivePattern';

const MotionLink = motion.create(Link);

const EASE = [0.16, 1, 0.3, 1] as const;
const INTRO_DURATION = 2200;

function SearchlightPair() {
  return (
    <>
      <div className="animate-searchlight-a absolute top-[-12%] left-1/2 h-[150%] w-[55%] origin-top -translate-x-1/2 bg-[linear-gradient(to_bottom,rgba(232,205,150,0.4),rgba(232,205,150,0.05)_58%,transparent_84%)] mix-blend-screen blur-[6px] [clip-path:polygon(46%_0,54%_0,100%_100%,0%_100%)]" />
      <div className="animate-searchlight-b absolute top-[-12%] left-1/2 h-[150%] w-[48%] origin-top -translate-x-1/2 bg-[linear-gradient(to_bottom,rgba(214,178,122,0.35),rgba(214,178,122,0.04)_56%,transparent_82%)] mix-blend-screen blur-sm [clip-path:polygon(47%_0,53%_0,100%_100%,0%_100%)]" />
    </>
  );
}

export default function LandingHero() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const stageRef = useRef<HTMLElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);

  // 'intro': 동그란 불빛이 어둠 속을 돌아다니는 단계 / 'done': 조명이 캐릭터에 멈춘 뒤
  const [phase, setPhase] = useState<'intro' | 'done'>('intro');
  const isReady = phase === 'done';

  // 진입 연출이 끝난 뒤에만 커서 추적을 넘겨받는다.
  usePointerSpotlight(stageRef, !shouldReduceMotion && isReady);

  useEffect(() => {
    const stage = stageRef.current;
    const target = characterRef.current;
    if (shouldReduceMotion || !stage || !target) {
      setPhase('done');
      return;
    }

    const stageRect = stage.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const endX = targetRect.left - stageRect.left + targetRect.width / 2;
    const endY = targetRect.top - stageRect.top + targetRect.height / 2;
    const w = stageRect.width;
    const h = stageRect.height;

    // 어둠 속을 이리저리 훑다가 마지막에 캐릭터 중심에서 멈춘다.
    const points: [number, number][] = [
      [w * 0.5, h * 0.52],
      [w * 0.2, h * 0.32],
      [w * 0.74, h * 0.62],
      [w * 0.38, h * 0.4],
      [endX, endY],
    ];

    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;

    let raf = 0;
    let startTime = 0;

    const setVars = (x: number, y: number) => {
      stage.style.setProperty('--mx', `${x}px`);
      stage.style.setProperty('--my', `${y}px`);
    };

    const step = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / INTRO_DURATION, 1);
      const eased = easeInOut(progress) * (points.length - 1);
      const i = Math.min(Math.floor(eased), points.length - 2);
      const f = eased - i;
      setVars(
        points[i][0] + (points[i + 1][0] - points[i][0]) * f,
        points[i][1] + (points[i + 1][1] - points[i][1]) * f,
      );
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setPhase('done');
      }
    };

    setVars(points[0][0], points[0][1]);
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [shouldReduceMotion]);

  const contentVariants = {
    hidden: {},
    visible: {
      transition: { delayChildren: 0.3, staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const circleVariants = {
    hidden: { opacity: 0, scale: 0.82 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.1, ease: EASE },
    },
  };

  return (
    <section
      ref={stageRef}
      className="is-landing-page relative isolate flex min-h-screen w-full items-center overflow-hidden bg-[#160f07]"
    >
      {/* 1. 탐정 패턴 (천천히 표류) */}
      <DetectivePattern className="animate-stage-drift text-beige-8B7 absolute inset-[-25%] z-0 h-[150%] w-[150%] opacity-[0.55]" />

      {/* 2. 무대 안개 — 불빛 주변만 선명하게 뚫린다 */}
      <div className="stage-fog pointer-events-none absolute inset-0 z-10" />

      {/* 3. 진입 시 위에서 좌우로 훑는 무대 조명 (캐릭터/설명 등장 전까지) */}
      {!shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: isReady ? 0 : 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* 왼쪽 조명 2개 */}
          <div className="absolute inset-0">
            <SearchlightPair />
          </div>
          {/* 같은 조명을 좌우 반전해 오른쪽에도 복사 */}
          <div className="absolute inset-0 transform-[scaleX(-1)]">
            <SearchlightPair />
          </div>
        </motion.div>
      )}

      {/* 4. 무대를 비추는 동그란 불빛 — 서서히 나타나며 이동 → 이후 커서 추적 */}
      {!shouldReduceMotion && (
        <motion.div
          className="stage-cursor-glow pointer-events-none absolute top-(--my,40%) left-(--mx,50%) z-20 h-136 w-136 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      )}

      {/* 콘텐츠 */}
      <div className="inner relative z-30 flex flex-col-reverse items-center justify-between gap-6 md:gap-20 lg:flex-row lg:gap-12 lg:py-28">
        <motion.div
          className="flex flex-col items-center lg:items-start"
          variants={contentVariants}
          initial="hidden"
          animate={isReady ? 'visible' : 'hidden'}
        >
          <motion.span
            variants={itemVariants}
            className="border-beige-8B7/40 textsm-semibold text-beige-8B7 inline-flex items-center gap-2 rounded-full border bg-white/5 px-4 py-1.5 tracking-wide backdrop-blur-sm"
          >
            <MagnifierIcon />
            단서를 따라가는 하루
          </motion.span>

          <motion.h1
            className="text3xl-medium md:text4xl-medium mt-3 text-center break-keep text-white lg:mt-6 lg:text-left"
            variants={itemVariants}
          >
            <span className="inline-flex items-center md:items-end">
              <LogoTitle className="h-8.5 w-36 md:h-15.5 md:w-65" />
              <span className="ml-1">에서</span>
            </span>
            <br />
            <span className="text-[#e6c084]">특별한</span> 하루를 예약하세요!
          </motion.h1>

          <motion.p
            className="textlg-regular md:text2lg-regular mt-6 text-center break-keep text-white/75 md:mt-8 lg:text-left"
            variants={itemVariants}
          >
            문화 &middot; 예술, 식음료, 스포츠, 투어, 관광, 웰빙 등
            <br className="max-[413px]:hidden" /> 분야별로 다양한 체험이 무대
            위에서 기다리고 있습니다.
          </motion.p>

          <motion.div
            className="mt-12 flex w-full justify-center md:mt-16 lg:justify-start"
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
                variants={{ rest: { width: '0%' }, hover: { width: '100%' } }}
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

        {/* 캐릭터 스포트라이트 무대 */}
        <motion.div
          ref={characterRef}
          className="relative flex shrink-0 items-center justify-center"
          variants={circleVariants}
          initial="hidden"
          animate={isReady ? 'visible' : 'hidden'}
        >
          <div
            className="stage-cursor-glow absolute -inset-8 rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div className="relative flex h-50 w-50 items-center justify-center rounded-full bg-[radial-gradient(circle_at_50%_32%,#fdf7ea,#f2ebdc_46%,#d9c7a3_78%,#bda478_100%)] shadow-[0_0_90px_rgba(228,196,132,0.35)] md:h-100 md:w-100 lg:h-136 lg:w-136">
            <motion.div
              animate={
                isReady && !shouldReduceMotion ? { y: [0, -16, 0] } : { y: 0 }
              }
              transition={{
                delay: 0.6,
                duration: 4.5,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            >
              <Logo404 className="h-auto w-30 translate-y-4 md:w-60 md:translate-y-6 lg:w-82.5 lg:translate-y-8" />
            </motion.div>
          </div>
          <div
            className="absolute -bottom-4 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(228,196,132,0.4),transparent_70%)] blur-md"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
}
