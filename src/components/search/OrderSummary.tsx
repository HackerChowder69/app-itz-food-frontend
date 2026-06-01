import { Trash } from "lucide-react";

import type { CartItem } from "@/api/types";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type OrderSummaryProps = {
  cartItems: CartItem[];
  deliveryPrice: number;
  restaurantName: string;
  removeFromCart: (cartItem: CartItem) => void;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("es-MX", {
    currency: "MXN",
    style: "currency",
  }).format(amount);

function OrderSummary({
  cartItems,
  deliveryPrice,
  restaurantName,
  removeFromCart,
}: OrderSummaryProps) {
  const getTotalCost = () =>
    cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    ) + deliveryPrice;

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl">Tu orden</CardTitle>
        <p className="text-sm text-slate-600">{restaurantName}</p>
      </CardHeader>
      <CardContent>
        {cartItems.length === 0 ? (
          <p className="rounded-md bg-slate-50 px-3 py-4 text-sm text-slate-600">
            Selecciona productos del menu para agregarlos al carrito.
          </p>
        ) : (
          <div className="space-y-2">
            {cartItems.map((cartItem) => (
              <Badge
                key={cartItem._id}
                className="flex w-full justify-between gap-3 bg-white text-slate-800"
              >
                <span className="min-w-0 flex-1">
                  {cartItem.quantity} x {cartItem.name}
                </span>
                <span className="font-bold">
                  {formatCurrency(cartItem.price * cartItem.quantity)}
                </span>
                <button
                  type="button"
                  aria-label={`Eliminar ${cartItem.name}`}
                  className="inline-flex size-6 items-center justify-center rounded-md text-red-500 transition hover:bg-red-50 hover:text-red-600"
                  onClick={() => removeFromCart(cartItem)}
                >
                  <Trash className="size-3.5" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        <Separator className="my-4" />

        <div className="my-2 flex justify-between text-sm text-slate-700">
          <span>Envio</span>
          <span>{formatCurrency(deliveryPrice)}</span>
        </div>
        <div className="my-2 flex justify-between text-base font-bold text-slate-950">
          <span>Total</span>
          <span>{formatCurrency(getTotalCost())}</span>
        </div>
      </CardContent>
    </>
  );
}

export default OrderSummary;
