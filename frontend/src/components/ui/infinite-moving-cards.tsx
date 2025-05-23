"use client";

import { cn } from "../../lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    icon: React.ReactNode;
    name: string;
    title: string;
    bgColor?: string;
  }[];

  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className={cn(
              "relative w-32 h-32 sm:w-36 sm:h-36 max-w-full shrink-0 rounded-lg border border-cyan-500 bg-slate-900/60 p-3 flex flex-col items-center justify-start text-center text-cyan-100"
            )}
            key={item.name}
          >
            {/* Ícone com altura fixa para forçar alinhamento vertical igual */}
            <div className="h-8 sm:h-10 flex items-center justify-center text-xl sm:text-2xl text-cyan-500 dark:text-cyan-400">
              {item.icon}
            </div>

            {/* Nome com margem fixa e centralizado */}
            <div className="mt-2 h-5 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-semibold text-green-400">
              {item.name}
            </div>

            {/* Título fixo abaixo com espaço uniforme */}
            <div className="mt-1 text-[10px] sm:text-xs text-neutral-500 dark:text-gray-400">
              {item.title}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
