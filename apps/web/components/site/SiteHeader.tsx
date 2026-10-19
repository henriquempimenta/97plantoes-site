import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Logo97 } from './Logo97';

const HOME_LINKS = [
  { href: '#video', label: 'Veja o app' },
  { href: '#medicos', label: 'Para médicos' },
  { href: '#instituicoes', label: 'Para instituições' },
  { href: '#faq', label: 'Dúvidas' },
  { href: '?page=sobre-nos', label: 'Sobre nós' },
];

const PAGE_LINKS = [
  { href: './', label: 'Início' },
  { href: '?page=sobre-nos', label: 'Sobre nós' },
  { href: '?page=suporte', label: 'Suporte' },
];

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display font-bold tracking-tight text-ink ${className}`}>
      97<span className="text-sky">plantões</span>
    </span>
  );
}

export default function SiteHeader({ variant = 'home' }: { variant?: 'home' | 'page' }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const links = variant === 'home' ? HOME_LINKS : PAGE_LINKS;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || open || variant === 'page';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 border-b ${
        solid ? 'bg-white/85 backdrop-blur-xl border-line shadow-[0_8px_30px_-20px_rgba(11,46,79,.35)]' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="./" className="flex items-center gap-2" aria-label="97plantões, página inicial">
          <Logo97 variant="brilho" crop="symbol" className="h-9 w-9" title="" />
          <Wordmark className="text-xl" />
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-ink-soft transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={variant === 'home' ? '#baixar' : './#baixar'}
            className="hidden rounded-full bg-cross px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-cross/25 transition hover:-translate-y-0.5 hover:bg-cross-deep sm:inline-flex"
          >
            Baixar o app
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-ink md:hidden"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Principal (celular)"
            className="overflow-hidden border-t border-line bg-white md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="flex flex-col px-5 py-3">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-base font-medium text-ink">
                  {l.label}
                </a>
              ))}
              <a
                href={variant === 'home' ? '#baixar' : './#baixar'}
                onClick={() => setOpen(false)}
                className="my-3 rounded-full bg-cross px-5 py-3 text-center font-semibold text-white"
              >
                Baixar o app
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
