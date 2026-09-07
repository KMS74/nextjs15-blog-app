import * as React from "react";

export function BrandLogo({ className = "h-9 w-9", size = 36, ...props }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-xl group ${className}`}
      {...props}
    >
      {/* Ambient background glow on hover */}
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 opacity-60 blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:blur-md" />

      {/* SVG Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative transform transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Base Background Gradient */}
          <linearGradient id="brand-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>

          {/* Accent Glow Gradient */}
          <linearGradient id="brand-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>

          {/* Glyph Gradient */}
          <linearGradient id="brand-glyph" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e0e7ff" />
          </linearGradient>

          {/* Slash Gradient */}
          <linearGradient id="brand-slash" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>

        {/* Squircle Base */}
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="11"
          fill="url(#brand-bg)"
        />
        <rect
          x="1.5"
          y="1.5"
          width="37"
          height="37"
          rx="10.5"
          stroke="url(#brand-stroke)"
          strokeWidth="1.2"
        />

        {/* Monogram / Architectural Tech Mark:
            Combining "K", Terminal Bracket ">", and Architecture Slash "/" */}
        
        {/* Left Vertical Pillar (Stem of K) */}
        <rect
          x="11"
          y="11"
          width="3.5"
          height="18"
          rx="1.75"
          fill="url(#brand-glyph)"
        />

        {/* Stylized Angled Chevrons forming the K and code bracket */}
        <path
          d="M26.5 12L17.5 19.5L26.5 28"
          stroke="url(#brand-glyph)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Forward Architecture Slash */}
        <path
          d="M21.5 13L15.5 27"
          stroke="url(#brand-slash)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.9"
        />

        {/* Central Core Spark Indicator */}
        <circle
          cx="21.5"
          cy="20"
          r="1.75"
          fill="#38bdf8"
          className="animate-pulse"
        />
      </svg>
    </div>
  );
}
