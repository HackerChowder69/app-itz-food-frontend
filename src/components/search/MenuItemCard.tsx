import { Plus } from "lucide-react";

import type { MenuItem } from "@/api/types";
import { Card, CardContent } from "@/components/ui/card";

type MenuItemCardProps = {
  menuItem: MenuItem;
  onAddToCart: (menuItem: MenuItem) => void;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("es-MX", {
    currency: "MXN",
    style: "currency",
  }).format(amount);

function MenuItemCard({ menuItem, onAddToCart }: MenuItemCardProps) {
  return (
    <button
      type="button"
      className="w-full text-left"
      onClick={() => onAddToCart(menuItem)}
    >
      <Card className="transition hover:border-orange-200 hover:bg-orange-50">
        <CardContent className="flex items-center justify-between gap-4 p-4">
          <div>
            <h3 className="font-semibold text-slate-950">{menuItem.name}</h3>
            <p className="mt-1 text-sm font-medium text-slate-600">
              {formatCurrency(menuItem.price)}
            </p>
          </div>
          <span className="inline-flex size-9 items-center justify-center rounded-md bg-orange-500 text-white">
            <Plus className="size-4" />
          </span>
        </CardContent>
      </Card>
    </button>
  );
}

export default MenuItemCard;
