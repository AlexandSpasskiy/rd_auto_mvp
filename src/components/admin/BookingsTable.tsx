"use client";

import { updateBookingStatus } from "@/app/actions/bookings";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { BOOKING_STATUSES } from "@/lib/constants";
import type { Booking, BookingStatus } from "@/lib/db/schema";
import { formatDate, formatDateTime } from "@/lib/utils";

export function BookingsTable({ bookings }: { bookings: Booking[] }) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
        <p className="text-zinc-500">Заявок пока нет</p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-zinc-800 md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900">
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Клиент</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Телефон</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Авто</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Проблема</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Дата</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Статус</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Создана</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-zinc-800/50">
                <td className="px-4 py-3 text-white">{booking.name}</td>
                <td className="px-4 py-3 text-zinc-300">{booking.phone}</td>
                <td className="px-4 py-3 text-zinc-300">{booking.carBrand}</td>
                <td className="max-w-xs truncate px-4 py-3 text-zinc-400" title={booking.problem}>
                  {booking.problem}
                </td>
                <td className="px-4 py-3 text-zinc-300">{formatDate(booking.preferredDate)}</td>
                <td className="px-4 py-3">
                  <form action={updateBookingStatus} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={booking.id} />
                    <select
                      name="status"
                      defaultValue={booking.status}
                      onChange={(e) => e.target.form?.requestSubmit()}
                      className="rounded-lg border border-zinc-700 bg-zinc-800 px-2 py-1.5 text-sm text-white outline-none focus:border-amber-500/50"
                    >
                      {BOOKING_STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </form>
                </td>
                <td className="px-4 py-3 text-zinc-500">{formatDateTime(booking.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 md:hidden">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-white">{booking.name}</p>
                <p className="text-sm text-zinc-400">{booking.phone}</p>
              </div>
              <StatusBadge status={booking.status as BookingStatus} />
            </div>
            <p className="mt-2 text-sm text-zinc-300">{booking.carBrand}</p>
            <p className="mt-1 text-sm text-zinc-500">{booking.problem}</p>
            <p className="mt-2 text-xs text-zinc-500">
              Запись: {formatDate(booking.preferredDate)} · {formatDateTime(booking.createdAt)}
            </p>
            <form action={updateBookingStatus} className="mt-3">
              <input type="hidden" name="id" value={booking.id} />
              <select
                name="status"
                defaultValue={booking.status}
                onChange={(e) => e.target.form?.requestSubmit()}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white"
              >
                {BOOKING_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </form>
          </div>
        ))}
      </div>
    </>
  );
}
