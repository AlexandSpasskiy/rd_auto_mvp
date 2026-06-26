import { BookingsTable } from "@/components/admin/BookingsTable";
import { getAllBookings, getBookingStats } from "@/lib/queries";

export default function AdminDashboardPage() {
  const bookings = getAllBookings();
  const stats = getBookingStats();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Заявки на ремонт</h1>
      <p className="mt-1 text-zinc-500">
        Управление заявками клиентов с сайта
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Всего", value: stats.total, color: "text-white" },
          { label: "Новые", value: stats.new, color: "text-blue-400" },
          { label: "В работе", value: stats.inProgress, color: "text-amber-400" },
          { label: "Завершены", value: stats.completed, color: "text-green-400" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
          >
            <p className="text-sm text-zinc-500">{stat.label}</p>
            <p className={`mt-1 text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <BookingsTable bookings={bookings} />
      </div>
    </div>
  );
}
