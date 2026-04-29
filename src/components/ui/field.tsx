import type { HTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type FieldProps = HTMLAttributes<HTMLDivElement>;

function Field({ className, ...props }: FieldProps) {
  return <div className={cn("grid gap-2", className)} {...props} />;
}

type FieldGroupProps = HTMLAttributes<HTMLDivElement>;

function FieldGroup({ className, ...props }: FieldGroupProps) {
  return <div className={cn("grid gap-2", className)} {...props} />;
}

type FieldLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <label
      className={cn("text-sm font-medium text-slate-700", className)}
      {...props}
    />
  );
}

type FieldErrorProps = {
  children?: ReactNode;
  className?: string;
};

function FieldError({ children, className }: FieldErrorProps) {
  if (!children) {
    return null;
  }

  return (
    <p
      role="alert"
      className={cn("text-sm font-medium text-red-600", className)}
    >
      {children}
    </p>
  );
}

export { Field, FieldError, FieldGroup, FieldLabel };
