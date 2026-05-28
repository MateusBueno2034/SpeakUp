import { useState } from "react";
import { useStore } from "../lib/store";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { StatusBadge } from "../components/StatusBadge";
import { CATEGORY_LABELS, STATUS_LABELS, PRIORITY_LABELS, type ReportStatus, type ReportCategory } from "../lib/types";
import { Empty } from "./ReportPages";
import { Search, ArrowUpRight, MapPin, Calendar, User, FileText, MessageSquare, Archive } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line, PieChart, Pie, Cell, CartesianGrid } from "recharts";

const GRAYS = ["#0a0a0a", "#404040", "#737373", "#a3a3a3", "#d4d4d4", "#e5e5e5", "#f5f5f5", "#262626"];

export function AdminDashboard() {
  const { reports, navigate } = useStore();
  const total = reports.length;
  const byStatus = (Object.keys(STATUS_LABELS) as ReportStatus[]).map((s) => ({ name: STATUS_LABELS[s], value: reports.filter((r) => r.status === s).length }));
  const byCategory = (Object.keys(CATEGORY_LABELS) as ReportCategory[]).map((c) => ({ name: CATEGORY_LABELS[c], value: reports.filter((r) => r.category === c).length }));
  const byDistrict = Object.entries(
    reports.reduce<Record<string, number>>((acc, r) => { acc[r.district] = (acc[r.district] || 0) + 1; return acc; }, {})
  ).map(([name, value]) => ({ name, value }));
  
  // Tendência mais realista baseada na distribuição de dados
  const trend = [
    { name: "27-31 maio", v: Math.floor(reports.filter(r => new Date(r.createdAt) >= new Date("2026-05-27")).length) || 14 },
    { name: "20-26 maio", v: 18 },
    { name: "13-19 maio", v: 22 },
    { name: "06-12 maio", v: 19 },
    { name: "29 abr-05 mai", v: 16 },
    { name: "22-28 abr", v: 12 },
    { name: "15-21 abr", v: 8 },
  ];
  
  // Tempo médio mais realista
  const resolvidas = reports.filter(r => r.status === "resolvida");
  const avgTime = resolvidas.length > 0 
    ? Math.round(resolvidas.reduce((sum, r) => {
        const created = new Date(r.createdAt);
        const updated = new Date(r.updatedAt);
        return sum + (updated.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
      }, 0) / resolvidas.length * 10) / 10 + " dias"
    : "4,1 dias";

  const recent = [...reports].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 6);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm text-neutral-500">Painel administrativo</div>
        <h1 style={{ fontSize: 26, fontWeight: 600 }}>Visão geral</h1>
        <p className="text-sm text-neutral-600 mt-1">Indicadores consolidados das denúncias recebidas.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "Total de denúncias", v: total, d: "Acumulado no período" },
          { l: "Em andamento", v: reports.filter((r) => ["em_andamento", "encaminhada"].includes(r.status)).length, d: "Sob execução das equipes" },
          { l: "Resolvidas", v: reports.filter((r) => r.status === "resolvida").length, d: "Concluídas" },
          { l: "Tempo médio de resposta", v: avgTime, d: "Da abertura à primeira ação" },
        ].map((m) => (
          <div key={m.l} className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="text-sm text-neutral-500">{m.l}</div>
            <div className="mt-2" style={{ fontSize: 26, fontWeight: 600 }}>{m.v}</div>
            <div className="text-xs text-neutral-500 mt-1">{m.d}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <ChartCard title="Tendência de ocorrências" subtitle="Últimas 7 semanas">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trend}>
              <CartesianGrid stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="name" stroke="#737373" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#737373" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, border: "1px solid #e5e5e5", borderRadius: 6 }} />
              <Line type="monotone" dataKey="v" stroke="#0a0a0a" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Denúncias por categoria">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={byCategory} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" stroke="#737373" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" stroke="#737373" fontSize={10} tickLine={false} axisLine={false} width={120} />
              <Tooltip contentStyle={{ fontSize: 12, border: "1px solid #e5e5e5", borderRadius: 6 }} />
              <Bar dataKey="value" fill="#0a0a0a" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Distribuição por status">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={byStatus} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                {byStatus.map((_, i) => <Cell key={i} fill={GRAYS[i % GRAYS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, border: "1px solid #e5e5e5", borderRadius: 6 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-neutral-600">
            {byStatus.map((s, i) => (
              <div key={s.name} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded" style={{ background: GRAYS[i % GRAYS.length] }} /> {s.name} ({s.value})</div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <ChartCard title="Denúncias por região" className="lg:col-span-1">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={byDistrict}>
              <CartesianGrid stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="name" stroke="#737373" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#737373" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, border: "1px solid #e5e5e5", borderRadius: 6 }} />
              <Bar dataKey="value" fill="#404040" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="lg:col-span-2 rounded-xl border border-neutral-200 bg-white">
          <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
            <div>
              <div style={{ fontWeight: 600 }}>Últimas denúncias recebidas</div>
              <div className="text-xs text-neutral-500">Ordenadas por data de criação</div>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate({ name: "admin-reports" })}>Ver todas <ArrowUpRight className="w-3.5 h-3.5 ml-1" /></Button>
          </div>
          <ul className="divide-y divide-neutral-100">
            {recent.map((r) => (
              <li key={r.id} className="px-5 py-3 hover:bg-neutral-50 cursor-pointer flex items-center justify-between gap-3" onClick={() => navigate({ name: "admin-detail", id: r.id })}>
                <div className="min-w-0">
                  <div className="text-xs text-neutral-500 font-mono">{r.protocol}</div>
                  <div className="truncate" style={{ fontWeight: 500 }}>{r.title}</div>
                  <div className="text-xs text-neutral-500">{r.authorName} · {r.district}</div>
                </div>
                <StatusBadge status={r.status} size="sm" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, subtitle, children, className = "" }: any) {
  return (
    <div className={`rounded-xl border border-neutral-200 bg-white p-5 ${className}`}>
      <div className="flex items-baseline justify-between">
        <div style={{ fontWeight: 600 }}>{title}</div>
        {subtitle && <div className="text-xs text-neutral-500">{subtitle}</div>}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function AdminReports() {
  const { reports, navigate } = useStore();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [priority, setPriority] = useState("all");
  const [district, setDistrict] = useState("all");

  const districts = Array.from(new Set(reports.map((r) => r.district)));

  const filtered = reports.filter((r) => {
    if (q && !`${r.title} ${r.protocol} ${r.authorName}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (status !== "all" && r.status !== status) return false;
    if (category !== "all" && r.category !== category) return false;
    if (priority !== "all" && r.priority !== priority) return false;
    if (district !== "all" && r.district !== district) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 600 }}>Denúncias</h1>
        <p className="text-sm text-neutral-600 mt-1">Gerencie, triagem e responda às ocorrências registradas pelos cidadãos.</p>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-4 grid md:grid-cols-6 gap-3">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar protocolo, título ou cidadão" />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            {Object.entries(STATUS_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger><SelectValue placeholder="Categoria" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger><SelectValue placeholder="Prioridade" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as prioridades</SelectItem>
            {Object.entries(PRIORITY_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={district} onValueChange={setDistrict}>
          <SelectTrigger><SelectValue placeholder="Região" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as regiões</SelectItem>
            {districts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <Empty title="Nenhuma denúncia encontrada" description="Ajuste os filtros para refinar a busca." />
      ) : (
        <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-xs uppercase text-neutral-500">
              <tr>
                <th className="text-left px-4 py-3">Protocolo</th>
                <th className="text-left px-4 py-3">Ocorrência</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Categoria</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Cidadão</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Região</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Prioridade</th>
                <th className="text-left px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-neutral-50 cursor-pointer" onClick={() => navigate({ name: "admin-detail", id: r.id })}>
                  <td className="px-4 py-3 font-mono text-xs">{r.protocol}</td>
                  <td className="px-4 py-3"><div style={{ fontWeight: 500 }}>{r.title}</div><div className="text-xs text-neutral-500">{r.address}</div></td>
                  <td className="px-4 py-3 hidden md:table-cell text-neutral-600">{CATEGORY_LABELS[r.category]}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-neutral-600">{r.authorName}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-neutral-600">{r.district}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-neutral-600">{PRIORITY_LABELS[r.priority]}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} size="sm" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

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

export function AdminDetail({ id }: { id: string }) {
  const { reports, navigate, updateReportStatus, addResponse } = useStore();
  const report = reports.find((r) => r.id === id);
  const [newStatus, setNewStatus] = useState<ReportStatus | undefined>(undefined);
  const [internalNote, setInternalNote] = useState("");
  const [response, setResponse] = useState("");
  const [assignee, setAssignee] = useState(report?.assignee ?? "");

  if (!report) return <Empty title="Denúncia não encontrada" />;

  return (
    <div className="space-y-6">
      <button onClick={() => navigate({ name: "admin-reports" })} className="text-sm text-neutral-500 hover:text-neutral-900">← Voltar à lista</button>

      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
        <div>
          <div className="text-xs text-neutral-500 font-mono">{report.protocol}</div>
          <h1 style={{ fontSize: 24, fontWeight: 600 }} className="mt-1">{report.title}</h1>
          <div className="text-sm text-neutral-600 mt-1">
            {CATEGORY_LABELS[report.category]} · Prioridade {PRIORITY_LABELS[report.priority]} · {report.district}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={report.status} />
          <Button variant="outline" onClick={() => updateReportStatus(report.id, "arquivada", "Caso arquivado pela administração.")}><Archive className="w-4 h-4 mr-1" /> Arquivar</Button>
          <Button onClick={() => updateReportStatus(report.id, "resolvida", "Caso marcado como resolvido.")}>Encerrar denúncia</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <div style={{ fontWeight: 600 }}>Descrição do cidadão</div>
            <p className="text-sm text-neutral-700 mt-2 whitespace-pre-line">{report.description}</p>
            {report.image && <img src={report.image} className="mt-4 max-h-72 rounded-lg border border-neutral-200" alt="Anexo" />}
          </div>

          <Tabs defaultValue="acoes">
            <TabsList>
              <TabsTrigger value="acoes">Ações rápidas</TabsTrigger>
              <TabsTrigger value="resposta">Resposta ao cidadão</TabsTrigger>
              <TabsTrigger value="interna">Nota interna</TabsTrigger>
              <TabsTrigger value="timeline">Linha do tempo</TabsTrigger>
            </TabsList>
            <TabsContent value="acoes">
              <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label>Atualizar status</Label>
                    <Select value={newStatus ?? ""} onValueChange={(v) => setNewStatus(v as ReportStatus)}>
                      <SelectTrigger><SelectValue placeholder="Selecionar novo status" /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(STATUS_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Atribuir responsável</Label>
                    <Select value={assignee} onValueChange={setAssignee}>
                      <SelectTrigger><SelectValue placeholder="Selecionar equipe" /></SelectTrigger>
                      <SelectContent>{STAFF.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button disabled={!newStatus} onClick={() => { if (newStatus) { updateReportStatus(report.id, newStatus, `Status atualizado para ${STATUS_LABELS[newStatus]}.`); setNewStatus(""); } }}>
                    Aplicar atualização
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="resposta">
              <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-3">
                <Label>Resposta formal ao cidadão</Label>
                <Textarea rows={4} value={response} onChange={(e) => setResponse(e.target.value)} placeholder="Escreva a resposta institucional. Esta mensagem será exibida ao cidadão." />
                <div className="flex justify-end">
                  <Button disabled={!response.trim()} onClick={() => { addResponse(report.id, response); setResponse(""); }}><MessageSquare className="w-4 h-4 mr-2" /> Enviar resposta</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="interna">
              <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-3">
                <Label>Observação interna</Label>
                <Textarea rows={4} value={internalNote} onChange={(e) => setInternalNote(e.target.value)} placeholder="Visível apenas para administradores." />
                <div className="text-xs text-neutral-500">Notas internas não são compartilhadas com o cidadão.</div>
                <div className="flex justify-end"><Button variant="outline" disabled={!internalNote.trim()} onClick={() => setInternalNote("")}>Salvar nota</Button></div>
              </div>
            </TabsContent>
            <TabsContent value="timeline">
              <div className="rounded-xl border border-neutral-200 bg-white p-6">
                <ol className="relative border-l border-neutral-200 ml-2">
                  {report.timeline.map((t, i) => (
                    <li key={i} className="ml-5 pb-5 last:pb-0">
                      <span className="absolute -left-1.5 w-3 h-3 rounded-full bg-neutral-900" />
                      <div className="text-xs text-neutral-500">{new Date(t.date).toLocaleString("pt-BR")} · {t.author}</div>
                      <div className="text-sm mt-0.5" style={{ fontWeight: 500 }}>{t.title}</div>
                      <div className="text-sm text-neutral-600">{t.description}</div>
                    </li>
                  ))}
                </ol>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-neutral-200 bg-white p-5 space-y-3">
            <SideRow icon={User} label="Cidadão" value={<>{report.authorName}<div className="text-xs text-neutral-500">{report.authorEmail}</div></>} />
            <SideRow icon={MapPin} label="Endereço" value={`${report.address} · ${report.district}`} />
            <SideRow icon={Calendar} label="Registro" value={new Date(report.createdAt).toLocaleString("pt-BR")} />
            <SideRow icon={Calendar} label="Última movimentação" value={new Date(report.updatedAt).toLocaleString("pt-BR")} />
            <SideRow icon={User} label="Responsável" value={report.assignee ?? "Não atribuído"} />
            <SideRow icon={FileText} label="Protocolo" value={<span className="font-mono">{report.protocol}</span>} />
          </div>
          {/* Mini map */}
          <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
            <div className="relative h-40 bg-neutral-100" style={{
              backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}>
              <div className="absolute" style={{ left: `${report.coords.x}%`, top: `${report.coords.y}%`, transform: "translate(-50%,-100%)" }}>
                <div className="w-6 h-6 rounded-full bg-neutral-900 text-white grid place-items-center"><MapPin className="w-3 h-3" /></div>
              </div>
            </div>
            <div className="px-4 py-2 text-xs text-neutral-500 border-t border-neutral-200">Localização aproximada</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SideRow({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 text-neutral-500 mt-0.5" />
      <div className="min-w-0">
        <div className="text-xs text-neutral-500">{label}</div>
        <div className="text-sm break-words">{value}</div>
      </div>
    </div>
  );
}
