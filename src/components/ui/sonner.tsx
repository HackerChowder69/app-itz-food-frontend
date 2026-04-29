import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";
import {
  toastListeners,
  type ToastListener,
  type ToastPosition,
  type ToastRecord,
  type ToastVariant,
} from "@/components/ui/toast";

type ToasterProps = {
  closeButton?: boolean;
  position?: ToastPosition;
  richColors?: boolean;
  visibleToasts?: number;
};

const positionClasses: Record<ToastPosition, string> = {
  "bottom-right": "bottom-4 right-4",
  "top-left": "left-4 top-4",
  "top-right": "right-4 top-4",
};

const toastVariantClasses = {
  default: {
    icon: Info,
    rich: "border-slate-200 bg-white text-slate-800",
    subtle: "border-slate-200 bg-white text-slate-800",
  },
  error: {
    icon: XCircle,
    rich: "border-red-200 bg-red-600 text-white",
    subtle: "border-red-200 bg-red-50 text-red-700",
  },
  success: {
    icon: CheckCircle2,
    rich: "border-emerald-200 bg-emerald-600 text-white",
    subtle: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
} satisfies Record<
  ToastVariant,
  {
    icon: typeof Info;
    rich: string;
    subtle: string;
  }
>;

export function Toaster({
  closeButton = false,
  position = "top-right",
  richColors = false,
  visibleToasts = 3,
}: ToasterProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);

  useEffect(() => {
    const removeToast = (id: number) => {
      setToasts((current) => current.filter((toastRecord) => toastRecord.id !== id));
    };

    const listener: ToastListener = (record) => {
      setToasts((current) => [record, ...current].slice(0, visibleToasts));
      window.setTimeout(() => removeToast(record.id), record.duration);
    };

    toastListeners.add(listener);

    return () => {
      toastListeners.delete(listener);
    };
  }, [visibleToasts]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className={cn(
        "pointer-events-none fixed z-50 flex w-full max-w-sm flex-col gap-3",
        positionClasses[position]
      )}
    >
      {toasts.map((toastRecord) => {
        const styles = toastVariantClasses[toastRecord.variant];
        const Icon = styles.icon;

        return (
          <div
            key={toastRecord.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-xl shadow-slate-900/10",
              richColors ? styles.rich : styles.subtle
            )}
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="flex-1 text-sm font-medium leading-6">{toastRecord.message}</p>
            {closeButton ? (
              <button
                type="button"
                onClick={() =>
                  setToasts((current) =>
                    current.filter((item) => item.id !== toastRecord.id)
                  )
                }
                className={cn(
                  "rounded-full p-1 transition hover:bg-black/5",
                  richColors && toastRecord.variant !== "default"
                    ? "hover:bg-white/15"
                    : undefined
                )}
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        );
      })}
    </div>,
    document.body
  );
}
