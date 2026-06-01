import type { Order } from "@/api/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type OrderItemsCardProps = {
  order: Order;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("es-MX", {
    currency: "MXN",
    style: "currency",
  }).format(amount);

function OrderItemsCard({ order }: OrderItemsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid gap-3 text-base md:grid-cols-4">
          <span>{order.deliveryDetails.name}</span>
          <span className="font-normal text-slate-600">
            {order.deliveryDetails.address}
          </span>
          <span className="font-normal text-slate-600">
            {order.deliveryDetails.city}
          </span>
          <span className="text-right">
            {formatCurrency(order.totalAmount / 100)}
          </span>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-6">
        <div className="space-y-2">
          {order.cartItems.map((cartItem) => (
            <div
              key={`${cartItem.name}-${cartItem.menuItemId ?? ""}`}
              className="flex justify-between gap-3 text-sm"
            >
              <span>
                {cartItem.quantity} x {cartItem.name}
              </span>
              <span className="font-semibold">
                {formatCurrency(cartItem.price * cartItem.quantity)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderItemsCard;
