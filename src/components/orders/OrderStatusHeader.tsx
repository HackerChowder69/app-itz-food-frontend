import type { Order, OrderStatusInfo } from "@/api/types";
import { Progress } from "@/components/ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type OrderStatusHeaderProps = {
  order: Order;
};

const getOrderRestaurant = (order: Order) =>
  order.restaurant ?? order.restaurantSnapshot;

const getExpectedDelivery = (order: Order) => {
  const restaurant = getOrderRestaurant(order);
  const createdAt = new Date(order.createdAt);
  const expectedDelivery = new Date(createdAt);

  expectedDelivery.setMinutes(
    createdAt.getMinutes() + restaurant.estimatedDeliveryTime
  );

  const hours = String(expectedDelivery.getHours()).padStart(2, "0");
  const minutes = String(expectedDelivery.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

const getOrderStatusInfo = (order: Order): OrderStatusInfo =>
  ORDER_STATUS.find((status) => status.value === order.status) ??
  ORDER_STATUS[0];

function OrderStatusHeader({ order }: OrderStatusHeaderProps) {
  const statusInfo = getOrderStatusInfo(order);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-orange-600">
            Estado de la orden
          </p>
          <h2 className="text-2xl font-bold text-slate-950">
            {statusInfo.label}
          </h2>
        </div>
        <div className="text-sm text-slate-700 sm:text-right">
          <p className="font-semibold text-slate-950">Entrega estimada</p>
          <p>{getExpectedDelivery(order)}</p>
        </div>
      </div>
      <Progress value={statusInfo.progressValue} />
    </div>
  );
}

export default OrderStatusHeader;
