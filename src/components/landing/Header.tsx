"use client";

import { useState } from "react";
import { Menu, X, Phone, Wrench } from "lucide-react";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "#services", label: "Услуги" },
  { href: "#pricing", label: "Цены" },
  { href: "#booking", label: "Запись" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-zinc-950">
            <Wrench className="h-5 w-5" />
          </div>
          <span className="hidden text-lg font-semibold text-white sm:block">
            {SITE.name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-300 transition hover:text-amber-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className="hidden items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400 sm:flex"
          >
            <Phone className="h-4 w-4" />
            {SITE.phone}
          </a>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-zinc-300 hover:bg-white/10 md:hidden"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-white/10 bg-zinc-950 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col px-4 py-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-3 text-zinc-300 transition hover:text-amber-400"
            >
              {item.label}
            </a>
          ))}
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-amber-500 py-3 font-semibold text-zinc-950"
          >
            <Phone className="h-4 w-4" />
            {SITE.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
