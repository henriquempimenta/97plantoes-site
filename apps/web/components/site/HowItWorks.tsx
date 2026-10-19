import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { CreditCard, MessageCircle, Search, UserPlus } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const STEPS = [
  { icon: UserPlus, title: 'Cadastre-se', text: 'Como médico, com seu CRM, ou como gestor de uma unidade de saúde.' },
  { icon: Search, title: 'Oferte ou candidate-se', text: 'Publique um plantão ou encontre o próximo pelo feed, mapa ou agenda.' },
  { icon: MessageCircle, title: 'Converse pelo chat', text: 'Alinhe os detalhes da passagem direto com a outra parte.' },
  { icon: CreditCard, title: 'Pagamento garantido', text: 'Pix ou cartão em até 6x, com repasse após o plantão realizado.' },
];

export default function HowItWorks() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 55%'] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="como-funciona" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Simples e rápido" title="Como funciona" />

        <div ref={ref} className="relative mt-16">
          {/* linha que se preenche com a rolagem */}
          <div aria-hidden className="absolute top-8 right-[12.5%] left-[12.5%] hidden h-[3px] rounded-full bg-line md:block">
            <motion.div
              className="h-full origin-left rounded-full bg-gradient-to-r from-sky via-ocean to-cross"
              style={{ scaleX: reduce ? 1 : line }}
            />
          </div>

          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.title}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                className="flex flex-col items-center text-center"
              >
                <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-white text-ocean shadow-[0_12px_30px_-12px_rgba(23,97,166,.5)] ring-1 ring-line">
                  <s.icon size={26} />
                  <span className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-cross text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
