import * as React from "react";

import { cn } from "@/lib/utils";

type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: number;
};

function Progress({ className, value = 0, ...props }: ProgressProps) {
  const progressValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn("h-2 w-full overflow-hidden rounded-md bg-slate-100", className)}
      role="progressbar"
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={progressValue}
      {...props}
    >
      <div
        className="h-full rounded-md bg-orange-500 transition-all"
        style={{ width: `${progressValue}%` }}
      />
    </div>
  );
}

export { Progress };
