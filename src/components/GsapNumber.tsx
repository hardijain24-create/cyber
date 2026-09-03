import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GsapNumberProps {
  from?: number;
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const GsapNumber: React.FC<GsapNumberProps> = ({
  from = 0,
  to,
  decimals = 2,
  prefix = '',
  suffix = '',
  duration = 1.8,
  className = '',
}) => {
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obj = { val: from };
    const el = elRef.current;
    if (!el) return;

    const tween = gsap.to(obj, {
      val: to,
      duration,
      ease: 'power3.out',
      onUpdate: () => {
        if (el) {
          el.textContent = `${prefix}${obj.val.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}${suffix}`;
        }
      },
    });

    return () => {
      tween.kill();
    };
  }, [from, to, decimals, prefix, suffix, duration]);

  return <span ref={elRef} className={className}>{prefix}{from.toFixed(decimals)}{suffix}</span>;
};
