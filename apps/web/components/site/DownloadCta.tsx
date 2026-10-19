import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Logo97 } from './Logo97';
import StoreButtons, { APP_STORE_URL, AppleIcon, PLAY_STORE_URL, PlayIcon } from './StoreButtons';

const qr = (url: string) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}&color=0B2E4F&bgcolor=FFFFFF&margin=8`;

export default function DownloadCta() {
  const reduce = useReducedMotion();
  const logoRef = useRef<HTMLDivElement>(null);
  // a animação "Traço" só começa quando a logo entra na tela
  const logoInView = useInView(logoRef, { once: true, margin: '-120px' });

  return (
    <section id="baixar" className="relative overflow-hidden bg-gradient-to-br from-ink via-[#0E3B66] to-ocean py-24 md:py-32">
      <div aria-hidden className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(98,232,248,.25),transparent_65%)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[auto_1fr]">
        <div ref={logoRef} className="mx-auto grid h-56 w-56 place-items-center rounded-[2.5rem] bg-white shadow-2xl shadow-black/30 md:h-64 md:w-64">
          {logoInView ? (
            <Logo97 variant="traco" className="h-[80%] w-[80%]" />
          ) : (
            <span className="sr-only">97 Plantões</span>
          )}
        </div>

        <div className="text-center lg:text-left">
          <motion.h2
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display text-4xl leading-[1.08] font-bold tracking-[-0.03em] text-white md:text-5xl"
          >
            Conectando a Saúde do Brasil
          </motion.h2>
          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/75 lg:mx-0"
          >
            Baixe o 97plantões e encontre, passe ou publique plantões com segurança. Grátis no iPhone e no Android.
          </motion.p>

          <div className="mt-9 flex flex-col items-center gap-10 lg:flex-row lg:items-end">
            <StoreButtons />
            <div className="hidden gap-5 md:flex">
              {[
                { url: APP_STORE_URL, label: 'App Store', Icon: AppleIcon },
                { url: PLAY_STORE_URL, label: 'Google Play', Icon: PlayIcon },
              ].map(({ url, label, Icon }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <img
                    src={qr(url)}
                    alt={`QR Code para baixar na ${label}`}
                    width={112}
                    height={112}
                    loading="lazy"
                    className="h-28 w-28 rounded-xl bg-white p-1.5"
                  />
                  <span className="flex items-center gap-1.5 text-xs font-medium text-white/80">
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
