export type ToastVariant = "default" | "error" | "success"

export type ToastPosition = "bottom-right" | "top-left" | "top-right"

export type ToastRecord = {
  duration: number
  id: number
  message: string
  variant: ToastVariant
}

export type ToastListener = (toast: ToastRecord) => void

export const toastListeners = new Set<ToastListener>()

let toastId = 0

const emitToast = (
  message: string,
  variant: ToastVariant = "default",
  duration = 3800
) => {
  const record: ToastRecord = {
    duration,
    id: ++toastId,
    message,
    variant,
  }

  toastListeners.forEach((listener) => listener(record))

  return record.id
}

export const toast = Object.assign((message: string) => emitToast(message), {
  error: (message: string) => emitToast(message, "error", 4200),
  success: (message: string) => emitToast(message, "success"),
})
