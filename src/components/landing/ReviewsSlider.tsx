"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, ExternalLink } from "lucide-react";
import type { Review } from "@/lib/db/schema";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Рейтинг ${rating} из 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-zinc-700 text-zinc-700",
          )}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initials = review.authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-sm font-bold text-white">
            {initials}
          </div>
          <div>
            <p className="font-semibold text-white">{review.authorName}</p>
            <p className="text-sm text-zinc-500">{formatDate(review.reviewDate)}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-[#34a853]/10 px-2.5 py-1">
          <span className="text-xs font-bold text-[#34a853]">2ГИС</span>
          <ExternalLink className="h-3 w-3 text-[#34a853]" />
        </div>
      </div>
      <StarRating rating={review.rating} />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-300">
        {review.text}
      </p>
    </div>
  );
}

export function ReviewsSlider({ reviews }: { reviews: Review[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (reviews.length === 0) return;
      setCurrent(((index % reviews.length) + reviews.length) % reviews.length);
    },
    [reviews.length],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (reviews.length <= 1 || paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [reviews.length, paused, next]);

  if (reviews.length === 0) {
    return (
      <section id="reviews" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Отзывы</h2>
          <p className="mt-4 text-zinc-400">Отзывы скоро появятся</p>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#34a853]/10 px-3 py-1 text-sm text-[#34a853]">
              <span className="font-semibold">2ГИС</span>
              <span className="text-zinc-400">·</span>
              <span>Отзывы клиентов</span>
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Нам доверяют
            </h2>
            <p className="mt-2 text-zinc-400">
              Реальные отзывы наших клиентов · рейтинг 4.9
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-zinc-300 transition hover:bg-white/10"
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-zinc-300 transition hover:bg-white/10"
              aria-label="Следующий отзыв"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          className="relative mt-10 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {reviews.map((review) => (
              <div key={review.id} className="w-full shrink-0 px-1">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {reviews.map((review, i) => (
            <button
              key={review.id}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === current ? "w-8 bg-amber-400" : "w-2 bg-zinc-600",
              )}
              aria-label={`Отзыв ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
