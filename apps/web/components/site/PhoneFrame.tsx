import type { ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

// Região da tela em porcentagem (0–100) da captura, já com a folga de PAD_PX.
// r é o raio do canto do elemento na captura (px, em 720 de largura).
export type Spot = { x: number; y: number; w: number; h: number; r?: number };

const PAD_PX = 10;

// px da captura -> unidade relativa à largura da tela (container query)
const cq = (px: number) => `${px / 7.2}cqw`;

// Capturas do iPhone (repositório de mídia) são 9:19,5; as do Maestro (Android) são 9:16.
export function screenRatio(src: string) {
  return /\/app-[^/]*\.webp$/.test(src) ? 1559 / 720 : 1280 / 720;
}

const spring = { type: 'spring', stiffness: 170, damping: 24, mass: 0.9 } as const;

export function PhoneFrame({
  src,
  alt,
  spot,
  className = '',
  children,
  priority = false,
}: {
  src: string;
  alt: string;
  spot?: Spot | null;
  className?: string;
  children?: ReactNode;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={`relative ${className}`}>
      <div className="relative rounded-[2.6rem] bg-gradient-to-b from-[#1b2a3a] to-[#0a1522] p-[10px] shadow-[0_40px_80px_-30px_rgba(11,46,79,.55),0_0_0_1px_rgba(255,255,255,.06)_inset]">
        {/* botões laterais */}
        <span className="absolute -right-[3px] top-28 h-16 w-[3px] rounded-r bg-[#0f1c2a]" aria-hidden />
        <span className="absolute -left-[3px] top-24 h-10 w-[3px] rounded-l bg-[#0f1c2a]" aria-hidden />
        <motion.div
          className="relative overflow-hidden rounded-[2rem] bg-white [container-type:inline-size]"
          initial={false}
          animate={{ paddingBottom: `${screenRatio(src) * 100}%` }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 160, damping: 26 }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img
              key={src}
              src={src}
              alt={alt}
              width={720}
              height={Math.round(720 * screenRatio(src))}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            />
          </AnimatePresence>

          {spot && <Highlight src={src} spot={spot} reduce={!!reduce} />}
        </motion.div>
      </div>
      {children}
    </div>
  );
}

// "Lupa": a tela escurece e uma cópia recortada da região salta levemente da tela.
const LIFT = 1.045;
const lift = { type: 'spring', stiffness: 260, damping: 18, delay: 0.3 } as const;

function Highlight({ src, spot, reduce }: { src: string; spot: Spot; reduce: boolean }) {
  const { x, y, w, h } = spot;
  const radius = cq((spot.r ?? 24) + PAD_PX);
  const rect = { left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%`, borderRadius: radius };
  const move = reduce ? { duration: 0 } : spring;

  return (
    <>
      {/* escurece o resto da tela */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute"
        initial={false}
        animate={rect}
        transition={move}
        style={{ boxShadow: '0 0 0 200vmax rgba(7,26,44,.42)' }}
      />

      {!reduce && (
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ filter: 'drop-shadow(0 18px 24px rgba(7,26,44,.45))' }}>
          <AnimatePresence initial={false}>
            <motion.img
              key={src}
              src={src}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-top"
              initial={{ opacity: 0, scale: 1 }}
              animate={{
                opacity: 1,
                scale: LIFT,
                clipPath: `inset(${y}% ${100 - x - w}% ${100 - y - h}% ${x}% round ${radius})`,
                transformOrigin: `${x + w / 2}% ${y + h / 2}%`,
              }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ ...spring, opacity: { duration: 0.25, delay: 0.3 }, scale: lift }}
            />
          </AnimatePresence>
        </div>
      )}

      <motion.div
        aria-hidden
        className="pointer-events-none absolute ring-2 ring-white/80"
        initial={false}
        animate={{ ...rect, scale: reduce ? 1 : LIFT }}
        transition={{ ...move, scale: lift }}
      />
    </>
  );
}
