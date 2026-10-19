import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const FAQ_GROUPS = [
  {
    category: 'Cadastro e perfil',
    items: [
      {
        q: 'Quem pode se cadastrar?',
        a: 'Médicos de todas as especialidades e gestores de unidades e instituições de saúde. Para manter a comunidade segura, verificamos se o CRM informado é válido junto aos respectivos órgãos. Contas de gestor são liberadas para publicar depois de uma verificação da nossa equipe.',
      },
      {
        q: 'Minhas informações pessoais estão seguras?',
        a: 'Sim. A privacidade dos seus dados é prioridade. Suas informações são protegidas por mecanismos de segurança e criptografia, com foco na confidencialidade.',
      },
      {
        q: 'Posso atualizar meu perfil depois?',
        a: 'Sim. Você pode atualizar foto, dados de contato e especialidades pelo app a qualquer momento. Um perfil completo aumenta a confiança de quem vai escolher você.',
      },
    ],
  },
  {
    category: 'Ofertar um plantão',
    items: [
      {
        q: 'Preciso pagar para ofertar um plantão?',
        a: 'Não. Ofertar um plantão no aplicativo é totalmente gratuito.',
      },
      {
        q: 'Como oferto um plantão?',
        a: 'No Painel, toque em Passar Plantão, escolha se a oferta é pública ou para um grupo, preencha especialidade, unidade, data, horário, duração e valor e toque em Ofertar. O plantão fica visível para os médicos na hora.',
      },
      {
        q: 'Posso escolher quem vai assumir meu plantão?',
        a: 'Sim. Você pode atribuir a oferta a um médico específico ou receber candidaturas abertas e escolher depois de ver o perfil e conversar pelo chat.',
      },
      {
        q: 'Consigo enviar o link do plantão pelo WhatsApp?',
        a: 'Sim. Depois de ofertar, você pode compartilhar o link pelo WhatsApp para que outros médicos acessem o plantão e se candidatem.',
      },
      {
        q: 'Sou avisado quando chega uma candidatura?',
        a: 'Sim. Cada nova candidatura gera uma notificação no app.',
      },
    ],
  },
  {
    category: 'Candidatar-se',
    items: [
      {
        q: 'Posso assumir qualquer plantão publicado?',
        a: 'Sim, desde que o plantão seja em um estado onde o seu CRM é válido.',
      },
      {
        q: 'Como encontro plantões disponíveis?',
        a: 'Pela página inicial, pelo mapa e pela agenda. Dá para filtrar por especialidade e por duração (6h, 12h ou 24h).',
      },
      {
        q: 'Onde acompanho minhas candidaturas?',
        a: 'No Painel, na aba Pendências. Você recebe uma notificação quando for escolhido, e o plantão passa para Confirmados e para a sua agenda.',
      },
    ],
  },
  {
    category: 'Pagamento',
    items: [
      {
        q: 'Quais são as formas de pagamento?',
        a: 'Pix e cartão de crédito, com parcelamento em até 6x.',
      },
      {
        q: 'O pagamento é seguro?',
        a: 'Sim. Os dados são protegidos por mecanismos de segurança e criptografia, e o repasse ao médico só acontece depois que o plantão é realizado.',
      },
      {
        q: 'Se eu assumir um plantão, quando recebo?',
        a: 'Depois de realizar o plantão, o valor é repassado à sua conta bancária. Pix: no mesmo dia ou no dia útil seguinte. Cartão de crédito: em até 14 dias úteis.',
      },
      {
        q: 'O pagamento é garantido depois que eu realizo o plantão?',
        a: 'Sim. Concluído o plantão, o pagamento é processado e repassado para a sua conta nos prazos informados.',
      },
    ],
  },
  {
    category: 'Chat e imprevistos',
    items: [
      {
        q: 'Consigo conversar com o outro médico?',
        a: 'Sim. Você pode conversar antes e depois da confirmação, pelo chat ligado ao plantão. As conversas ficam em Perfil › Conversas.',
      },
      {
        q: 'O chat é privado?',
        a: 'Sim. A conversa é privada entre você e a outra parte do plantão.',
      },
      {
        q: 'E se eu tiver um imprevisto?',
        a: 'No plantão confirmado, toque em Tive um imprevisto. Nosso suporte vai ajudar da melhor forma possível. Lembre que faltar a um plantão pode afetar sua reputação na plataforma.',
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold text-ink"
      >
        {q}
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
          <Plus size={20} className="shrink-0 text-cross" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pr-8 pb-5 leading-relaxed text-ink-soft">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [category, setCategory] = useState(FAQ_GROUPS[0].category);
  const group = FAQ_GROUPS.find((g) => g.category === category)!;

  return (
    <section id="faq" className="bg-mist py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeading eyebrow="Dúvidas" title="Perguntas frequentes" />

        <div className="mt-12 mb-6 flex flex-wrap justify-center gap-2">
          {FAQ_GROUPS.map((g) => {
            const selected = g.category === category;
            return (
              <button
                key={g.category}
                type="button"
                onClick={() => setCategory(g.category)}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  selected ? 'text-white' : 'bg-white text-ink-soft ring-1 ring-line hover:text-ink'
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="faq-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{g.category}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl bg-white px-6 shadow-sm ring-1 ring-line md:px-8"
          >
            {group.items.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
