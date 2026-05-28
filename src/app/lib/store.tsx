import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import type { Report, Notification, Route, ReportStatus } from "./types";

interface User {
  name: string;
  email: string;
  phone?: string;
  district?: string;
  joinedAt: string;
}

interface Store {
  route: Route;
  navigate: (r: Route) => void;
  user: User | null;
  isAdmin: boolean;
  login: (email: string, asAdmin?: boolean) => void;
  logout: () => void;
  reports: Report[];
  addReport: (r: Omit<Report, "id" | "protocol" | "createdAt" | "updatedAt" | "timeline" | "status" | "authorName" | "authorEmail">) => Report;
  updateReportStatus: (id: string, status: ReportStatus, note?: string) => void;
  addResponse: (id: string, text: string) => void;
  notifications: Notification[];
  markNotificationsRead: () => void;
}

const StoreContext = createContext<Store | null>(null);

const seedReports: Report[] = [
  {
    id: "r1",
    protocol: "SPK-2026-0148",
    title: "Buraco profundo na Rua das Acácias",
    description: "Buraco de grande porte com aproximadamente 60cm de diâmetro próximo ao número 320, causando risco a veículos e pedestres.",
    category: "buracos",
    priority: "alta",
    status: "em_andamento",
    address: "Rua das Acácias, 320",
    district: "Centro",
    coords: { x: 35, y: 40 },
    createdAt: "2026-05-18T10:23:00",
    updatedAt: "2026-05-24T15:12:00",
    assignee: "Equipe de Pavimentação - Setor 3",
    authorName: "Marina Costa",
    authorEmail: "marina.costa@email.com",
    timeline: [
      { date: "2026-05-18T10:23:00", status: "recebida", title: "Denúncia recebida", description: "Protocolo gerado e encaminhado para triagem.", author: "Sistema" },
      { date: "2026-05-19T09:05:00", status: "em_analise", title: "Em análise", description: "Equipe técnica avaliando a ocorrência. Dano confirmado.", author: "Central de Atendimento" },
      { date: "2026-05-21T14:00:00", status: "encaminhada", title: "Encaminhada ao setor responsável", description: "Caso encaminhado à Secretaria de Obras.", author: "Coordenação" },
      { date: "2026-05-24T15:12:00", status: "em_andamento", title: "Reparo programado", description: "Equipe de pavimentação programada para 31/05.", author: "Equipe de Pavimentação" },
    ],
    responses: [
      { author: "Equipe de Pavimentação", date: "2026-05-24T15:12:00", text: "Reparo programado para 31/05. Pedimos atenção à sinalização provisória no local." },
    ],
  },
  {
    id: "r2",
    protocol: "SPK-2026-0089",
    title: "Poste com lâmpada queimada",
    description: "Iluminação ausente em trecho da Av. Brasil, próximo à praça verde, há mais de duas semanas. Risco de segurança.",
    category: "iluminacao",
    priority: "media",
    status: "em_analise",
    address: "Av. Brasil, altura do nº 1500",
    district: "Vila Nova",
    coords: { x: 60, y: 30 },
    createdAt: "2026-05-22T19:40:00",
    updatedAt: "2026-05-23T08:10:00",
    assignee: "Iluminação Pública",
    authorName: "Marina Costa",
    authorEmail: "marina.costa@email.com",
    timeline: [
      { date: "2026-05-22T19:40:00", status: "recebida", title: "Denúncia recebida", description: "Protocolo registrado em sistema.", author: "Sistema" },
      { date: "2026-05-23T08:10:00", status: "em_analise", title: "Em análise", description: "Avaliação técnica em andamento. Falha confirmada.", author: "Central de Atendimento" },
    ],
  },
  {
    id: "r3",
    protocol: "SPK-2026-0201",
    title: "Acúmulo de lixo em terreno baldio",
    description: "Descarte irregular em terreno baldio causando mau cheiro e proliferação de insetos na região.",
    category: "lixo",
    priority: "alta",
    status: "resolvida",
    address: "Rua dos Pinheiros, 87",
    district: "Jardim América",
    coords: { x: 25, y: 65 },
    createdAt: "2026-04-30T11:00:00",
    updatedAt: "2026-05-09T16:20:00",
    assignee: "Limpeza Urbana",
    authorName: "Marina Costa",
    authorEmail: "marina.costa@email.com",
    timeline: [
      { date: "2026-04-30T11:00:00", status: "recebida", title: "Recebida", description: "Protocolo aberto e classificado como alta prioridade.", author: "Sistema" },
      { date: "2026-05-02T09:30:00", status: "em_analise", title: "Em análise", description: "Inspeção visual confirmou o descarte.", author: "Central de Atendimento" },
      { date: "2026-05-05T10:00:00", status: "em_andamento", title: "Coleta agendada", description: "Caminhão de coleta especial designado.", author: "Limpeza Urbana" },
      { date: "2026-05-09T16:20:00", status: "resolvida", title: "Resolvida", description: "Local higienizado e fiscalizado. Monitoramento em andamento.", author: "Limpeza Urbana" },
    ],
    responses: [
      { author: "Limpeza Urbana", date: "2026-05-09T16:20:00", text: "Limpeza concluída e certificada. Local será monitorado semanalmente pela fiscalização." },
    ],
  },
  {
    id: "r4",
    protocol: "SPK-2026-0317",
    title: "Vazamento de água em calçada",
    description: "Água potável escorrendo continuamente na calçada da Rua Sete de Setembro, possivelmente por ruptura de tubulação.",
    category: "agua",
    priority: "alta",
    status: "encaminhada",
    address: "Rua Sete de Setembro, 412",
    district: "Centro",
    coords: { x: 45, y: 50 },
    createdAt: "2026-05-25T07:15:00",
    updatedAt: "2026-05-26T10:00:00",
    assignee: "Concessionária de Saneamento",
    authorName: "Carlos Pereira",
    authorEmail: "carlos.pereira@email.com",
    timeline: [
      { date: "2026-05-25T07:15:00", status: "recebida", title: "Recebida", description: "Registro efetuado como urgência.", author: "Sistema" },
      { date: "2026-05-25T14:00:00", status: "em_analise", title: "Em análise", description: "Verificação inicial confirmou vazamento ativo.", author: "Central de Atendimento" },
      { date: "2026-05-26T10:00:00", status: "encaminhada", title: "Encaminhada", description: "Encaminhada à concessionária com prioridade.", author: "Coordenação" },
    ],
  },
  {
    id: "r5",
    protocol: "SPK-2026-0152",
    title: "Calçada quebrada dificultando acesso",
    description: "Trecho de calçada com pedras soltas e asfalto danificado dificultando a passagem de pedestres e pessoas com deficiência.",
    category: "infraestrutura",
    priority: "media",
    status: "recebida",
    address: "Rua Marechal Deodoro, 88",
    district: "Bela Vista",
    coords: { x: 70, y: 55 },
    createdAt: "2026-05-26T18:30:00",
    updatedAt: "2026-05-26T18:30:00",
    authorName: "Ana Souza",
    authorEmail: "ana.souza@email.com",
    timeline: [
      { date: "2026-05-26T18:30:00", status: "recebida", title: "Recebida", description: "Aguardando triagem e classificação.", author: "Sistema" },
    ],
  },
  {
    id: "r6",
    protocol: "SPK-2026-0095",
    title: "Semáforo intermitente no cruzamento",
    description: "Semáforo em modo amarelo piscante continuamente há vários dias no cruzamento principal, causando confusão entre motoristas.",
    category: "transporte",
    priority: "alta",
    status: "em_andamento",
    address: "Av. Paulista x Rua Augusta",
    district: "Centro",
    coords: { x: 55, y: 25 },
    createdAt: "2026-05-15T08:00:00",
    updatedAt: "2026-05-20T11:30:00",
    assignee: "Engenharia de Tráfego",
    authorName: "João Mendes",
    authorEmail: "joao.mendes@email.com",
    timeline: [
      { date: "2026-05-15T08:00:00", status: "recebida", title: "Recebida", description: "Protocolo aberto como risco de trânsito.", author: "Sistema" },
      { date: "2026-05-16T09:00:00", status: "em_analise", title: "Em análise", description: "Verificação técnica do semáforo realizada.", author: "Central de Atendimento" },
      { date: "2026-05-20T11:30:00", status: "em_andamento", title: "Reparo em campo", description: "Equipe de tráfego no local realizando manutenção.", author: "Engenharia de Tráfego" },
    ],
  },
  {
    id: "r7",
    protocol: "SPK-2026-0044",
    title: "Praça com iluminação inoperante",
    description: "Praça da República com vários postes de iluminação inoperantes, reduzindo a segurança pública no período noturno.",
    category: "seguranca",
    priority: "media",
    status: "resolvida",
    address: "Praça da República",
    district: "Centro",
    coords: { x: 50, y: 45 },
    createdAt: "2026-04-10T20:00:00",
    updatedAt: "2026-04-28T09:00:00",
    assignee: "Iluminação Pública",
    authorName: "Patrícia Lima",
    authorEmail: "patricia@email.com",
    timeline: [
      { date: "2026-04-10T20:00:00", status: "recebida", title: "Recebida", description: "Protocolo registrado.", author: "Sistema" },
      { date: "2026-04-28T09:00:00", status: "resolvida", title: "Resolvida", description: "Substituição de lâmpadas concluída. Sistema testado.", author: "Iluminação Pública" },
    ],
  },
  {
    id: "r8",
    protocol: "SPK-2026-0198",
    title: "Rua com asfalto danificado",
    description: "Diversos buracos e afundamentos na Rua Getúlio Vargas causando danos a veículos.",
    category: "buracos",
    priority: "media",
    status: "em_analise",
    address: "Rua Getúlio Vargas, 654",
    district: "Setor Norte",
    coords: { x: 42, y: 28 },
    createdAt: "2026-05-20T14:22:00",
    updatedAt: "2026-05-23T10:45:00",
    assignee: "Equipe de Pavimentação - Setor 1",
    authorName: "Roberto Silva",
    authorEmail: "roberto.silva@email.com",
    timeline: [
      { date: "2026-05-20T14:22:00", status: "recebida", title: "Recebida", description: "Protocolo gerado.", author: "Sistema" },
      { date: "2026-05-23T10:45:00", status: "em_analise", title: "Em análise", description: "Vistoria técnica confirmou necessidade de recapeamento.", author: "Central de Atendimento" },
    ],
  },
  {
    id: "r9",
    protocol: "SPK-2026-0267",
    title: "Arbustos crescendo sobre calçada",
    description: "Arbustos e galhos próximos à Avenida Industrial estão crescendo sobre a calçada, bloqueando a passagem.",
    category: "infraestrutura",
    priority: "baixa",
    status: "recebida",
    address: "Avenida Industrial, 223",
    district: "Industrial",
    coords: { x: 20, y: 30 },
    createdAt: "2026-05-25T16:15:00",
    updatedAt: "2026-05-25T16:15:00",
    authorName: "Fernanda Rocha",
    authorEmail: "fernanda.rocha@email.com",
    timeline: [
      { date: "2026-05-25T16:15:00", status: "recebida", title: "Recebida", description: "Aguardando triagem.", author: "Sistema" },
    ],
  },
  {
    id: "r10",
    protocol: "SPK-2026-0226",
    title: "Acúmulo de água em cruzamento",
    description: "Água acumulada no cruzamento da Rua Vila Verde com Avenida Norte após chuvas, formando poça profunda.",
    category: "agua",
    priority: "media",
    status: "em_andamento",
    address: "Rua Vila Verde x Avenida Norte",
    district: "Vila Nova",
    coords: { x: 65, y: 35 },
    createdAt: "2026-05-21T10:08:00",
    updatedAt: "2026-05-24T13:20:00",
    assignee: "Drenagem Urbana",
    authorName: "Lucas Santos",
    authorEmail: "lucas.santos@email.com",
    timeline: [
      { date: "2026-05-21T10:08:00", status: "recebida", title: "Recebida", description: "Protocolo gerado.", author: "Sistema" },
      { date: "2026-05-22T08:30:00", status: "em_analise", title: "Em análise", description: "Drenagem verificada. Entupimento localizado.", author: "Central de Atendimento" },
      { date: "2026-05-24T13:20:00", status: "em_andamento", title: "Limpeza agendada", description: "Limpeza de bueiro programada.", author: "Drenagem Urbana" },
    ],
  },
  {
    id: "r11",
    protocol: "SPK-2026-0314",
    title: "Falta de sinalização de trânsito",
    description: "Placa de trânsito danificada e falta de sinalização horizontal no cruzamento da Rua Principal.",
    category: "transporte",
    priority: "media",
    status: "encaminhada",
    address: "Rua Principal x Avenida Comercial",
    district: "Centro",
    coords: { x: 48, y: 48 },
    createdAt: "2026-05-24T09:45:00",
    updatedAt: "2026-05-25T11:30:00",
    assignee: "Engenharia de Tráfego",
    authorName: "Monica Silva",
    authorEmail: "monica.silva@email.com",
    timeline: [
      { date: "2026-05-24T09:45:00", status: "recebida", title: "Recebida", description: "Protocolo registrado.", author: "Sistema" },
      { date: "2026-05-25T11:30:00", status: "encaminhada", title: "Encaminhada", description: "Encaminhada para substituição de placa.", author: "Coordenação" },
    ],
  },
  {
    id: "r12",
    protocol: "SPK-2026-0105",
    title: "Depósito irregular de lixo de construção",
    description: "Entulho e lixo de construção depositados irregularmente na Rua da Paz.",
    category: "lixo",
    priority: "alta",
    status: "em_andamento",
    address: "Rua da Paz, 445",
    district: "Setor Sul",
    coords: { x: 58, y: 72 },
    createdAt: "2026-05-23T07:30:00",
    updatedAt: "2026-05-26T12:00:00",
    assignee: "Limpeza Urbana",
    authorName: "Gustavo Oliveira",
    authorEmail: "gustavo.oliveira@email.com",
    timeline: [
      { date: "2026-05-23T07:30:00", status: "recebida", title: "Recebida", description: "Protocolo gerado como alta prioridade.", author: "Sistema" },
      { date: "2026-05-23T14:00:00", status: "em_analise", title: "Em análise", description: "Inspeção realizada e volume estimado.", author: "Central de Atendimento" },
      { date: "2026-05-26T12:00:00", status: "em_andamento", title: "Coleta agendada", description: "Caminhão de entulho programado para 27/05.", author: "Limpeza Urbana" },
    ],
  },
  {
    id: "r13",
    protocol: "SPK-2026-0078",
    title: "Bancos quebrados em praça pública",
    description: "Múltiplos bancos danificados na Praça da Liberdade, com madeira apodrecida.",
    category: "infraestrutura",
    priority: "baixa",
    status: "encaminhada",
    address: "Praça da Liberdade",
    district: "Universitário",
    coords: { x: 75, y: 40 },
    createdAt: "2026-05-19T13:22:00",
    updatedAt: "2026-05-22T09:15:00",
    assignee: "Manutenção de Espaços Públicos",
    authorName: "Claudia Mendes",
    authorEmail: "claudia.mendes@email.com",
    timeline: [
      { date: "2026-05-19T13:22:00", status: "recebida", title: "Recebida", description: "Protocolo gerado.", author: "Sistema" },
      { date: "2026-05-22T09:15:00", status: "encaminhada", title: "Encaminhada", description: "Encaminhada para manutenção preventiva.", author: "Coordenação" },
    ],
  },
  {
    id: "r14",
    protocol: "SPK-2026-0189",
    title: "Vazamento de óleo em via pública",
    description: "Mancha de óleo e vazamento residual no asfalto da Avenida Comercial, possivelmente de vazamento de carro.",
    category: "agua",
    priority: "media",
    status: "resolvida",
    address: "Avenida Comercial, 789",
    district: "Centro",
    coords: { x: 52, y: 52 },
    createdAt: "2026-05-22T08:45:00",
    updatedAt: "2026-05-25T10:30:00",
    assignee: "Limpeza Urbana",
    authorName: "Renato Costa",
    authorEmail: "renato.costa@email.com",
    timeline: [
      { date: "2026-05-22T08:45:00", status: "recebida", title: "Recebida", description: "Protocolo registrado.", author: "Sistema" },
      { date: "2026-05-22T16:00:00", status: "em_analise", title: "Em análise", description: "Avaliação e coleta de material para análise.", author: "Central de Atendimento" },
      { date: "2026-05-25T10:30:00", status: "resolvida", title: "Resolvida", description: "Limpeza profunda realizada. Causa encaminhada à polícia ambiental.", author: "Limpeza Urbana" },
    ],
  },
  {
    id: "r15",
    protocol: "SPK-2026-0212",
    title: "Bueiro danificado e entupido",
    description: "Bueiro na Rua Santo André com grade danificada e entupido, impedindo drenagem.",
    category: "infraestrutura",
    priority: "alta",
    status: "em_analise",
    address: "Rua Santo André, 321",
    district: "Jardim América",
    coords: { x: 28, y: 62 },
    createdAt: "2026-05-24T15:18:00",
    updatedAt: "2026-05-25T14:45:00",
    assignee: "Drenagem Urbana",
    authorName: "Paulo Martins",
    authorEmail: "paulo.martins@email.com",
    timeline: [
      { date: "2026-05-24T15:18:00", status: "recebida", title: "Recebida", description: "Protocolo gerado como alta prioridade.", author: "Sistema" },
      { date: "2026-05-25T14:45:00", status: "em_analise", title: "Em análise", description: "Vistoria confirmou entupimento e dano estrutural.", author: "Central de Atendimento" },
    ],
  },
  {
    id: "r16",
    protocol: "SPK-2026-0156",
    title: "Acúmulo de entulho em terreno",
    description: "Terreno abandonado próximo à Rua das Flores com acúmulo de entulho e escombros.",
    category: "lixo",
    priority: "media",
    status: "encaminhada",
    address: "Rua das Flores, 156",
    district: "Setor Sul",
    coords: { x: 60, y: 68 },
    createdAt: "2026-05-21T11:30:00",
    updatedAt: "2026-05-23T16:00:00",
    assignee: "Limpeza Urbana",
    authorName: "Juliana Rocha",
    authorEmail: "juliana.rocha@email.com",
    timeline: [
      { date: "2026-05-21T11:30:00", status: "recebida", title: "Recebida", description: "Protocolo gerado.", author: "Sistema" },
      { date: "2026-05-23T16:00:00", status: "encaminhada", title: "Encaminhada", description: "Encaminhada para limpeza de área pública.", author: "Coordenação" },
    ],
  },
  {
    id: "r17",
    protocol: "SPK-2026-0131",
    title: "Falta de iluminação na escada de pedestre",
    description: "Escada de acesso ao Viaduto da Avenida Norte sem iluminação, criando risco de segurança.",
    category: "seguranca",
    priority: "alta",
    status: "encaminhada",
    address: "Viaduto Avenida Norte",
    district: "Setor Norte",
    coords: { x: 45, y: 18 },
    createdAt: "2026-05-23T19:20:00",
    updatedAt: "2026-05-25T08:30:00",
    assignee: "Iluminação Pública",
    authorName: "Felipe Gomes",
    authorEmail: "felipe.gomes@email.com",
    timeline: [
      { date: "2026-05-23T19:20:00", status: "recebida", title: "Recebida", description: "Protocolo gerado como alta prioridade.", author: "Sistema" },
      { date: "2026-05-25T08:30:00", status: "encaminhada", title: "Encaminhada", description: "Encaminhada para instalação de iluminação.", author: "Coordenação" },
    ],
  },
  {
    id: "r18",
    protocol: "SPK-2026-0241",
    title: "Placa de rua danificada",
    description: "Placa de identificação da Rua dos Eucaliptos parcialmente destruída e ilegível.",
    category: "outros",
    priority: "baixa",
    status: "recebida",
    address: "Rua dos Eucaliptos",
    district: "Bela Vista",
    coords: { x: 72, y: 58 },
    createdAt: "2026-05-26T14:50:00",
    updatedAt: "2026-05-26T14:50:00",
    authorName: "Diana Souza",
    authorEmail: "diana.souza@email.com",
    timeline: [
      { date: "2026-05-26T14:50:00", status: "recebida", title: "Recebida", description: "Aguardando triagem.", author: "Sistema" },
    ],
  },
  {
    id: "r19",
    protocol: "SPK-2026-0163",
    title: "Árvore com galho perigoso",
    description: "Árvore na Praça Municipal com galho grande solto e a ponto de cair sobre a pista.",
    category: "seguranca",
    priority: "alta",
    status: "em_andamento",
    address: "Praça Municipal",
    district: "Centro",
    coords: { x: 50, y: 42 },
    createdAt: "2026-05-24T11:15:00",
    updatedAt: "2026-05-26T09:00:00",
    assignee: "Manutenção de Espaços Públicos",
    authorName: "Adriana Costa",
    authorEmail: "adriana.costa@email.com",
    timeline: [
      { date: "2026-05-24T11:15:00", status: "recebida", title: "Recebida", description: "Protocolo gerado como alta prioridade.", author: "Sistema" },
      { date: "2026-05-25T10:00:00", status: "em_analise", title: "Em análise", description: "Inspeção confirmou risco iminente.", author: "Central de Atendimento" },
      { date: "2026-05-26T09:00:00", status: "em_andamento", title: "Corte programado", description: "Poda/remoção de galho programada para 27/05.", author: "Manutenção de Espaços Públicos" },
    ],
  },
  {
    id: "r20",
    protocol: "SPK-2026-0174",
    title: "Buraco próximo à estação de ônibus",
    description: "Buraco de médio porte bloqueando acesso à estação de ônibus da Avenida Universitária.",
    category: "buracos",
    priority: "alta",
    status: "resolvida",
    address: "Avenida Universitária, 1100",
    district: "Universitário",
    coords: { x: 78, y: 38 },
    createdAt: "2026-05-18T09:30:00",
    updatedAt: "2026-05-23T16:45:00",
    assignee: "Equipe de Pavimentação - Setor 2",
    authorName: "Marcelo Pinto",
    authorEmail: "marcelo.pinto@email.com",
    timeline: [
      { date: "2026-05-18T09:30:00", status: "recebida", title: "Recebida", description: "Protocolo gerado como alta prioridade.", author: "Sistema" },
      { date: "2026-05-19T08:15:00", status: "em_analise", title: "Em análise", description: "Vistoria técnica realizada.", author: "Central de Atendimento" },
      { date: "2026-05-21T10:00:00", status: "em_andamento", title: "Reparo iniciado", description: "Obra de pavimentação iniciada.", author: "Equipe de Pavimentação" },
      { date: "2026-05-23T16:45:00", status: "resolvida", title: "Resolvida", description: "Pavimentação concluída e testada.", author: "Equipe de Pavimentação" },
    ],
  },
];

const seedNotifications: Notification[] = [
  { id: "n1", title: "Atualização de status", message: "Sua denúncia SPK-2026-0148 está em andamento. Reparo programado para 31/05.", date: "2026-05-24T15:12:00", read: false, type: "atualizacao" },
  { id: "n2", title: "Resposta do responsável", message: "Equipe de Pavimentação respondeu sua denúncia SPK-2026-0148 com orientações de segurança.", date: "2026-05-24T15:12:00", read: false, type: "resposta" },
  { id: "n3", title: "Denúncia recebida", message: "Sua denúncia SPK-2026-0089 foi registrada com sucesso.", date: "2026-05-22T19:40:00", read: true, type: "confirmacao" },
  { id: "n4", title: "Denúncia resolvida", message: "Sua denúncia SPK-2026-0201 foi marcada como resolvida. Obrigado pela participação.", date: "2026-05-09T16:20:00", read: true, type: "atualizacao" },
  { id: "n5", title: "Alerta importante", message: "Obra de pavimentação em andamento na Avenida Universitária. Evitar a região.", date: "2026-05-23T10:00:00", read: true, type: "alerta" },
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>({ name: "landing" });
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [reports, setReports] = useState<Report[]>(seedReports);
  const [notifications, setNotifications] = useState<Notification[]>(seedNotifications);

  const value = useMemo<Store>(() => ({
    route,
    navigate: (r) => { setRoute(r); window.scrollTo(0, 0); },
    user,
    isAdmin,
    login: (email, asAdmin = false) => {
      setUser({
        name: asAdmin ? "Renata Albuquerque" : "Marina Costa",
        email,
        phone: "(11) 98765-4321",
        district: "Centro",
        joinedAt: "2025-11-12",
      });
      setIsAdmin(asAdmin);
    },
    logout: () => { setUser(null); setIsAdmin(false); setRoute({ name: "landing" }); },
    reports,
    addReport: (r) => {
      const seq = String(2000 + reports.length).padStart(4, "0");
      const protocol = `SPK-2026-${seq}`;
      const id = `r${reports.length + 100}`;
      const now = new Date().toISOString();
      const created: Report = {
        ...r,
        id,
        protocol,
        status: "recebida",
        createdAt: now,
        updatedAt: now,
        authorName: user?.name ?? "Cidadão",
        authorEmail: user?.email ?? "",
        timeline: [
          { date: now, status: "recebida", title: "Denúncia recebida", description: "Protocolo gerado e encaminhado para triagem.", author: "Sistema" },
        ],
      };
      setReports((rs) => [created, ...rs]);
      setNotifications((ns) => [
        { id: `n${Date.now()}`, title: "Denúncia recebida", message: `Protocolo ${protocol} registrado com sucesso.`, date: now, read: false, type: "confirmacao" },
        ...ns,
      ]);
      return created;
    },
    updateReportStatus: (id, status, note) => {
      const now = new Date().toISOString();
      setReports((rs) => rs.map((r) => r.id === id ? {
        ...r,
        status,
        updatedAt: now,
        timeline: [...r.timeline, { date: now, status, title: `Status atualizado: ${status}`, description: note ?? "Atualização administrativa.", author: "Administração" }],
      } : r));
    },
    addResponse: (id, text) => {
      const now = new Date().toISOString();
      setReports((rs) => rs.map((r) => r.id === id ? {
        ...r,
        updatedAt: now,
        responses: [...(r.responses ?? []), { author: "Administração", date: now, text }],
      } : r));
    },
    notifications,
    markNotificationsRead: () => setNotifications((ns) => ns.map((n) => ({ ...n, read: true }))),
  }), [route, user, isAdmin, reports, notifications]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
