import { PRICING } from "@/lib/constants";

export function Pricing() {
  return (
    <section id="pricing" className="border-y border-white/10 bg-white/[0.02] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Прозрачные цены
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Окончательная стоимость согласовывается после диагностики. Без
            скрытых доплат.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10">
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                    Услуга
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                    Стоимость
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                    Время
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRICING.map((item, i) => (
                  <tr
                    key={item.service}
                    className={i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"}
                  >
                    <td className="px-6 py-4 text-white">{item.service}</td>
                    <td className="px-6 py-4 font-semibold text-amber-400">
                      {item.price}
                    </td>
                    <td className="px-6 py-4 text-zinc-400">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-white/10 md:hidden">
            {PRICING.map((item) => (
              <div key={item.service} className="p-4">
                <p className="font-medium text-white">{item.service}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-semibold text-amber-400">{item.price}</span>
                  <span className="text-sm text-zinc-400">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
