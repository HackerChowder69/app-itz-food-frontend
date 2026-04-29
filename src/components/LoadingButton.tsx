import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LoadingButtonProps = {
  className?: string;
  label?: string;
};

function LoadingButton({
  className,
  label = "Cargando perfil...",
}: LoadingButtonProps) {
  return (
    <Button
      type="button"
      disabled
      className={cn(
        "h-10 rounded-md bg-orange-500 px-4 text-white hover:bg-orange-500",
        className
      )}
    >
      <Loader2 className="h-4 w-4 animate-spin" />
      {label}
    </Button>
  );
}

export default LoadingButton;
