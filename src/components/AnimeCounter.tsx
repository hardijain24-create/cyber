import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface AnimeCounterProps {
  from?: number;
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const AnimeCounter: React.FC<AnimeCounterProps> = ({
  from = 0,
  to,
  decimals = 2,
  prefix = '',
  suffix = '',
  duration = 1800,
  className = '',
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obj = { val: from };

    const anim = animate(obj, {
      val: to,
      duration,
      ease: 'outExpo',
      onUpdate: () => {
        if (nodeRef.current) {
          nodeRef.current.textContent = `${prefix}${obj.val.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}${suffix}`;
        }
      },
    });

    return () => {
      if (anim && typeof anim.pause === 'function') anim.pause();
    };
  }, [from, to, decimals, prefix, suffix, duration]);

  return <span ref={nodeRef} className={className}>{prefix}{from.toFixed(decimals)}{suffix}</span>;
};
