import { ArrowRight, Shield, Clock, Award } from "lucide-react";
import { SITE } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-zinc-950 to-zinc-950" />
      <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />
      <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-amber-600/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-400">
              <Award className="h-4 w-4" />
              Более 15 лет на рынке
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {SITE.name}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
              {SITE.tagline}. Современное оборудование, опытные мастера и
              прозрачные цены без скрытых платежей.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#booking"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-amber-500 px-8 py-3 font-semibold text-zinc-950 transition hover:bg-amber-400"
              >
                Записаться на ремонт
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#services"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/20 px-8 py-3 font-semibold text-white transition hover:bg-white/5"
              >
                Наши услуги
              </a>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <Shield className="h-8 w-8 shrink-0 text-amber-400" />
                <div>
                  <p className="font-semibold text-white">Гарантия</p>
                  <p className="text-sm text-zinc-400">до 12 месяцев</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <Clock className="h-8 w-8 shrink-0 text-amber-400" />
                <div>
                  <p className="font-semibold text-white">Быстро</p>
                  <p className="text-sm text-zinc-400">большинство работ за день</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <Award className="h-8 w-8 shrink-0 text-amber-400" />
                <div>
                  <p className="font-semibold text-white">4.9 ★</p>
                  <p className="text-sm text-zinc-400">рейтинг на 2ГИС</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-2xl">
              <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                <div className="mb-6 text-8xl">🚗</div>
                <p className="text-2xl font-bold text-white">Профессиональный сервис</p>
                <p className="mt-2 text-zinc-400">Все марки автомобилей</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-xl border border-amber-500/30 bg-zinc-900 px-6 py-4 shadow-xl">
              <p className="text-3xl font-bold text-amber-400">5000+</p>
              <p className="text-sm text-zinc-400">довольных клиентов</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
