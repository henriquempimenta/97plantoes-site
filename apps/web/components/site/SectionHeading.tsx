import { motion, useReducedMotion } from 'motion/react';

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'center',
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: 'center' | 'left';
  dark?: boolean;
}) {
  const reduce = useReducedMotion();
  const item = (i: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { delay: i * 0.09, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] as const },
  });

  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
      <motion.p
        {...item(0)}
        className={`mb-3 text-xs font-bold uppercase tracking-[.16em] ${dark ? 'text-cyan' : 'text-cross'}`}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        {...item(1)}
        className={`font-display text-3xl leading-[1.1] font-bold tracking-[-0.025em] md:text-[2.75rem] ${dark ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </motion.h2>
      {lede && (
        <motion.p {...item(2)} className={`mt-5 text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-ink-soft'}`}>
          {lede}
        </motion.p>
      )}
    </div>
  );
}
