import {
  ScanSearch,
  Wrench,
  Cog,
  Zap,
  Car,
  CircleDot,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  ScanSearch,
  Wrench,
  Cog,
  Zap,
  Car,
  CircleDot,
};

export function Services() {
  return (
    <section id="services" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Наши услуги
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Полный спектр работ по обслуживанию и ремонту автомобилей любой
            сложности
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = ICONS[service.icon] ?? Wrench;
            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-amber-500/30 hover:bg-white/[0.07]"
              >
                <div className="mb-4 inline-flex rounded-xl bg-amber-500/10 p-3 text-amber-400 transition group-hover:bg-amber-500/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
