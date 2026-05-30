import { useStore } from "../lib/store";
import { Brand } from "../components/Brand";
import { Button } from "../components/ui/button";
import { useTheme } from "next-themes";
import { ArrowRight, Check, FileText, Search, Clock, ShieldCheck, BarChart3, MapPin, Users, Moon, Sun } from "lucide-react";

export function Landing() {
  const { reports, user, navigate } = useStore();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const activeTheme = currentTheme || "light";
  const nextTheme = activeTheme === "dark" ? "light" : "dark";
  const myReports = user ? reports.filter((r) => r.authorEmail === user.email) : [];
  const counts = {
    abertas: myReports.filter((r) => r.status === "recebida").length,
    analise: myReports.filter((r) => r.status === "em_analise").length,
    andamento: myReports.filter((r) => ["encaminhada", "em_andamento"].includes(r.status)).length,
    resolvidas: myReports.filter((r) => r.status === "resolvida").length,
  };
  const totalReports = myReports.length;
  const taxaResolucao = totalReports ? `${Math.round((counts.resolvidas / totalReports) * 100)}%` : "0%";
  const averageResponseDays = totalReports
    ? Math.round(
        myReports.reduce((sum, r) => {
          const created = new Date(r.createdAt).getTime();
          const updated = new Date(r.updatedAt).getTime();
          return sum + Math.max(0, updated - created);
        }, 0) / totalReports / 86400000,
      )
    : 0;
  const tempoMedioResposta = `${averageResponseDays} dias`;
  const secretarias = user ? new Set(myReports.map((r) => r.assignee).filter(Boolean)).size : 0;

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Top nav */}
      <header className="border-b border-neutral-200 bg-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto h-16 px-6 flex items-center justify-between">
          <Brand />
          <nav className="hidden md:flex items-center gap-7 text-sm text-neutral-600">
            <a href="#como-funciona" className="cursor-pointer hover:text-neutral-900 hover:underline">Como funciona</a>
            <a href="#problema" className="cursor-pointer hover:text-neutral-900 hover:underline">O problema</a>
            <a href="#beneficios" className="cursor-pointer hover:text-neutral-900 hover:underline">Benefícios</a>
            <a href="#diferenciais" className="cursor-pointer hover:text-neutral-900 hover:underline">Diferenciais</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme(nextTheme)}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              {activeTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {activeTheme === "dark" ? "Claro" : "Escuro"}
            </button>
            <Button variant="ghost" onClick={() => navigate({ name: "login" })}>Entrar</Button>
            <Button onClick={() => navigate({ name: "register" })}>Criar conta</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 text-xs text-neutral-600 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" /> Plataforma de gestão de denúncias urbanas
            </div>
            <h1 style={{ fontSize: 48, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.02em" }}>
              Centralize denúncias urbanas. Acompanhe cada ocorrência com transparência.
            </h1>
            <p className="mt-5 text-neutral-600 text-lg max-w-xl">
              O SpeakUp reúne em um único canal o registro, a triagem, o encaminhamento e o acompanhamento de problemas urbanos —
              substituindo redes sociais, telefonemas e formulários dispersos por um fluxo claro entre cidadão e administração.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => navigate({ name: "register" })}>
                Criar conta <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate({ name: "login" })}>Entrar</Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-xs text-neutral-500">
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Sem custo para o cidadão</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Protocolo oficial</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Acompanhamento em tempo real</span>
            </div>
          </div>

          {/* Preview mock */}
          <div className="relative">
            <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 h-9 border-b border-neutral-200 bg-neutral-50">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                <span className="ml-3 text-xs text-neutral-500">speakup.gov.br/painel</span>
              </div>
              <div className="p-5">
                <div className="text-xs text-neutral-500">Resumo de denúncias</div>
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {[
                    { l: "Abertas", v: counts.abertas },
                    { l: "Análise", v: counts.analise },
                    { l: "Andamento", v: counts.andamento },
                    { l: "Resolvidas", v: counts.resolvidas },
                  ].map((s) => (
                    <div key={s.l} className="rounded-lg border border-neutral-200 px-3 py-3">
                      <div className="text-xs text-neutral-500">{s.l}</div>
                      <div style={{ fontSize: 22, fontWeight: 600 }}>{s.v}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 space-y-2">
                  {[
                    { t: "Buraco na Rua das Acácias", s: "Em andamento" },
                    { t: "Poste com lâmpada queimada", s: "Em análise" },
                    { t: "Acúmulo de lixo em terreno", s: "Resolvida" },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between rounded-md border border-neutral-200 px-3 py-2.5">
                      <div className="text-sm">{r.t}</div>
                      <span className="text-xs text-neutral-500">{r.s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 hidden md:block rounded-lg border border-neutral-200 bg-white shadow-sm px-4 py-3">
              <div className="text-xs text-neutral-500">Protocolo</div>
              <div style={{ fontWeight: 600 }}>SPK-2026-0148</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: String(totalReports), l: "Denúncias registradas" },
            { v: taxaResolucao, l: "Taxa de resolução" },
            { v: tempoMedioResposta, l: "Tempo médio de resposta" },
            { v: String(secretarias), l: "Secretarias envolvidas" },
          ].map((s) => (
            <div key={s.l}>
              <div style={{ fontSize: 28, fontWeight: 600 }}>{s.v}</div>
              <div className="text-sm text-neutral-600 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Como funciona</div>
            <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.01em" }}>Três passos para registrar e acompanhar uma denúncia.</h2>
            <p className="text-neutral-600 mt-3">Um fluxo direto entre quem identifica o problema e quem resolve.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { n: "01", i: FileText, t: "Registre a ocorrência", d: "Descreva o problema, defina categoria, prioridade, localização e adicione uma imagem." },
              { n: "02", i: Search, t: "Acompanhe o andamento", d: "Receba um protocolo único e veja, em uma linha do tempo, cada etapa da análise." },
              { n: "03", i: Check, t: "Receba o retorno", d: "A equipe responsável atualiza o status e responde diretamente pela plataforma." },
            ].map((s) => (
              <div key={s.n} className="rounded-xl border border-neutral-200 p-6 bg-white">
                <div className="flex items-center justify-between mb-5">
                  <div className="text-xs text-neutral-500" style={{ fontWeight: 600 }}>{s.n}</div>
                  <s.i className="w-5 h-5 text-neutral-700" />
                </div>
                <h3 style={{ fontWeight: 600 }}>{s.t}</h3>
                <p className="text-sm text-neutral-600 mt-2">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problema */}
      <section id="problema" className="border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12">
          <div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2">O problema</div>
            <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.01em" }}>Denúncias dispersas, sem retorno, sem responsável.</h2>
            <p className="text-neutral-600 mt-4">
              Hoje, problemas urbanos chegam aos órgãos públicos por redes sociais, telefonemas, formulários isolados e canais informais.
              O resultado é falta de centralização, retrabalho, ausência de retorno ao cidadão e baixa transparência sobre o andamento.
            </p>
          </div>
          <ul className="space-y-3">
            {[
              "Dificuldade para registrar denúncias de forma estruturada",
              "Falta de centralização das informações entre setores",
              "Burocracia nos canais oficiais existentes",
              "Ausência de acompanhamento das ocorrências",
              "Falta de retorno ao cidadão sobre o andamento",
              "Baixa transparência no processo público",
              "Reclamações dispersas em redes sociais e canais informais",
            ].map((p) => (
              <li key={p} className="flex items-start gap-3 bg-white rounded-lg border border-neutral-200 px-4 py-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-900" />
                <span className="text-sm text-neutral-700">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Benefícios */}
      <section id="beneficios" className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Benefícios</div>
          <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.01em" }}>Um canal único, com processo claro para todos os lados.</h2>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { i: ShieldCheck, t: "Transparência", d: "Cada etapa fica registrada e visível ao cidadão." },
              { i: Clock, t: "Agilidade", d: "Triagem padronizada reduz tempo médio de resposta." },
              { i: BarChart3, t: "Indicadores reais", d: "Dados consolidados orientam decisões da gestão." },
              { i: Users, t: "Participação", d: "Cidadãos como parte ativa do diagnóstico urbano." },
            ].map((b) => (
              <div key={b.t} className="rounded-xl border border-neutral-200 p-6">
                <b.i className="w-5 h-5 text-neutral-700 mb-4" />
                <div style={{ fontWeight: 600 }}>{b.t}</div>
                <p className="text-sm text-neutral-600 mt-1.5">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section id="diferenciais" className="border-b border-neutral-200 bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12">
          <div>
            <div className="text-xs text-neutral-400 uppercase tracking-wider mb-2">Diferenciais</div>
            <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.01em" }}>Por que o SpeakUp é diferente.</h2>
            <p className="text-neutral-300 mt-4">Construído como um software institucional, não como uma rede social. Foco em utilidade pública, registro confiável e processo claro.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" variant="secondary" onClick={() => navigate({ name: "register" })}>Começar agora</Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white/30 text-white hover:bg-white/10"
                onClick={() => navigate({ name: "login" })}
              >
                Entrar
              </Button>
            </div>
          </div>
          <ul className="space-y-3">
            {[
              { t: "Protocolo oficial por denúncia", d: "Identificador único para rastreamento e referência futura." },
              { t: "Linha do tempo completa", d: "Cada movimentação interna é exposta ao cidadão." },
              { t: "Painel administrativo robusto", d: "Filtros, atribuição de responsáveis e métricas consolidadas." },
              { t: "Mapa geográfico de ocorrências", d: "Visualização territorial para apoio à priorização." },
              { t: "Resposta institucional", d: "Comunicação formal entre administração e cidadão." },
            ].map((d) => (
              <li key={d.t} className="rounded-lg border border-white/15 px-4 py-3 bg-white/5">
                <div style={{ fontWeight: 500 }}>{d.t}</div>
                <p className="text-sm text-neutral-400 mt-1">{d.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.01em" }}>Participe da gestão da sua cidade.</h2>
          <p className="text-neutral-600 mt-4 max-w-xl mx-auto">Crie sua conta gratuita e registre a primeira ocorrência em menos de dois minutos.</p>
          <div className="mt-7 flex justify-center gap-3">
            <Button size="lg" onClick={() => navigate({ name: "register" })}>Criar conta</Button>
            <Button size="lg" variant="outline" onClick={() => navigate({ name: "login" })}>Entrar</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
          <div>
            <Brand />
            <p className="text-sm text-neutral-600 mt-3 max-w-xs">
              Plataforma institucional para registro, acompanhamento e gestão de denúncias urbanas.
            </p>
          </div>
          <div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider mb-3">Produto</div>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li><a href="#como-funciona">Como funciona</a></li>
              <li><a href="#beneficios">Benefícios</a></li>
              <li><a href="#diferenciais">Diferenciais</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider mb-3">Acesso</div>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li><button onClick={() => navigate({ name: "login" })}>Entrar</button></li>
              <li><button onClick={() => navigate({ name: "register" })}>Criar conta</button></li>
              <li><button onClick={() => navigate({ name: "forgot" })}>Recuperar senha</button></li>
            </ul>
          </div>
          <div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider mb-3">Institucional</div>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li>Termos de uso</li>
              <li>Política de privacidade</li>
              <li>Contato institucional</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-200">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
            <div>© 2026 SpeakUp · Projeto Integrador</div>
            <div>Plataforma de utilidade pública</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
