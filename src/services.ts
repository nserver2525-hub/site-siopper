import {
  Building2,
  CalendarDays,
  ClipboardCheck,
  DoorOpen,
  Eye,
  Landmark,
  Shield,
  UserRound,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'

export type Service = {
  title: string
  description: string
  icon: LucideIcon
}

export const services: Service[] = [
  {
    title: 'Segurança Residencial e Patrimonial',
    description:
      'Presença atenta e medidas de protecção ajustadas a residências, instalações e património.',
    icon: Building2,
  },
  {
    title: 'Controlo de Acessos',
    description:
      'Acompanhamento de entradas e saídas para apoiar a organização e a segurança dos espaços.',
    icon: DoorOpen,
  },
  {
    title: 'Vigilância Armada',
    description:
      'Profissionais preparados para operações de vigilância armada, conforme a necessidade do local.',
    icon: Shield,
  },
  {
    title: 'Vigilância Desarmada',
    description:
      'Observação preventiva e presença profissional em espaços empresariais, residenciais e institucionais.',
    icon: Eye,
  },
  {
    title: 'Apoio em Eventos e Ocasiões Especiais',
    description:
      'Apoio de segurança para a organização e o acolhimento de convidados em eventos.',
    icon: CalendarDays,
  },
  {
    title: 'Consultoria em Prevenção de Riscos e Segurança',
    description:
      'Orientação para identificar necessidades de segurança e considerar medidas de prevenção.',
    icon: ClipboardCheck,
  },
  {
    title: 'Segurança para Administração Pública',
    description:
      'Soluções de segurança humana adaptadas às necessidades de instituições públicas.',
    icon: Landmark,
  },
  {
    title: 'Serviços de Recepcionistas',
    description:
      'Profissionais de recepção para apoiar o atendimento e o encaminhamento de visitantes.',
    icon: UsersRound,
  },
  {
    title: 'Guarda Pessoal (Guarda-Costas)',
    description:
      'Protecção pessoal planeada de acordo com o contexto e as necessidades do cliente.',
    icon: UserRound,
  },
]

export const serviceOptions = services.map(({ title }) => title)
