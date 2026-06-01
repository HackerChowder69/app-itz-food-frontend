import * as React from "react";

import { cn } from "@/lib/utils";

type AspectRatioProps = React.HTMLAttributes<HTMLDivElement> & {
  ratio?: number;
};

function AspectRatio({
  className,
  ratio = 16 / 9,
  style,
  ...props
}: AspectRatioProps) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio: String(ratio), ...style }}
      {...props}
    />
  );
}

export { AspectRatio };
