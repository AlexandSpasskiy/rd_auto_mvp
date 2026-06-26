import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} {SITE.name}. Все права защищены.
        </p>
        <p className="text-xs text-zinc-600">
          Демо-версия MVP для презентации бизнеса
        </p>
      </div>
    </footer>
  );
}
