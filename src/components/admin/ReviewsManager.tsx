"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Star, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import {
  createReview,
  deleteReview,
  toggleReviewVisibility,
  type ReviewActionState,
} from "@/app/actions/reviews";
import type { Review } from "@/lib/db/schema";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const initialState: ReviewActionState = {};

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "fill-amber-400 text-amber-400" : "text-zinc-600",
          )}
        />
      ))}
    </div>
  );
}

export function ReviewsManager({ reviews }: { reviews: Review[] }) {
  const [state, formAction, pending] = useActionState(createReview, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setShowForm(false);
      setTimeout(() => setShowForm(true), 0);
    }
  }, [state.success]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="text-lg font-semibold text-white">Добавить отзыв</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Новый отзыв сразу появится на главной странице в блоке 2ГИС
        </p>

        {state.success && (
          <p className="mt-4 rounded-lg bg-green-500/10 px-4 py-3 text-sm text-green-400">
            Отзыв успешно добавлен!
          </p>
        )}

        {showForm && (
          <form ref={formRef} action={formAction} className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="authorName" className="mb-1 block text-sm text-zinc-400">
                  Имя автора
                </label>
                <input
                  id="authorName"
                  name="authorName"
                  required
                  maxLength={100}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white outline-none focus:border-amber-500/50"
                  placeholder="Алексей М."
                />
              </div>
              <div>
                <label htmlFor="rating" className="mb-1 block text-sm text-zinc-400">
                  Рейтинг
                </label>
                <select
                  id="rating"
                  name="rating"
                  defaultValue={5}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white outline-none focus:border-amber-500/50"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} ★
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="reviewDate" className="mb-1 block text-sm text-zinc-400">
                Дата отзыва
              </label>
              <input
                id="reviewDate"
                name="reviewDate"
                type="date"
                required
                max={today}
                defaultValue={today}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white outline-none focus:border-amber-500/50"
              />
            </div>
            <div>
              <label htmlFor="text" className="mb-1 block text-sm text-zinc-400">
                Текст отзыва
              </label>
              <textarea
                id="text"
                name="text"
                required
                rows={4}
                maxLength={2000}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white outline-none focus:border-amber-500/50"
                placeholder="Текст отзыва клиента..."
              />
            </div>
            <button
              type="submit"
              disabled={pending}
              className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-400 disabled:opacity-60"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />}
              Добавить отзыв
            </button>
          </form>
        )}
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">
          Все отзывы ({reviews.length})
        </h2>
        {reviews.length === 0 ? (
          <p className="text-zinc-500">Отзывов нет</p>
        ) : (
          <div className="space-y-3">
            {reviews.map((review) => (
              <div
                key={review.id}
                className={cn(
                  "rounded-xl border p-4",
                  review.isVisible
                    ? "border-zinc-800 bg-zinc-900/50"
                    : "border-zinc-800/50 bg-zinc-900/20 opacity-60",
                )}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-medium text-white">{review.authorName}</p>
                      <span className="rounded bg-[#34a853]/10 px-2 py-0.5 text-xs text-[#34a853]">
                        2ГИС
                      </span>
                      {!review.isVisible && (
                        <span className="text-xs text-zinc-500">(скрыт)</span>
                      )}
                    </div>
                    <StarDisplay rating={review.rating} />
                    <p className="mt-2 text-sm text-zinc-400">{review.text}</p>
                    <p className="mt-1 text-xs text-zinc-600">
                      {formatDate(review.reviewDate)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <form action={toggleReviewVisibility}>
                      <input type="hidden" name="id" value={review.id} />
                      <input
                        type="hidden"
                        name="isVisible"
                        value={String(!review.isVisible)}
                      />
                      <button
                        type="submit"
                        className="rounded-lg border border-zinc-700 p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                        title={review.isVisible ? "Скрыть" : "Показать"}
                      >
                        {review.isVisible ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </form>
                    <form action={deleteReview}>
                      <input type="hidden" name="id" value={review.id} />
                      <button
                        type="submit"
                        className="rounded-lg border border-red-500/30 p-2 text-red-400 hover:bg-red-500/10"
                        title="Удалить"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
