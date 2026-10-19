import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { CalendarCheck, CheckCircle2, PlayCircle } from 'lucide-react';
import { Logo97 } from './Logo97';
import { PhoneFrame, type Spot } from './PhoneFrame';
import StoreButtons from './StoreButtons';

// Cards do feed em app-feed.webp
const FEED_SPOTS: Spot[] = [
  { x: 3.74, y: 6.92, w: 92.52, h: 20.22, r: 30 },
  { x: 3.74, y: 27.64, w: 92.52, h: 20.22, r: 30 },
  { x: 3.74, y: 48.42, w: 92.52, h: 20.22, r: 30 },
];

const ease = [0.2, 0.8, 0.2, 1] as const;
// O texto entra logo depois da montagem da logo (~1,6 s)
const TEXT_DELAY = 1.0;

function FloatingCard({
  children,
  className,
  delay,
  floatPhase = 0,
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
  floatPhase?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`absolute z-10 ${className}`}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 220, damping: 20 }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: floatPhase }}
        className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-[0_20px_40px_-20px_rgba(11,46,79,.45)] backdrop-blur-md"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const [spotIndex, setSpotIndex] = useState(0);
  const [showSpot, setShowSpot] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.25]);

  useEffect(() => {
    if (reduce) return;
    const start = window.setTimeout(() => setShowSpot(true), 2600);
    const cycle = window.setInterval(() => setSpotIndex((i) => (i + 1) % FEED_SPOTS.length), 3200);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(cycle);
    };
  }, [reduce]);

  const rise = (i: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: TEXT_DELAY + i * 0.09, duration: 0.7, ease },
  });

  return (
    <section ref={ref} className="relative overflow-hidden pt-28 pb-20 md:pt-32 lg:pb-28">
      {/* fundo: grade suave + brilhos nas cores da logo */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(11,46,79,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(11,46,79,.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)',
        }}
      />
      <motion.div
        aria-hidden
        style={{ scale: glowScale }}
        className="absolute -top-40 right-[-10%] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(98,232,248,.45),transparent_65%)] blur-2xl"
      />
      <div
        aria-hidden
        className="absolute bottom-[-20%] left-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(58,170,223,.25),transparent_65%)] blur-2xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <Logo97 variant="montagem" className="mb-6 h-28 w-auto md:h-32" title="97 Plantões" />

          <motion.p
            {...rise(0)}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[.14em] text-ocean"
          >
            <span className="h-2 w-2 rounded-full bg-cross" />
            De médico para médico
          </motion.p>

          <motion.h1
            {...rise(1)}
            className="font-display text-4xl leading-[1.08] font-bold tracking-[-0.03em] text-ink md:text-5xl lg:text-[3.6rem]"
          >
            O app que conecta médicos a <span className="text-gradient-brand">plantões em todo o Brasil</span>.
          </motion.h1>

          <motion.p {...rise(2)} className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Encontre plantões perto de você ou passe o seu para médicos com CRM verificado. Instituições de saúde publicam
            ofertas e escolhem quem assume, tudo com chat, agenda e pagamento garantido.
          </motion.p>

          <motion.div {...rise(3)} className="mt-9 flex flex-col gap-5">
            <StoreButtons />
            <a href="#video" className="group inline-flex items-center gap-2 font-semibold text-ocean">
              <PlayCircle className="transition-transform group-hover:scale-110" size={22} />
              Veja o app em ação
              <span className="text-ink-soft font-normal">· 2 min</span>
            </a>
          </motion.div>
        </div>

        <motion.div style={{ y: phoneY }} className="relative mx-auto w-full max-w-[290px] lg:max-w-[330px]">
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.5, duration: 1, ease }}
          >
            <PhoneFrame
              src="./media/screens/app-feed.webp"
              alt="Tela inicial do app 97plantões com plantões disponíveis: especialidade, hospital, data e valor"
              spot={showSpot ? FEED_SPOTS[spotIndex] : null}
              priority
            />
          </motion.div>

          <FloatingCard className="-left-6 top-16 sm:-left-28" delay={1.9}>
            <Logo97 variant="batimento" crop="cross" className="h-9 w-9" title="" />
            <div>
              <p className="text-sm font-semibold text-ink">Nova vaga perto de você</p>
              <p className="text-xs text-ink-soft">CTI Adulto · 12h · R$ 1.250</p>
            </div>
          </FloatingCard>

          <FloatingCard className="-right-4 top-[46%] sm:-right-20" delay={2.5} floatPhase={1.2}>
            <CheckCircle2 className="text-emerald-500" size={28} />
            <div>
              <p className="text-sm font-semibold text-ink">Candidatura enviada</p>
              <p className="text-xs text-ink-soft">Hospital São Lucas</p>
            </div>
          </FloatingCard>

          <FloatingCard className="-left-4 bottom-14 sm:-left-24" delay={3.1} floatPhase={2.4}>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-ocean/10 text-ocean">
              <CalendarCheck size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">Plantão confirmado</p>
              <p className="text-xs text-ink-soft">Sáb · 17 out · 19:00</p>
            </div>
          </FloatingCard>
        </motion.div>
      </div>
    </section>
  );
}
