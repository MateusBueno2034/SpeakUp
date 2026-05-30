import { useState } from "react";
import { useTheme } from "next-themes";
import { useStore } from "../lib/store";
import { Brand } from "../components/Brand";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Alert, AlertDescription } from "../components/ui/alert";
import { AlertCircle, ArrowLeft, CheckCircle2, Eye, EyeOff, Shield, Moon, Sun } from "lucide-react";

function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const activeTheme = currentTheme || "light";
  const nextTheme = activeTheme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
    >
      {activeTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      {activeTheme === "dark" ? "Claro" : "Escuro"}
    </button>
  );
}

function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  const { navigate } = useStore();
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      <div className="hidden lg:flex flex-col justify-between bg-neutral-900 text-white p-12">
        <button onClick={() => navigate({ name: "landing" })} className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white"><ArrowLeft className="w-4 h-4" /> Voltar ao site</button>
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-white text-neutral-900 grid place-items-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11a8 8 0 0 1 16 0v3a8 8 0 0 1-8 8H6a3 3 0 0 1-3-3z"/><path d="M9 11h6M9 15h4"/></svg>
            </div>
            <span style={{ fontWeight: 600, fontSize: 17 }}>SpeakUp</span>
          </div>
          <h2 className="mt-8" style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
            Um canal institucional para a transparência das ocorrências urbanas.
          </h2>
          <p className="mt-4 text-neutral-300 max-w-md">
            Registre, acompanhe e receba retorno formal sobre os problemas que afetam o seu bairro.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-neutral-300">
            <li className="flex items-center gap-2"><Shield className="w-4 h-4" /> Protocolo oficial por denúncia</li>
            <li className="flex items-center gap-2"><Shield className="w-4 h-4" /> Acompanhamento em tempo real</li>
            <li className="flex items-center gap-2"><Shield className="w-4 h-4" /> Dados protegidos</li>
          </ul>
        </div>
        <div className="text-xs text-neutral-500">© 2026 SpeakUp · Plataforma de utilidade pública</div>
      </div>
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-6 flex items-center justify-between">
            <Brand />
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button onClick={() => navigate({ name: "landing" })} className="text-sm text-neutral-500"><ArrowLeft className="w-4 h-4 inline" /> Voltar</button>
            </div>
          </div>
          <div className="hidden lg:flex justify-end mb-6">
            <ThemeToggle />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 600 }}>{title}</h1>
          <p className="text-sm text-neutral-600 mt-1.5">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Login() {
  const { login, navigate } = useStore();
  const [email, setEmail] = useState("comunicacao@prefeitura.gov.br");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || password.length < 4) {
      setError("Credenciais inválidas. Verifique e-mail e senha.");
      return;
    }
    const asAdmin = email.startsWith("admin");
    login(email, asAdmin);
    navigate(asAdmin ? { name: "admin-dashboard" } : { name: "dashboard" });
  }

  return (
    <AuthShell title="Entrar na sua conta" subtitle="Use seu e-mail e senha para acessar o sistema.">
      <form onSubmit={submit} className="space-y-4">
        {error && (
          <Alert variant="destructive"><AlertCircle className="w-4 h-4" /><AlertDescription>{error}</AlertDescription></Alert>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Input id="password" type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 p-1.5">
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-neutral-700">
            <Checkbox defaultChecked /> Manter conectado
          </label>
          <button type="button" onClick={() => navigate({ name: "forgot" })} className="text-sm text-neutral-700 hover:underline">Esqueci a senha</button>
        </div>
        <Button type="submit" className="w-full">Entrar</Button>
        <div className="text-sm text-neutral-600 text-center">
          Não tem cadastro? <button type="button" onClick={() => navigate({ name: "register" })} className="text-neutral-900 underline">Criar conta</button>
        </div>
        <div className="text-xs text-neutral-500 text-center pt-3 border-t border-neutral-200">
          Dica: use um e-mail começando com <span className="text-neutral-900">admin</span> para entrar no painel administrativo.
        </div>
      </form>
    </AuthShell>
  );
}

export function Register() {
  const { login, navigate } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [conf, setConf] = useState("");
  const [accept, setAccept] = useState(false);

  const strength = (() => {
    let s = 0;
    if (pass.length >= 8) s++;
    if (/[A-Z]/.test(pass)) s++;
    if (/[0-9]/.test(pass)) s++;
    if (/[^A-Za-z0-9]/.test(pass)) s++;
    return s;
  })();
  const strengthLabel = ["Muito fraca", "Fraca", "Razoável", "Forte", "Excelente"][strength];

  const errors = {
    name: name && name.trim().split(" ").length < 2 ? "Informe nome e sobrenome." : "",
    email: email && !email.includes("@") ? "E-mail inválido." : "",
    pass: pass && pass.length < 8 ? "Mínimo de 8 caracteres." : "",
    conf: conf && conf !== pass ? "As senhas não coincidem." : "",
  };
  const canSubmit = name && email && pass.length >= 8 && conf === pass && accept;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    login(email);
    navigate({ name: "dashboard" });
  }

  return (
    <AuthShell title="Criar sua conta" subtitle="Cadastro gratuito. Leva menos de um minuto.">
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-1.5">
          <Label>Nome completo</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Como deseja ser identificado" />
          {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>E-mail</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" />
          {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Senha</Label>
          <Input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Crie uma senha forte" />
          {pass && (
            <>
              <div className="flex gap-1 mt-1">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className={`h-1 flex-1 rounded ${i < strength ? "bg-neutral-900" : "bg-neutral-200"}`} />
                ))}
              </div>
              <p className="text-xs text-neutral-600">Força: {strengthLabel}</p>
            </>
          )}
          {errors.pass && <p className="text-xs text-red-600">{errors.pass}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Confirmar senha</Label>
          <Input type="password" value={conf} onChange={(e) => setConf(e.target.value)} placeholder="Repita a senha" />
          {errors.conf && <p className="text-xs text-red-600">{errors.conf}</p>}
          {conf && conf === pass && !errors.pass && (
            <p className="text-xs text-emerald-700 inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Senhas conferem</p>
          )}
        </div>
        <label className="flex items-start gap-2 text-sm text-neutral-700">
          <Checkbox checked={accept} onCheckedChange={(v) => setAccept(!!v)} className="mt-0.5" />
          <span>Li e aceito os <span className="underline">Termos de uso</span> e a <span className="underline">Política de privacidade</span>.</span>
        </label>
        <Button type="submit" className="w-full" disabled={!canSubmit}>Criar conta</Button>
        <div className="text-sm text-neutral-600 text-center">
          Já tem conta? <button type="button" onClick={() => navigate({ name: "login" })} className="text-neutral-900 underline">Entrar</button>
        </div>
      </form>
    </AuthShell>
  );
}

export function ForgotPassword() {
  const { navigate } = useStore();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <AuthShell title="Recuperar acesso" subtitle="Enviaremos um link de redefinição para o seu e-mail.">
      {sent ? (
        <div className="space-y-4">
          <Alert>
            <CheckCircle2 className="w-4 h-4" />
            <AlertDescription>
              Se o e-mail informado estiver cadastrado, você receberá em instantes um link de redefinição válido por 30 minutos.
            </AlertDescription>
          </Alert>
          <Button className="w-full" onClick={() => navigate({ name: "login" })}>Voltar ao login</Button>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
          <div className="space-y-1.5">
            <Label>E-mail cadastrado</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" required />
          </div>
          <p className="text-xs text-neutral-500">Por segurança, não confirmamos publicamente se o e-mail está cadastrado.</p>
          <Button type="submit" className="w-full">Enviar link de redefinição</Button>
          <div className="text-sm text-neutral-600 text-center">
            <button type="button" onClick={() => navigate({ name: "login" })} className="text-neutral-900 underline">Voltar ao login</button>
          </div>
        </form>
      )}
    </AuthShell>
  );
}
