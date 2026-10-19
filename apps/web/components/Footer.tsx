import { Headphones } from 'lucide-react';
import { Logo97 } from './site/Logo97';

export default function Footer() {
  return (
    <footer className="bg-night px-5 pt-16 pb-10 text-white/70">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white">
              <Logo97 crop="symbol" className="h-9 w-9" title="" />
            </div>
            <div>
              <div className="font-display text-xl font-bold text-white">
                97<span className="text-cyan">plantões</span>
              </div>
              <div className="text-xs text-white/50">Conectando a Saúde do Brasil</div>
            </div>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm" aria-label="Rodapé">
            <a href="?page=sobre-nos" className="transition hover:text-white">Sobre nós</a>
            <a href="?page=termos-de-uso" className="transition hover:text-white">Termos de Uso</a>
            <a href="?page=termos-de-uso#privacidade" className="transition hover:text-white">Política de Privacidade</a>
            <a
              href="?page=suporte"
              className="flex items-center gap-2 rounded-full border border-cyan/50 px-5 py-2 font-medium text-cyan transition hover:bg-cyan/10"
            >
              <Headphones size={18} />
              Suporte
            </a>
          </nav>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-sm text-white/45">
          <p>© {new Date().getFullYear()} SANT-E TECNOLOGIA EM SAUDE LTDA · CNPJ 63.478.081/0001-50</p>
          <p className="mt-1">Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
