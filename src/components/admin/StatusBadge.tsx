import { cn, getStatusLabel } from "@/lib/utils";
import type { BookingStatus } from "@/lib/db/schema";

const STYLES: Record<BookingStatus, string> = {
  new: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  in_progress: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  completed: "bg-green-500/10 text-green-400 border-green-500/30",
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium",
        STYLES[status],
      )}
    >
      {getStatusLabel(status)}
    </span>
  );
}
