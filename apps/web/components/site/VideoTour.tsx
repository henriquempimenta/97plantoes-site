import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Play } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

// Capítulos do vídeo de apresentação (97plantoes-midia, timeline de 147 s)
const CHAPTERS = [
  { t: 4.9, end: 24.3, title: 'Plantões para você', desc: 'Feed com especialidade, local, data e valor' },
  { t: 24.3, end: 34.5, title: 'Filtros', desc: 'Especialidade e duração do plantão' },
  { t: 34.5, end: 43, title: 'Candidatura', desc: 'Detalhes completos e candidatura em um toque' },
  { t: 43, end: 63, title: 'Mapa', desc: 'Unidades e plantões pela localização' },
  { t: 63, end: 82, title: 'Agenda', desc: 'Datas, confirmados e oportunidades do dia' },
  { t: 82, end: 99, title: 'Painel', desc: 'Pendências, confirmados e candidatos' },
  { t: 99, end: 128, title: 'Recebimentos', desc: 'Dados protegidos e repasses' },
  { t: 128, end: 147, title: 'Passar plantão', desc: 'Pagamento por Pix ou cartão em até 6x' },
];

function fmt(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

export default function VideoTour() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);

  const playFrom = (t?: number) => {
    const v = videoRef.current;
    if (!v) return;
    if (t !== undefined) v.currentTime = t;
    setStarted(true);
    void v.play();
  };

  return (
    <section id="video" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Veja o app em ação"
          title="Dois minutos para conhecer o 97plantões"
          lede="Do feed ao pagamento: veja como é encontrar, confirmar e passar plantões no app. Escolha um capítulo para ir direto ao ponto."
        />

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1fr_340px]">
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative mx-auto aspect-square w-full max-w-[640px] overflow-hidden rounded-[2rem] bg-mist shadow-[0_40px_90px_-40px_rgba(11,46,79,.5)] ring-1 ring-line"
          >
            <video
              ref={videoRef}
              className="h-full w-full"
              poster="./media/tour-poster.jpg"
              preload="none"
              playsInline
              controls={started}
              onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            >
              <source src="./media/tour-97plantoes.mp4" type="video/mp4" />
              Seu navegador não suporta vídeo.
            </video>

            {!started && (
              <button
                type="button"
                onClick={() => playFrom()}
                className="group absolute inset-0 flex items-end justify-start bg-gradient-to-t from-ink/35 via-transparent to-transparent p-6"
                aria-label="Assistir ao vídeo de apresentação do app"
              >
                <span className="relative inline-flex items-center gap-3 rounded-full bg-cross py-2 pr-6 pl-2 font-semibold text-white shadow-2xl shadow-cross/40 transition group-hover:scale-[1.03]">
                  <span className="relative grid h-11 w-11 place-items-center rounded-full bg-white/20">
                    {!reduce && <span className="absolute inset-0 animate-ping rounded-full bg-white/30" />}
                    <Play size={20} className="relative ml-0.5 fill-current" />
                  </span>
                  Assistir · 2:27
                </span>
              </button>
            )}
          </motion.div>

          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1" aria-label="Capítulos do vídeo">
            {CHAPTERS.map((c, i) => {
              const active = started && time >= c.t && time < c.end;
              const progress = active ? (time - c.t) / (c.end - c.t) : 0;
              return (
                <motion.li
                  key={c.t}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <button
                    type="button"
                    onClick={() => playFrom(c.t)}
                    className={`relative w-full overflow-hidden rounded-2xl border px-4 py-3 text-left transition ${
                      active ? 'border-sky/50 bg-sky/10' : 'border-line bg-mist/60 hover:border-sky/40 hover:bg-white'
                    }`}
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-ink">{c.title}</span>
                      <span className="font-mono text-xs text-ink-soft">{fmt(c.t)}</span>
                    </span>
                    <span className="mt-0.5 block text-sm text-ink-soft">{c.desc}</span>
                    {active && (
                      <span
                        aria-hidden
                        className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-sky to-ocean"
                        style={{ width: `${progress * 100}%` }}
                      />
                    )}
                  </button>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
