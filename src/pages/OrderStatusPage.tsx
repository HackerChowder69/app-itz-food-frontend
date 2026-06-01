import { useGetOrders } from "@/api/OrderApi";
import type { Order } from "@/api/types";
import OrderStatusDetail from "@/components/orders/OrderStatusDetail";
import OrderStatusHeader from "@/components/orders/OrderStatusHeader";
import LoadingButton from "@/components/LoadingButton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const getOrderRestaurant = (order: Order) =>
  order.restaurant ?? order.restaurantSnapshot;

function OrderStatusPage() {
  const { data: orders, error, isLoading } = useGetOrders();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingButton label="Cargando ordenes..." />
      </div>
    );
  }

  if (error) {
    return (
      <section className="rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        {error.message}
      </section>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <section className="rounded-lg border bg-white p-6">
        <h1 className="text-2xl font-bold text-slate-950">Mis ordenes</h1>
        <p className="mt-2 text-sm text-slate-600">
          Todavia no tienes ordenes registradas.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">Mis ordenes</h1>
        <p className="mt-1 text-sm text-slate-600">
          Consulta el avance de tus pedidos.
        </p>
      </div>

      <div className="space-y-5">
        {orders.map((order) => {
          const restaurant = getOrderRestaurant(order);

          return (
            <article
              key={order._id}
              className="space-y-5 rounded-lg border bg-white p-5"
            >
              <OrderStatusHeader order={order} />
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
                <OrderStatusDetail order={order} />
                <AspectRatio ratio={16 / 9} className="rounded-lg bg-slate-100">
                  <img
                    src={restaurant.imageUrl}
                    alt={restaurant.restauranteName}
                    className="absolute inset-0 size-full object-cover"
                  />
                </AspectRatio>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default OrderStatusPage;
