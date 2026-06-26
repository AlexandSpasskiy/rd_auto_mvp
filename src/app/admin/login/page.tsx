"use client";

import { useActionState } from "react";
import { Loader2, Lock, Wrench } from "lucide-react";
import { loginAction, type AuthActionState } from "@/app/actions/auth";

const initialState: AuthActionState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500 text-zinc-950">
            <Wrench className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-white">Вход в админ-панель</h1>
          <p className="mt-2 text-sm text-zinc-500">Автосервис</p>
        </div>

        <form
          action={formAction}
          className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8"
        >
          {state.error && (
            <p className="mb-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {state.error}
            </p>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="mb-1.5 block text-sm text-zinc-400">
                Логин
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                className="w-full min-h-[48px] rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-amber-500/50"
                placeholder="admin"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm text-zinc-400">
                Пароль
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full min-h-[48px] rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-amber-500/50"
                placeholder="••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="mt-6 flex w-full min-h-[48px] items-center justify-center gap-2 rounded-lg bg-amber-500 py-3 font-semibold text-zinc-950 transition hover:bg-amber-400 disabled:opacity-60"
          >
            {pending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Войти
              </>
            )}
          </button>

          <p className="mt-4 text-center text-xs text-zinc-600">
            Демо: admin / admin (или значения из .env.local)
          </p>
        </form>
      </div>
    </div>
  );
}
