import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GsapNumberProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const GsapNumber: React.FC<GsapNumberProps> = ({
  value,
  decimals = 2,
  prefix = '',
  suffix = '',
  duration = 2.2,
  className = '',
}) => {
  const elRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const obj = { val: 0 };
            gsap.to(obj, {
              val: value,
              duration,
              ease: 'power3.out',
              onUpdate: () => {
                if (el) {
                  el.textContent = `${prefix}${obj.val.toLocaleString('en-IN', {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                  })}${suffix}`;
                }
              },
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    el.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`;

    return () => observer.disconnect();
  }, [value, decimals, prefix, suffix, duration]);

  return (
    <span ref={elRef} className={className}>
      {prefix}{(0).toFixed(decimals)}{suffix}
    </span>
  );
};
