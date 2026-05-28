export type ReportStatus =
  | "recebida"
  | "em_analise"
  | "encaminhada"
  | "em_andamento"
  | "resolvida"
  | "arquivada";

export type ReportCategory =
  | "buracos"
  | "iluminacao"
  | "lixo"
  | "agua"
  | "seguranca"
  | "infraestrutura"
  | "transporte"
  | "outros";

export type ReportPriority = "baixa" | "media" | "alta";

export interface TimelineEvent {
  date: string;
  status: ReportStatus;
  title: string;
  description: string;
  author: string;
}

export interface Report {
  id: string;
  protocol: string;
  title: string;
  description: string;
  category: ReportCategory;
  priority: ReportPriority;
  status: ReportStatus;
  address: string;
  district: string;
  coords: { x: number; y: number };
  createdAt: string;
  updatedAt: string;
  assignee?: string;
  image?: string;
  notes?: string;
  timeline: TimelineEvent[];
  authorName: string;
  authorEmail: string;
  responses?: { author: string; date: string; text: string }[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "atualizacao" | "resposta" | "confirmacao" | "alerta";
}

export type Route =
  | { name: "landing" }
  | { name: "login" }
  | { name: "register" }
  | { name: "forgot" }
  | { name: "dashboard" }
  | { name: "new-report" }
  | { name: "report-sent"; id: string }
  | { name: "report-detail"; id: string }
  | { name: "history" }
  | { name: "profile" }
  | { name: "map" }
  | { name: "admin-dashboard" }
  | { name: "admin-reports" }
  | { name: "admin-detail"; id: string }
  | { name: "admin-map" };

export const CATEGORY_LABELS: Record<ReportCategory, string> = {
  buracos: "Buracos e vias públicas",
  iluminacao: "Iluminação pública",
  lixo: "Lixo e limpeza urbana",
  agua: "Vazamento de água",
  seguranca: "Segurança",
  infraestrutura: "Infraestrutura",
  transporte: "Transporte",
  outros: "Outros",
};

export const STATUS_LABELS: Record<ReportStatus, string> = {
  recebida: "Recebida",
  em_analise: "Em análise",
  encaminhada: "Encaminhada",
  em_andamento: "Em andamento",
  resolvida: "Resolvida",
  arquivada: "Arquivada",
};

export const PRIORITY_LABELS: Record<ReportPriority, string> = {
  baixa: "Baixa",
  media: "Média",
  alta: "Alta",
};
