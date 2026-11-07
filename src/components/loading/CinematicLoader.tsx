import React, { useEffect, useState } from 'react';

interface CinematicLoaderProps {
  onComplete: () => void;
}

const steps = [
  'Initializing command center...',
  'Loading business environments...',
  'Preparing automation systems...',
  'Synchronizing demo environment...',
  'Environment ready.',
];

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const totalDuration = 2000; // 2 seconds
    const interval = 20;
    const increment = 100 / (totalDuration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setIsFadingOut(true);
          setTimeout(onComplete, 400);
          return 100;
        }

        const currentStep = Math.min(
          Math.floor((next / 100) * steps.length),
          steps.length - 1
        );
        setStepIndex(currentStep);

        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#172522] text-white transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative flex flex-col items-center max-w-sm w-full px-6">
        {/* Geometric Minimal Logo */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="w-16 h-16 rounded-xl border border-white/10 bg-sidebar-secondary/50 flex items-center justify-center shadow-elevated">
            <svg
              className="w-8 h-8 text-accent animate-pulse"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          {/* Subtle orbiting glow */}
          <div className="absolute -inset-2 rounded-2xl bg-accent/20 blur-xl opacity-50" />
        </div>

        {/* Wordmark */}
        <h1 className="font-display text-lg tracking-[0.25em] font-semibold text-white/90 uppercase mb-2">
          GHL Command Center
        </h1>
        <p className="text-xs text-[#929C96] tracking-wider mb-8 uppercase font-mono">
          Enterprise Automation Ecosystem
        </p>

        {/* Animated Connected Nodes Visualization */}
        <div className="relative w-full h-8 mb-6 flex items-center justify-between px-2">
          <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-[1px] bg-white/10" />
          <div
            className="absolute left-2 top-1/2 -translate-y-1/2 h-[1px] bg-accent transition-all duration-75"
            style={{ width: `calc(${progress}% - 8px)` }}
          />

          {[0, 1, 2, 3, 4].map((i) => {
            const isActive = progress >= i * 25;
            return (
              <div
                key={i}
                className={`relative z-10 w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-accent ring-4 ring-accent/20 scale-110'
                    : 'bg-white/20'
                }`}
              />
            );
          })}
        </div>

        {/* Status text */}
        <div className="h-5 flex items-center justify-center mb-4">
          <p className="text-xs font-mono text-[#929C96] transition-all duration-150">
            {steps[stepIndex]}
          </p>
        </div>

        {/* Thin progress bar */}
        <div className="w-full bg-white/10 h-[2px] rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <div className="mt-3 text-[11px] font-mono text-white/40">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

