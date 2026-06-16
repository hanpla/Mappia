interface DetectivePatternProps {
  className?: string;
}

/**
 * 탐정 테마 반복 패턴 (돋보기 · 지문 · 발자국 · 물음표 · 단서 점선).
 * 색/투명도는 부모의 text color 와 svg opacity 로 조절한다.
 */
export default function DetectivePattern({ className }: DetectivePatternProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="detective-stage-pattern"
          width="220"
          height="220"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-8)"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {/* 돋보기 */}
            <circle cx="46" cy="48" r="16" />
            <line x1="58" y1="60" x2="74" y2="76" strokeWidth="3" />

            {/* 지문 (동심 호) */}
            <path d="M150 40 a22 22 0 0 1 40 0" opacity="0.9" />
            <path d="M156 44 a16 16 0 0 1 28 0" opacity="0.75" />
            <path d="M162 48 a10 10 0 0 1 16 0" opacity="0.6" />

            {/* 발자국 */}
            <ellipse cx="60" cy="150" rx="7" ry="11" />
            <ellipse cx="78" cy="166" rx="7" ry="11" />

            {/* 단서 점선 */}
            <path
              d="M96 96 C 130 120, 150 130, 176 150"
              strokeDasharray="1 12"
              strokeWidth="3"
            />
          </g>

          {/* 물음표 */}
          <text
            x="150"
            y="180"
            fontFamily="var(--font-family-pretendard)"
            fontSize="40"
            fontWeight="700"
            fill="currentColor"
          >
            ?
          </text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#detective-stage-pattern)" />
    </svg>
  );
}
