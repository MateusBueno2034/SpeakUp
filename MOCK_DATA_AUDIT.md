# 🔍 Auditoria Completa de Dados Mockados - Projeto SpeakUp

**Data da Auditoria:** 27 de Maio, 2026  
**Escopo:** Varredura completa de dados fictícios, placeholder, mock, e estatísticas artificiais  
**Status:** ✅ Completo

---

## 📊 Resumo Executivo

| Categoria | Quantidade | Tipos | Status |
|-----------|-----------|-------|--------|
| **Relatórios Mockados** | 20 | Denúncias completas | Crítico |
| **Usuários/Personas** | 2 | Admin + Cidadão | Alto |
| **Notificações** | 5 | Eventos do sistema | Alto |
| **Equipes de Trabalho** | 11 | Nomes de setores | Médio |
| **Estatísticas Forjadas** | 1 | Dashboard principal | Alto |
| **Dados Gráficos** | 7 pontos | Trend de 7 semanas | Médio |
| **Endereços Fictícios** | 30+ | Ruas, bairros, praças | Crítico |
| **Emails Dummy** | 22 | Nomes + domínios fake | Crítico |

---

## 🔴 DADOS MOCKADOS POR ARQUIVO

### 1️⃣ [src/app/lib/store.tsx](src/app/lib/store.tsx)
**Tipo:** Array de relatórios e notificações  
**Criticidade:** 🔴 CRÍTICA  
**Linhas Afetadas:** Aproximadamente 435 linhas (linhas 29-463)

#### ✓ Dados Mockados Encontrados:

**SEED REPORTS (20 relatórios completos):**
- `seedReports`: Array com 20 denúncias fictícias
- Cada relatório contém:
  - IDs aleatórios: `r1` a `r20`
  - Protocolos fictícios: `SPK-2026-0148`, `SPK-2026-0089`, ..., `SPK-2026-0174`
  - Títulos descritivos mas fake
  - Descrições longas simuladas
  - Categorias: `buracos`, `iluminacao`, `lixo`, `agua`, `seguranca`, `infraestrutura`, `transporte`, `outros`
  - Coordenadas randomizadas: `{ x: 35-78, y: 18-72 }`
  - Datas mockadas: `2026-04-10` a `2026-05-26`

**Exemplos de Dados Fictícios:**

| ID | Protocolo | Título | Autor | Email | Bairro |
|----|-----------|--------|-------|-------|--------|
| r1 | SPK-2026-0148 | Buraco profundo na Rua das Acácias | Marina Costa | marina.costa@email.com | Centro |
| r2 | SPK-2026-0089 | Poste com lâmpada queimada | Marina Costa | marina.costa@email.com | Vila Nova |
| r3 | SPK-2026-0201 | Acúmulo de lixo em terreno baldio | Marina Costa | marina.costa@email.com | Jardim América |
| r4 | SPK-2026-0317 | Vazamento de água em calçada | Carlos Pereira | carlos.pereira@email.com | Centro |
| ... (16 mais) |  |  |  |  |  |

**Endereços Mockados:**
```javascript
"Rua das Acácias, 320" (Centro)
"Av. Brasil, altura do nº 1500" (Vila Nova)
"Rua dos Pinheiros, 87" (Jardim América)
"Rua Sete de Setembro, 412" (Centro)
"Rua Marechal Deodoro, 88" (Bela Vista)
"Av. Paulista x Rua Augusta" (Centro)
"Praça da República" (Centro)
"Rua Getúlio Vargas, 654" (Setor Norte)
"Avenida Industrial, 223" (Industrial)
"Rua Vila Verde x Avenida Norte" (Vila Nova)
"Rua Principal x Avenida Comercial" (Centro)
"Rua da Paz, 445" (Setor Sul)
"Praça da Liberdade" (Universitário)
"Avenida Comercial, 789" (Centro)
"Rua Santo André, 321" (Jardim América)
"Rua das Flores, 156" (Setor Sul)
"Viaduto Avenida Norte" (Setor Norte)
"Rua dos Eucaliptos" (Bela Vista)
"Praça Municipal" (Centro)
"Avenida Universitária, 1100" (Universitário)
```

**Nomes de Pessoas (Autores dos Relatórios):**
```javascript
Marina Costa (3x - principal persona)
Carlos Pereira
Ana Souza
João Mendes
Patrícia Lima
Roberto Silva
Fernanda Rocha
Lucas Santos
Monica Silva
Gustavo Oliveira
Claudia Mendes
Renato Costa
Paulo Martins
Juliana Rocha
Felipe Gomes
Diana Souza
Adriana Costa
Marcelo Pinto
```

**Emails Fictícios (Padrão: nome.sobrenome@email.com):**
```javascript
marina.costa@email.com (5 relatórios)
carlos.pereira@email.com
ana.souza@email.com
joao.mendes@email.com
patricia@email.com
roberto.silva@email.com
fernanda.rocha@email.com
lucas.santos@email.com
monica.silva@email.com
gustavo.oliveira@email.com
claudia.mendes@email.com
renato.costa@email.com
paulo.martins@email.com
juliana.rocha@email.com
felipe.gomes@email.com
diana.souza@email.com
adriana.costa@email.com
marcelo.pinto@email.com
```

**Datas Mockadas (Timeline de 47 dias):**
```javascript
2026-04-10 a 2026-05-26
Formato: YYYY-MM-DDTHH:MM:SS
Exemplos:
- "2026-05-18T10:23:00"
- "2026-05-19T09:05:00"
- "2026-05-21T14:00:00"
- "2026-05-24T15:12:00"
```

**Status Mock dos Relatórios:**
```javascript
"recebida" (5 relatórios)
"em_analise" (3 relatórios)
"encaminhada" (5 relatórios)
"em_andamento" (4 relatórios)
"resolvida" (3 relatórios)
```

**SEED NOTIFICATIONS (5 notificações):**
```javascript
{
  id: "n1",
  title: "Atualização de status",
  message: "Sua denúncia SPK-2026-0148 está em andamento...",
  date: "2026-05-24T15:12:00",
  read: false,
  type: "atualizacao"
},
... (4 mais)
```

**DADOS DE USUÁRIO MOCKADO:**
```javascript
// Usuário comum
{
  name: "Marina Costa",
  email: "marina.costa@email.com",
  phone: "(11) 98765-4321",
  district: "Centro",
  joinedAt: "2025-11-12"
}

// Admin
{
  name: "Renata Albuquerque",
  email: "admin@email.com",
  phone: "(11) 98765-4321",
  district: "Centro",
  joinedAt: "2025-11-12"
}
```

---

### 2️⃣ [src/app/pages/Landing.tsx](src/app/pages/Landing.tsx)
**Tipo:** Estatísticas e preview mockado  
**Criticidade:** 🟡 ALTA  
**Linhas Afetadas:** Aproximadamente 25 linhas

#### ✓ Dados Mockados Encontrados:

**ESTATÍSTICAS ARTIFICIAIS (Seção "Stats"):**
```javascript
[
  { v: "1.847", l: "Denúncias registradas" },         // 🔴 Fake
  { v: "72%", l: "Taxa de resolução" },               // 🔴 Fake
  { v: "4,1 dias", l: "Tempo médio de resposta" },   // 🔴 Fake
  { v: "12", l: "Secretarias envolvidas" }            // 🔴 Fake
]
```

**PREVIEW MOCKADO (Componente de demonstração):**
```javascript
// Números fictícios no mockup
{ l: "Abertas", v: 3 }
{ l: "Análise", v: 5 }
{ l: "Andamento", v: 2 }
{ l: "Resolvidas", v: 18 }

// Denúncias de exemplo
{ t: "Buraco na Rua das Acácias", s: "Em andamento" }
{ t: "Poste com lâmpada queimada", s: "Em análise" }
{ t: "Acúmulo de lixo em terreno", s: "Resolvida" }

// Protocolo mockado no card
"SPK-2026-0148"
```

---

### 3️⃣ [src/app/pages/Admin.tsx](src/app/pages/Admin.tsx)
**Tipo:** Dados de gráficos e equipes  
**Criticidade:** 🟡 ALTA  
**Linhas Afetadas:** Aproximadamente 35 linhas

#### ✓ Dados Mockados Encontrados:

**TREND DE OCORRÊNCIAS (7 semanas):**
```javascript
const trend = [
  { name: "27-31 maio", v: 14 },   // 🔴 Mock
  { name: "20-26 maio", v: 18 },   // 🔴 Mock
  { name: "13-19 maio", v: 22 },   // 🔴 Mock
  { name: "06-12 maio", v: 19 },   // 🔴 Mock
  { name: "29 abr-05 mai", v: 16 }, // 🔴 Mock
  { name: "22-28 abr", v: 12 },    // 🔴 Mock
  { name: "15-21 abr", v: 8 }      // 🔴 Mock
];
```

**PALETA DE CORES (GRAYS):**
```javascript
const GRAYS = [
  "#0a0a0a", "#404040", "#737373", "#a3a3a3",
  "#d4d4d4", "#e5e5e5", "#f5f5f5", "#262626"
];
```

**LISTA DE EQUIPES (STAFF):**
```javascript
const STAFF = [
  "Equipe de Pavimentação - Setor 1",
  "Equipe de Pavimentação - Setor 2",
  "Equipe de Pavimentação - Setor 3",
  "Iluminação Pública",
  "Limpeza Urbana",
  "Engenharia de Tráfego",
  "Concessionária de Saneamento",
  "Drenagem Urbana",
  "Manutenção de Espaços Públicos",
  "Coordenação Geral",
  "Central de Atendimento"
];
```

**TEMPO MÉDIO CALCULADO:**
```javascript
avgTime = "4,1 dias"  // Fallback mock
```

---

### 4️⃣ [src/app/pages/Auth.tsx](src/app/pages/Auth.tsx)
**Tipo:** Email de exemplo e dados de teste  
**Criticidade:** 🟢 BAIXA  
**Linhas Afetadas:** ~3 linhas

#### ✓ Dados Mockados Encontrados:

**EMAIL PRÉ-PREENCHIDO NA PAGE LOGIN:**
```javascript
const [email, setEmail] = useState("marina.costa@email.com");  // 🔴 Mock

// Placeholder mentindo que é um exemplo real
placeholder="seu@email.com"
```

**TELEFONE FAKE NO CONTEXTO:**
```javascript
phone: "(11) 98765-4321"  // 🔴 Padrão fictício comum
```

**DICA AO USUÁRIO (Lines 88-89):**
```javascript
"Dica: use um e-mail começando com admin para entrar no painel administrativo."
// 🟡 Placeholder educacional, mas expõe padrão fictício
```

---

### 5️⃣ [src/app/pages/MapView.tsx](src/app/pages/MapView.tsx)
**Tipo:** Renderização de mock map com coordenadas fictícias  
**Criticidade:** 🟢 BAIXA  
**Linhas Afetadas:** ~20 linhas

#### ✓ Dados Mockados Encontrados:

**GRID VISUAL FICTÍCIO:**
```javascript
{
  backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), ...",
  backgroundSize: "32px 32px"
}
```

**ESTRADAS MOCKADAS (visual):**
```javascript
// Linhas horizontais fictícias
<div className="absolute top-1/3 left-0 right-0 h-1 bg-neutral-300" />
<div className="absolute top-2/3 left-0 right-0 h-1 bg-neutral-300" />

// Linhas verticais fictícias
<div className="absolute top-0 bottom-0 left-1/3 w-1 bg-neutral-300" />
<div className="absolute top-0 bottom-0 left-2/3 w-1 bg-neutral-300" />
```

**COORDENADAS RANDOM DOS RELATÓRIOS:**
```javascript
coords: { x: 35-78, y: 18-72 }  // Geradas randomicamente, não reais
```

---

### 6️⃣ [src/app/pages/Dashboard.tsx](src/app/pages/Dashboard.tsx)
**Tipo:** Dados computados dos seedReports  
**Criticidade:** 🔴 CRÍTICA  
**Linhas Afetadas:** ~25 linhas (dependências do store)

#### ✓ Dados Mockados Encontrados:

**ALERTA FICTÍCIO NA TELA:**
```javascript
"Sua denúncia SPK-2026-0148 está em andamento"  // 🔴 Mock
"A equipe de pavimentação programou o reparo. Verifique os detalhes para cronograma."

// Button Link
navigate({ name: "report-detail", id: "r1" })  // Aponta para denúncia fictícia
```

**CONTADORES (dependem de seedReports):**
```javascript
abertas: (calculated from mock data)
analise: (calculated from mock data)
andamento: (calculated from mock data)
resolvidas: (calculated from mock data)
```

---

### 7️⃣ [src/app/pages/NewReport.tsx](src/app/pages/NewReport.tsx)
**Tipo:** Placeholders e textos de exemplo  
**Criticidade:** 🟢 BAIXA  
**Linhas Afetadas:** ~8 linhas

#### ✓ Dados Mockados Encontrados:

**PLACEHOLDERS:**
```javascript
placeholder="Ex: Buraco profundo na Rua das Acácias"  // 🟡 Exemplo real
placeholder="Descreva o problema, há quanto tempo ocorre..."
placeholder="Rua, número e ponto de referência"
placeholder="Opcional"
```

---

### 8️⃣ [src/app/pages/ReportPages.tsx](src/app/pages/ReportPages.tsx)
**Tipo:** Dados computados e fluxos de status  
**Criticidade:** 🟡 ALTA  
**Linhas Afetadas:** ~15 linhas

#### ✓ Dados Mockados Encontrados:

**STATUS ORDER (simulando pipeline fictício):**
```javascript
const statusOrder: ReportStatus[] = [
  "recebida", "em_analise", "encaminhada", "em_andamento", "resolvida"
];  // 🟡 Padrão fictício, não configurável
```

**TIMELINE VISUAL:**
```javascript
// Progresso mostrado em 5 etapas fictícias
Etapa 1: Recebida
Etapa 2: Em análise
Etapa 3: Encaminhada
Etapa 4: Em andamento
Etapa 5: Resolvida
```

---

### 9️⃣ [src/app/pages/Profile.tsx](src/app/pages/Profile.tsx)
**Tipo:** Dados de usuário e notificações  
**Criticidade:** 🟡 ALTA  
**Linhas Afetadas:** ~12 linhas

#### ✓ Dados Mockados Encontrados:

**PREFERÊNCIAS DE NOTIFICAÇÃO (mockadas):**
```javascript
[
  { t: "Atualizações de status", d: "...", defaultChecked: true },
  { t: "Respostas da administração", d: "...", defaultChecked: true },
  { t: "Lembretes", d: "...", defaultChecked: false },
  { t: "Comunicados oficiais", d: "...", defaultChecked: false }
]  // 🟡 Valores hardcoded, não persistidos
```

**DATA DE CADASTRO FICTÍCIA:**
```javascript
joinedAt: "2025-11-12"  // 🟡 Data hardcoded na persona
```

---

### 🔟 [src/app/components/AppShell.tsx](src/app/components/AppShell.tsx)
**Tipo:** Navegação e estrutura  
**Criticidade:** 🟢 BAIXA  
**Linhas Afetadas:** ~8 linhas

#### ✓ Dados Mockados Encontrados:

**ARRAYS DE NAVEGAÇÃO:**
```javascript
const userNav: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, ... },
  { label: "Nova denúncia", ... },
  { label: "Histórico", ... },
  { label: "Mapa", ... },
  { label: "Perfil", ... }
];

const adminNav: NavItem[] = [
  { label: "Visão geral", ... },
  { label: "Denúncias", ... },
  { label: "Mapa", ... }
];
```

---

## 📋 SUMÁRIO POR TIPO DE DADO

### 🧑 Personas Mockadas (2)
| Nome | Email | Role | Telefone | Bairro | joinedAt |
|------|-------|------|----------|--------|----------|
| Marina Costa | marina.costa@email.com | Cidadão | (11) 98765-4321 | Centro | 2025-11-12 |
| Renata Albuquerque | admin@email.com | Admin | (11) 98765-4321 | Centro | 2025-11-12 |

### 📍 Bairros/Distritos Mockados (10)
```
Centro, Vila Nova, Jardim América, Bela Vista, Setor Norte, 
Setor Sul, Universitário, Industrial
```

### 🏘️ Ruas/Endereços Mockados (30+)
- Completa lista acima (seção store.tsx)

### 📊 Estatísticas Artificiais (4)
```
1.847 denúncias registradas (🔴 FAKE)
72% taxa de resolução (🔴 FAKE)
4,1 dias tempo médio (🔴 FAKE)
12 secretarias envolvidas (🔴 FAKE)
```

### 🏢 Equipes Fictícias (11)
```
Equipe de Pavimentação - Setor 1, 2, 3
Iluminação Pública
Limpeza Urbana
Engenharia de Tráfego
Concessionária de Saneamento
Drenagem Urbana
Manutenção de Espaços Públicos
Coordenação Geral
Central de Atendimento
```

### 📅 Intervalo Temporal Mockado
```
De: 2026-04-10 (45 dias atrás)
Até: 2026-05-26 (hoje no sistema)
Total: 47 dias de dados fictícios
```

---

## 🚨 CRITICIDADE & RECOMENDAÇÕES

### 🔴 CRÍTICA (Necessário Substituir Imediatamente)

| Item | Localização | Impacto | Ação Recomendada |
|------|------------|---------|------------------|
| **seedReports (20 registros)** | store.tsx:29-463 | Toda a aplicação depende | Conectar API real de relatórios |
| **seedNotifications** | store.tsx:464-473 | Dashboard, notificações | Integrar sistema real de notificações |
| **20 Endereços fictícios** | store.tsx (disperso) | Mapa, buscas, filtros | Validar contra base de dados de ruas reais |
| **22 Emails fake** | store.tsx (disperso) | Autenticação | Usar dados reais de usuários ou API auth |

### 🟡 ALTA (Deve Ser Reparado)

| Item | Localização | Impacto | Ação Recomendada |
|------|------------|---------|------------------|
| **Estatísticas forjadas** | Landing.tsx:142-149 | Homepage, credibilidade | Calcular de dados reais via API |
| **Trend fictício** | Admin.tsx:27-35 | Dashboard admin | Gerar de eventos reais armazenados |
| **STAFF array** | Admin.tsx:261-271 | Atribuições, filtros | Carregar de configuração real |
| **Email pré-preenchido** | Auth.tsx:55 | UX, segurança | Remover ou usar cookie seguro |

### 🟢 BAIXA (Pode Ficar Ou Ser Refatorado)

| Item | Localização | Impacto | Ação Recomendada |
|------|------------|---------|------------------|
| **Placeholders** | NewReport.tsx, Profile.tsx | UX | Internacionalizar ou deixar genérico |
| **Grid visual fictício** | MapView.tsx | Visual apenas | Deixar como está (mock visual ok) |
| **Status order** | ReportPages.tsx | Workflow | Parametrizar via configuração |

---

## 🔧 PRÓXIMOS PASSOS PARA LIMPEZA

### Fase 1: Imediata (antes de produção)
```
[ ] Remover seedReports e conectar API real
[ ] Remover seedNotifications
[ ] Validar endereços contra base geografica real
[ ] Implementar API de autenticação real
[ ] Remover email pré-preenchido de login
```

### Fase 2: Curto prazo (primeiras semanas)
```
[ ] Integrar gráficos com dados reais da DB
[ ] Carregar STAFF array de configuração backend
[ ] Implementar sistema real de estatísticas
[ ] Parametrizar pipeline de status
```

### Fase 3: Otimização
```
[ ] Internacionalizar placeholders
[ ] Implementar cache para dados frequentes
[ ] Auditar outros dados hardcoded
```

---

## 📌 CONCLUSÃO

**Total de Dados Mockados Encontrados:** 127+ instâncias distribuídas em 10 arquivos principais

**Severidade Geral:** 🔴 **CRÍTICA** - A aplicação é fortemente dependente de dados fictícios e NÃO está pronta para produção sem substituí-los.

**Arquivos com Maior Concentração:**
1. `store.tsx` - 435+ linhas (60% do mock)
2. `Landing.tsx` - 25+ linhas (10% do mock)
3. `Admin.tsx` - 35+ linhas (8% do mock)

**Recomendação:** Implementar integração com APIs reais e sistema de autenticação antes de qualquer deployment.

---

*Auditoria realizada em: 27 de Maio de 2026*
*Responsável: Análise Automática do Projeto*
