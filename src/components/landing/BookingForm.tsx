"use client";

import { useActionState, useEffect, useState } from "react";
import { Calendar, CheckCircle, Loader2 } from "lucide-react";
import {
  createBooking,
  type BookingActionState,
} from "@/app/actions/bookings";

const initialState: BookingActionState = {};

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-sm text-red-400">{errors[0]}</p>;
}

function BookingFormFields({
  formKey,
  onSuccess,
}: {
  formKey: number;
  onSuccess: () => void;
}) {
  const [state, formAction, pending] = useActionState(
    createBooking,
    initialState,
  );

  useEffect(() => {
    if (state.success) onSuccess();
  }, [state.success, onSuccess]);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  if (state.success) return null;

  return (
    <form key={formKey} action={formAction} className="space-y-5">
      {state.error && !state.fieldErrors && (
        <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm text-zinc-300">
          Ваше имя *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          autoComplete="name"
          className="w-full min-h-[48px] rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
          placeholder="Иван Иванов"
        />
        <FieldError errors={state.fieldErrors?.name} />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm text-zinc-300">
          Телефон *
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          maxLength={20}
          autoComplete="tel"
          className="w-full min-h-[48px] rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
          placeholder="+7 (999) 123-45-67"
        />
        <FieldError errors={state.fieldErrors?.phone} />
      </div>

      <div>
        <label htmlFor="carBrand" className="mb-1.5 block text-sm text-zinc-300">
          Марка и модель авто *
        </label>
        <input
          id="carBrand"
          name="carBrand"
          type="text"
          required
          maxLength={100}
          className="w-full min-h-[48px] rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
          placeholder="Toyota Camry 2019"
        />
        <FieldError errors={state.fieldErrors?.carBrand} />
      </div>

      <div>
        <label htmlFor="problem" className="mb-1.5 block text-sm text-zinc-300">
          Описание проблемы *
        </label>
        <textarea
          id="problem"
          name="problem"
          required
          rows={4}
          maxLength={2000}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
          placeholder="Стук в подвеске при повороте..."
        />
        <FieldError errors={state.fieldErrors?.problem} />
      </div>

      <div>
        <label htmlFor="preferredDate" className="mb-1.5 block text-sm text-zinc-300">
          Желаемая дата *
        </label>
        <div className="relative">
          <Calendar className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            required
            min={minDate}
            className="w-full min-h-[48px] rounded-xl border border-white/10 bg-zinc-900 py-3 pl-12 pr-4 text-white outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
          />
        </div>
        <FieldError errors={state.fieldErrors?.preferredDate} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex w-full min-h-[52px] items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 font-semibold text-zinc-950 transition hover:bg-amber-400 disabled:opacity-60"
      >
        {pending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Отправка...
          </>
        ) : (
          "Отправить заявку"
        )}
      </button>
    </form>
  );
}

export function BookingForm() {
  const [formKey, setFormKey] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="booking" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Запись на ремонт
            </h2>
            <p className="mt-4 text-zinc-400">
              Оставьте заявку — мы перезвоним в течение 15 минут и подберём
              удобное время для визита.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Бесплатная первичная консультация",
                "Точная оценка стоимости до начала работ",
                "Напоминание о записи по SMS",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-zinc-300">
                  <CheckCircle className="h-5 w-5 shrink-0 text-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-400" />
                <h3 className="mt-4 text-xl font-semibold text-white">
                  Заявка отправлена!
                </h3>
                <p className="mt-2 text-zinc-400">
                  Мы свяжемся с вами в ближайшее время.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormKey((k) => k + 1);
                  }}
                  className="mt-6 text-sm text-amber-400 hover:underline"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <BookingFormFields
                key={formKey}
                formKey={formKey}
                onSuccess={() => setSubmitted(true)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
