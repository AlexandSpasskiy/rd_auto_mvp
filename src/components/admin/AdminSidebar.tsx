"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { logoutAction } from "@/app/actions/auth";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Заявки", icon: LayoutDashboard },
  { href: "/admin/reviews", label: "Отзывы", icon: MessageSquare },
];

export function AdminSidebar({ username }: { username: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-3 lg:hidden">
        <span className="font-semibold text-white">Автосервис — админ</span>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800"
          aria-label="Меню"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r border-zinc-800 bg-zinc-900 transition-transform lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="hidden border-b border-zinc-800 p-6 lg:block">
            <p className="text-lg font-bold text-white">Автосервис</p>
            <p className="text-sm text-zinc-500">Панель управления</p>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                    active
                      ? "bg-amber-500/10 text-amber-400"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-zinc-800 p-4">
            <p className="mb-3 truncate text-sm text-zinc-500">{username}</p>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Выйти
              </button>
            </form>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}
    </>
  );
}
