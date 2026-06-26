import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SITE } from "@/lib/constants";

export function Contacts() {
  return (
    <section id="contacts" className="border-t border-white/10 bg-white/[0.02] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Контакты</h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Приезжайте в гости или звоните — мы всегда рады помочь
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <MapPin className="h-8 w-8 text-amber-400" />
            <h3 className="mt-4 font-semibold text-white">Адрес</h3>
            <p className="mt-2 text-sm text-zinc-400">{SITE.address}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <Phone className="h-8 w-8 text-amber-400" />
            <h3 className="mt-4 font-semibold text-white">Телефон</h3>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="mt-2 block text-sm text-zinc-400 transition hover:text-amber-400"
            >
              {SITE.phone}
            </a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <Mail className="h-8 w-8 text-amber-400" />
            <h3 className="mt-4 font-semibold text-white">Email</h3>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-2 block text-sm text-zinc-400 transition hover:text-amber-400"
            >
              {SITE.email}
            </a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <Clock className="h-8 w-8 text-amber-400" />
            <h3 className="mt-4 font-semibold text-white">Режим работы</h3>
            <p className="mt-2 text-sm text-zinc-400">{SITE.hours}</p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
          <div className="flex h-48 items-center justify-center sm:h-64">
            <div className="text-center">
              <MapPin className="mx-auto h-10 w-10 text-amber-400/50" />
              <p className="mt-2 text-zinc-500">{SITE.address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
