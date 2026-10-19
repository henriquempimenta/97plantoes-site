import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { Building2, Check, Stethoscope } from 'lucide-react';
import { PhoneFrame } from './PhoneFrame';
import { SectionHeading } from './SectionHeading';
import { STORIES, type Story, type StoryStep } from './storyContent';

const ease = [0.2, 0.8, 0.2, 1] as const;

function useHashTab(): [Story['id'], (id: Story['id']) => void] {
  const fromHash = (): Story['id'] => (window.location.hash === '#instituicoes' ? 'instituicoes' : 'medicos');
  const [tab, setTab] = useState<Story['id']>(fromHash);
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === '#instituicoes' || window.location.hash === '#medicos') setTab(fromHash());
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return [tab, setTab];
}

function StepBlock({
  step,
  index,
  active,
  onActive,
}: {
  step: StoryStep;
  index: number;
  active: boolean;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // ativa o passo quando ele cruza o meio da tela
  const inView = useInView(ref, { margin: '-48% 0px -48% 0px' });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="flex flex-col justify-center py-10 lg:min-h-[78vh] lg:py-0">
      <motion.div
        animate={{ opacity: active ? 1 : 0.32 }}
        transition={{ duration: 0.4 }}
        className="lg:max-w-md"
      >
        <span className="font-mono text-sm font-semibold text-cross">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="mt-2 font-display text-2xl leading-tight font-bold tracking-[-0.02em] text-ink md:text-3xl">
          {step.title}
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{step.text}</p>
        <ul className="mt-5 space-y-2">
          {step.points.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-ink">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sky/15 text-ocean">
                <Check size={13} strokeWidth={3} />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* celular: a tela de cada passo aparece logo abaixo do texto */}
      <div className="mt-8 lg:hidden">
        <PhoneFrame className="mx-auto w-[270px]" src={step.screen} alt={step.alt} spot={inView || active ? step.spot : null} />
      </div>
    </div>
  );
}

function StoryTrack({ story }: { story: Story }) {
  const [active, setActive] = useState(0);
  const step = story.steps[active];
  const reduce = useReducedMotion();

  return (
    <div className="relative grid gap-10 lg:grid-cols-[1fr_minmax(300px,380px)] lg:gap-20">
      <div className="relative lg:pl-10">
        {/* trilho de progresso */}
        <div aria-hidden className="absolute top-0 bottom-0 left-0 hidden w-[3px] rounded-full bg-line lg:block">
          <motion.div
            className="w-full rounded-full bg-gradient-to-b from-sky to-cross"
            animate={{ height: `${((active + 1) / story.steps.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 22 }}
          />
        </div>
        {story.steps.map((s, i) => (
          <StepBlock key={s.title} step={s} index={i} active={i === active} onActive={setActive} />
        ))}
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-24 flex h-[calc(100vh-7rem)] items-center">
          <div className="relative w-full">
            <PhoneFrame className="mx-auto w-[min(340px,calc((100vh-8.5rem)/2.2))]" src={step.screen} alt={step.alt} spot={step.spot}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.callout}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: -12, scale: 0.92 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease, delay: reduce ? 0 : 0.25 }}
                  className="absolute left-[calc(100%-22px)] z-10 rounded-full bg-cross px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap text-white shadow-lg shadow-cross/30"
                  style={{ top: `calc(10px + (100% - 20px) * ${(step.spot.y + step.spot.h / 2) / 100} - 16px)` }}
                >
                  {step.callout}
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>
            <div className="mt-6 flex justify-center gap-1.5" aria-hidden>
              {story.steps.map((_, i) => (
                <motion.span
                  key={i}
                  className="h-1.5 rounded-full bg-ink/20"
                  animate={{ width: i === active ? 22 : 6, backgroundColor: i === active ? '#E11F37' : 'rgba(11,46,79,.2)' }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppStory() {
  const [tab, setTab] = useHashTab();
  const story = STORIES.find((s) => s.id === tab)!;
  const sectionRef = useRef<HTMLElement>(null);

  const choose = (id: Story['id']) => {
    setTab(id);
    // mantém o leitor no começo da história ao trocar de aba
    const top = sectionRef.current?.getBoundingClientRect().top ?? 0;
    if (top < -40) sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="medicos" className="relative bg-mist py-24 md:py-32">
      <span id="instituicoes" className="absolute top-0" aria-hidden />
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 flex justify-center">
          <div role="tablist" aria-label="Escolha seu perfil" className="relative inline-flex rounded-full border border-line bg-white p-1.5 shadow-sm">
            {STORIES.map((s) => {
              const selected = s.id === tab;
              const Icon = s.id === 'medicos' ? Stethoscope : Building2;
              return (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`story-${s.id}`}
                  onClick={() => choose(s.id)}
                  className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors md:px-7 md:text-base ${
                    selected ? 'text-white' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="story-tab-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <Icon size={18} className="relative" />
                  <span className="relative">{s.tab}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={story.id}
            id={`story-${story.id}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease }}
          >
            <SectionHeading eyebrow={story.eyebrow} title={story.title} lede={story.lede} />
            <div className="mt-10 lg:mt-4">
              <StoryTrack story={story} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
