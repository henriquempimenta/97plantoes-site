import type { Spot } from './PhoneFrame';

export type StoryStep = {
  title: string;
  text: string;
  points: string[];
  screen: string;
  alt: string;
  spot: Spot;
  callout: string;
};

export type Story = {
  id: 'medicos' | 'instituicoes';
  tab: string;
  eyebrow: string;
  title: string;
  lede: string;
  steps: StoryStep[];
};

const S = (name: string) => `./media/screens/${name}.webp`;

export const STORIES: Story[] = [
  {
    id: 'medicos',
    tab: 'Para médicos',
    eyebrow: 'Para médicos',
    title: 'Do primeiro toque ao plantão na agenda',
    lede: 'Tudo o que você precisa para decidir aparece antes da candidatura. Depois, o app organiza o resto.',
    steps: [
      {
        title: 'Encontre plantões que combinam com você',
        text: 'O feed mostra especialidade, unidade, data, duração e valor de cada oportunidade, sem precisar abrir nada.',
        points: ['Filtros por especialidade e duração (6h, 12h, 24h)', 'Plantões públicos e dos seus grupos'],
        screen: S('app-feed'),
        alt: 'Feed de plantões com especialidade, hospital, data e valor',
        spot: { x: 3.74, y: 6.92, w: 92.52, h: 20.22, r: 30 },
        callout: 'Valor e duração à vista',
      },
      {
        title: 'Explore pelo mapa',
        text: 'Veja as unidades perto de você e abra a lista de plantões de cada uma com um toque no marcador.',
        points: ['Unidades por localização', 'Plantões da unidade no mesmo lugar'],
        screen: S('app-map-hospital-iphone16'),
        alt: 'Mapa com a unidade Hospital Badim e seus plantões disponíveis',
        spot: { x: 3.74, y: 45.41, w: 92.52, h: 20.25, r: 30 },
        callout: 'Plantões da unidade',
      },
      {
        title: 'Confira os detalhes e candidate-se',
        text: 'Local, horário de início e de saída, período e valor. Decida com tudo à vista e candidate-se em um toque.',
        points: ['Quem oferta o plantão', 'Compartilhe a vaga pelo WhatsApp'],
        screen: S('app-shift-details'),
        alt: 'Detalhes do plantão de CTI Adulto com data, horário, período e valor',
        spot: { x: 45.54, y: 92.43, w: 50.72, h: 5.98, r: 12 },
        callout: 'Candidate-se em um toque',
      },
      {
        title: 'Converse antes de decidir',
        text: 'O chat fica ligado ao plantão: alinhe a passagem, os detalhes da unidade e confirme que a mensagem foi lida.',
        points: ['Conversa privada entre os médicos', 'Confirmação de entrega e leitura'],
        screen: S('doctor-chat-conversation'),
        alt: 'Conversa sobre um plantão de CTI Adulto com confirmação de leitura',
        spot: { x: 9.43, y: 62.57, w: 86.41, h: 11.26, r: 26 },
        callout: 'Mensagem lida',
      },
      {
        title: 'Organize sua agenda',
        text: 'Seus plantões confirmados e as oportunidades do dia ficam no calendário, com lembretes antes de cada plantão.',
        points: ['Alarmes de 1 semana até 3h antes', 'Pendências e confirmados no Painel'],
        screen: S('app-calendar'),
        alt: 'Agenda do mês com plantões disponíveis no dia selecionado',
        spot: { x: 3.74, y: 57.72, w: 92.52, h: 28.87, r: 30 },
        callout: 'Plantões do dia',
      },
      {
        title: 'Acompanhe seu faturamento',
        text: 'Veja quanto você realizou no mês e no ano, quantos plantões e quantas horas. O repasse acontece depois do plantão realizado.',
        points: ['Visão mensal e anual', 'Pagamento garantido após o plantão'],
        screen: S('doctor-monthly-billing'),
        alt: 'Faturamento mensal com o resultado do mês',
        spot: { x: 4.16, y: 36.56, w: 91.69, h: 21.73, r: 30 },
        callout: 'Resultado do mês',
      },
    ],
  },
  {
    id: 'instituicoes',
    tab: 'Para instituições',
    eyebrow: 'Para instituições e gestores',
    title: 'Publique o plantão e escolha quem assume',
    lede: 'Gestores de unidades de saúde publicam ofertas e acompanham cada candidatura. O mesmo fluxo vale para o médico que precisa passar um plantão.',
    steps: [
      {
        title: 'Publique em poucos campos',
        text: 'Escolha se a oferta é pública ou só para o seu grupo, informe especialidade, unidade, data, horário, duração e valor.',
        points: ['Oferta pública ou para o grupo', 'Unidades salvas para reutilizar'],
        screen: S('institution-publish-shift'),
        alt: 'Formulário de publicação de plantão com tipo, especialidade e localidade',
        spot: { x: 4.16, y: 18.12, w: 91.83, h: 10.95, r: 16 },
        callout: 'Público ou para o grupo',
      },
      {
        title: 'Acompanhe suas ofertas',
        text: 'No Painel, cada oferta mostra o status e avisa quando chega uma nova candidatura.',
        points: ['Notificação a cada candidatura', 'Edite ou retire a oferta quando precisar'],
        screen: S('app-dashboard-offers'),
        alt: 'Painel com as ofertas de plantão publicadas',
        spot: { x: 3.74, y: 14.36, w: 92.52, h: 20.28, r: 30 },
        callout: 'Nova candidatura',
      },
      {
        title: 'Receba candidaturas de médicos verificados',
        text: 'Compare os candidatos, abra o perfil de cada um e aceite com um toque. Se preferir, atribua o plantão direto a um médico.',
        points: ['Selo de CRM verificado', 'Ordem pelas melhores avaliações'],
        screen: S('institution-manage-candidates'),
        alt: 'Lista de candidaturas com botões de aceitar, recusar e enviar mensagem',
        spot: { x: 4.16, y: 34.06, w: 91.69, h: 29.7, r: 30 },
        callout: 'Aceitar com um toque',
      },
      {
        title: 'Conheça o profissional',
        text: 'Foto, especialidade e CRM no perfil do candidato. Converse pelo chat antes de confirmar.',
        points: ['Perfil profissional', 'Chat ligado à oferta'],
        screen: S('institution-candidate-profile'),
        alt: 'Perfil de candidato com foto, especialidade e CRM',
        spot: { x: 3.88, y: 65.93, w: 38.77, h: 19.86, r: 14 },
        callout: 'Especialidade e CRM',
      },
      {
        title: 'Pague com segurança',
        text: 'Pix ou cartão de crédito em até 6x. O valor fica retido e só é repassado ao médico depois que o plantão é realizado.',
        points: ['Total revisado antes de pagar', 'Repasse após a conclusão'],
        screen: S('app-payment'),
        alt: 'Tela de pagamento do plantão com opções de cartão e Pix',
        spot: { x: 7.77, y: 50.6, w: 84.61, h: 5.85, r: 12 },
        callout: 'Pix ou cartão em até 6x',
      },
    ],
  },
];
