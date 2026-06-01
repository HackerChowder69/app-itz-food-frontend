import type { OrderStatusInfo } from "@/api/types";

export const ORDER_STATUS: OrderStatusInfo[] = [
  {
    label: "Orden recibida",
    progressValue: 25,
    value: "placed",
  },
  {
    label: "Pago confirmado",
    progressValue: 40,
    value: "paid",
  },
  {
    label: "En preparacion",
    progressValue: 60,
    value: "inProgress",
  },
  {
    label: "En camino",
    progressValue: 80,
    value: "outForDelivery",
  },
  {
    label: "Entregada",
    progressValue: 100,
    value: "delivered",
  },
];
