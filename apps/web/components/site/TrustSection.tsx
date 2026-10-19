import { motion, useReducedMotion } from 'motion/react';
import { Lock, ShieldCheck, Star, Wallet } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const ITEMS = [
  {
    icon: ShieldCheck,
    title: 'CRM verificado',
    text: 'Verificamos se o CRM informado é válido junto aos órgãos responsáveis. Apenas médicos ativos participam.',
  },
  {
    icon: Wallet,
    title: 'Pagamento garantido',
    text: 'O valor do plantão fica retido e só é repassado ao médico depois que o plantão é realizado.',
  },
  {
    icon: Lock,
    title: 'Dados protegidos',
    text: 'Informações pessoais e de pagamento protegidas por mecanismos de segurança e criptografia.',
  },
  {
    icon: Star,
    title: 'Reputação que conta',
    text: 'Avaliações e o histórico de plantões cumpridos ajudam a escolher quem assume e destacam quem é confiável.',
  },
];

export default function TrustSection() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div aria-hidden className="absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(98,232,248,.18),transparent_65%)]" />
      <div aria-hidden className="absolute bottom-[-30%] left-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(225,31,55,.14),transparent_65%)]" />

      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          dark
          eyebrow="Segurança em primeiro lugar"
          title="Feito para quem não pode ter surpresa no plantão"
          lede="Cada etapa foi pensada para dar tranquilidade a quem passa, a quem assume e a quem publica."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="group flex gap-5 rounded-3xl border border-white/10 bg-white/[.04] p-7 transition hover:border-cyan/30 hover:bg-white/[.07]"
            >
              <motion.span
                initial={reduce ? false : { scale: 0, rotate: -45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + i * 0.08, type: 'spring', stiffness: 260, damping: 16 }}
                className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan/25 to-sky/10 text-cyan"
              >
                <item.icon size={28} />
              </motion.span>
              <div>
                <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-white/65">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
