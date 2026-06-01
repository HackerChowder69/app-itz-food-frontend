import type { Order } from "@/api/types";
import { Separator } from "@/components/ui/separator";

type OrderStatusDetailProps = {
  order: Order;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("es-MX", {
    currency: "MXN",
    style: "currency",
  }).format(amount);

function OrderStatusDetail({ order }: OrderStatusDetailProps) {
  return (
    <div className="space-y-4 rounded-lg border bg-white p-5">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-950">
          {order.deliveryDetails.name}
        </h3>
        <p className="text-sm text-slate-600">
          {order.deliveryDetails.address}
        </p>
        <p className="text-sm text-slate-600">
          {order.deliveryDetails.city}, {order.deliveryDetails.country}
        </p>
      </div>

      <Separator />

      <div className="space-y-2">
        {order.cartItems.map((cartItem) => (
          <div
            key={`${cartItem.name}-${cartItem.menuItemId ?? ""}`}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="text-slate-700">
              {cartItem.quantity} x {cartItem.name}
            </span>
            <span className="font-semibold text-slate-950">
              {formatCurrency(cartItem.price * cartItem.quantity)}
            </span>
          </div>
        ))}
      </div>

      <Separator />

      <div className="flex items-center justify-between text-base font-bold text-slate-950">
        <span>Total</span>
        <span>{formatCurrency(order.totalAmount / 100)}</span>
      </div>
    </div>
  );
}

export default OrderStatusDetail;
