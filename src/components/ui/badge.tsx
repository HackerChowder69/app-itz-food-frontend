import * as React from "react";

import { cn } from "@/lib/utils";

function Badge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-orange-100 bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
