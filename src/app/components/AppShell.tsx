import { ReactNode, useState } from "react";
import { useTheme } from "next-themes";
import { useStore } from "../lib/store";
import { Brand } from "./Brand";
import type { Route } from "../lib/types";
import {
  LayoutDashboard, FilePlus2, History, MapPin, User, LogOut, Bell, Menu, X, Shield, ListChecks, BarChart3, Sun, Moon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

interface NavItem { label: string; icon: any; route: Route; match: string[]; }

const userNav: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, route: { name: "dashboard" }, match: ["dashboard"] },
  { label: "Nova denúncia", icon: FilePlus2, route: { name: "new-report" }, match: ["new-report", "report-sent"] },
  { label: "Histórico", icon: History, route: { name: "history" }, match: ["history", "report-detail"] },
  { label: "Mapa", icon: MapPin, route: { name: "map" }, match: ["map"] },
  { label: "Perfil", icon: User, route: { name: "profile" }, match: ["profile"] },
];

const adminNav: NavItem[] = [
  { label: "Visão geral", icon: BarChart3, route: { name: "admin-dashboard" }, match: ["admin-dashboard"] },
  { label: "Denúncias", icon: ListChecks, route: { name: "admin-reports" }, match: ["admin-reports", "admin-detail"] },
  { label: "Mapa", icon: MapPin, route: { name: "admin-map" }, match: ["admin-map"] },
];

export function AppShell({ children, mode }: { children: ReactNode; mode: "user" | "admin" }) {
  const { route, navigate, user, logout, notifications, markNotificationsRead, isAdmin } = useStore();
  const [openMobile, setOpenMobile] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const items = mode === "admin" ? adminNav : userNav;
  const unread = notifications.filter((n) => !n.read).length;
  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  function isActive(item: NavItem) {
    return item.match.includes(route.name);
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex transition-colors duration-300">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex w-64 flex-col bg-sidebar border-r border-sidebar-border sticky top-0 h-screen transition-colors duration-300">
        <div className="px-5 py-5 border-b border-sidebar-border">
          <Brand />
          {mode === "admin" && (
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
              <Shield className="w-3 h-3" /> Administração
            </div>
          )}
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {items.map((it) => (
            <button
              key={it.label}
              onClick={() => navigate(it.route)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                isActive(it)
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <it.icon className="w-4 h-4" />
              {it.label}
            </button>
          ))}
          <div className="pt-4 mt-4 border-t border-sidebar-border space-y-1">
            {isAdmin ? (
              <button onClick={() => navigate({ name: "dashboard" })} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent">
                <User className="w-4 h-4" /> Área do cidadão
              </button>
            ) : (
              <button onClick={() => navigate({ name: "admin-dashboard" })} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent">
                <Shield className="w-4 h-4" /> Painel administrativo
              </button>
            )}
          </div>
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border transition-colors duration-300">
          <div className="h-14 px-4 lg:px-8 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 lg:hidden">
              <button onClick={() => setOpenMobile(true)} className="p-2 rounded-md hover:bg-sidebar-accent">
                <Menu className="w-5 h-5" />
              </button>
              <Brand />
            </div>
            <div className="hidden lg:block text-sm text-muted-foreground">{mode === "admin" ? "Painel administrativo" : "Área do cidadão"}</div>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setTheme(nextTheme)}
                    className="p-2 rounded-md transition-colors duration-200 hover:bg-sidebar-accent"
                    aria-label={`Alternar para ${nextTheme}`}
                  >
                    {currentTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>
                  Alternar para {nextTheme === "dark" ? "Modo Escuro" : "Modo Claro"}
                </TooltipContent>
              </Tooltip>
              <Popover>
                <PopoverTrigger asChild>
                  <button onClick={markNotificationsRead} className="relative p-2 rounded-md hover:bg-sidebar-accent">
                    <Bell className="w-5 h-5" />
                    {unread > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-sidebar-primary text-sidebar-primary-foreground text-[10px] grid place-items-center">{unread}</span>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80 p-0">
                  <div className="px-4 py-3 border-b border-border">
                    <div className="text-sm" style={{ fontWeight: 600 }}>Notificações</div>
                    <div className="text-xs text-muted-foreground">Atualizações recentes das suas denúncias</div>
                  </div>
                  <ScrollArea className="max-h-80">
                    <ul>
                      {notifications.length === 0 && (
                        <li className="px-4 py-6 text-sm text-muted-foreground text-center">Nenhuma notificação.</li>
                      )}
                      {notifications.map((n) => (
                        <li key={n.id} className="px-4 py-3 border-b border-border last:border-0 hover:bg-sidebar-accent">
                          <div className="flex items-start gap-2">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${n.read ? "bg-neutral-300 dark:bg-neutral-600" : "bg-sidebar-primary"}`} />
                            <div className="min-w-0">
                              <div className="text-sm" style={{ fontWeight: 500 }}>{n.title}</div>
                              <div className="text-xs text-muted-foreground">{n.message}</div>
                              <div className="text-[11px] text-muted-foreground mt-1">{new Date(n.date).toLocaleString("pt-BR")}</div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
              <div className="hidden sm:flex items-center gap-2 pl-2 ml-1 border-l border-border">
                <div className="w-8 h-8 rounded-full bg-sidebar-primary text-sidebar-primary-foreground grid place-items-center text-xs">
                  {user?.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </div>
                <div className="text-sm leading-tight">
                  <div style={{ fontWeight: 500 }}>{user?.name}</div>
                  <div className="text-xs text-muted-foreground">{user?.email}</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 max-w-[1400px] w-full mx-auto">{children}</main>
      </div>

      {/* Mobile drawer */}
      {openMobile && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpenMobile(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-sidebar border-r border-sidebar-border flex flex-col">
            <div className="px-5 py-5 border-b border-sidebar-border flex items-center justify-between">
              <Brand />
              <button onClick={() => setOpenMobile(false)} className="p-2 rounded-md hover:bg-sidebar-accent"><X className="w-4 h-4" /></button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              {items.map((it) => (
                <button
                  key={it.label}
                  onClick={() => { navigate(it.route); setOpenMobile(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm ${isActive(it) ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent"}`}
                >
                  <it.icon className="w-4 h-4" />{it.label}
                </button>
              ))}
            </nav>
            <div className="p-3 border-t border-sidebar-border">
              <Button variant="outline" className="w-full" onClick={logout}><LogOut className="w-4 h-4 mr-2" /> Sair</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
