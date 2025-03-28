'use client'

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { LucideIcon } from "lucide-react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    icon?: LucideIcon;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { 
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  transition: { 
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                  },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            {item.icon && (
              <div className="mb-4 flex justify-center">
                <motion.div 
                  className="relative mx-auto size-16 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]"
                  layoutId={`icon-container-${idx}`}
                  animate={{
                    scale: hoveredIndex === idx ? 1.05 : 1,
                    transition: {
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1]
                    }
                  }}
                >
                  <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]" />
                  <div aria-hidden className="bg-radial to-background absolute inset-0 from-transparent to-75%" />
                  <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
                    <motion.div
                      layoutId={`icon-${idx}`}
                      animate={{
                        scale: hoveredIndex === idx ? 1.1 : 1,
                        transition: {
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1]
                        }
                      }}
                    >
                      <item.icon className="size-6" aria-hidden />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            )}
            <motion.div
              layoutId={`title-${idx}`}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <CardTitle>{item.title}</CardTitle>
            </motion.div>
            <motion.div
              layoutId={`description-${idx}`}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <CardDescription>{item.description}</CardDescription>
            </motion.div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      layout
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 transition-all duration-300",
        className
      )}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </motion.div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4 text-center transition-colors duration-300", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm text-center transition-colors duration-300",
        className
      )}
    >
      {children}
    </p>
  );
};
