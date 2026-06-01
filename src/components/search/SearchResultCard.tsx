import { Clock, DollarSign, MapPin, Utensils } from "lucide-react";
import { Link } from "react-router";

import type { Restaurante } from "@/api/types";
import { Card, CardContent } from "@/components/ui/card";

type SearchResultCardProps = {
  restaurante: Restaurante;
};

const getIdValue = (value: Restaurante["_id"]) =>
  typeof value === "string" ? value : value?.$oid;

function SearchResultCard({ restaurante }: SearchResultCardProps) {
  const restaurantId = getIdValue(restaurante._id) ?? restaurante.user;

  return (
    <Link to={`/detail/${encodeURIComponent(restaurantId)}`}>
      <Card className="overflow-hidden transition hover:border-orange-200 hover:shadow-md">
        <img
          src={restaurante.imageUrl}
          alt={restaurante.restauranteName}
          className="h-40 w-full object-cover"
        />
        <CardContent className="space-y-4 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {restaurante.restauranteName}
              </h2>
              <p className="mt-1 flex items-center gap-1 text-sm text-slate-600">
                <MapPin className="h-4 w-4 text-orange-500" />
                {restaurante.city}, {restaurante.country}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {restaurante.cuisines.map((cuisine) => (
                <span
                  key={cuisine}
                  className="rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700"
                >
                  {cuisine}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
            <p className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-slate-500" />
              Envio: ${restaurante.deliveryPrice}
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-500" />
              {restaurante.estimatedDeliveryTime} min
            </p>
            <p className="flex items-center gap-2 font-semibold text-orange-600">
              <Utensils className="h-4 w-4" />
              Ver menu
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {restaurante.menuItems.slice(0, 4).map((item) => (
              <div
                key={`${restaurante.restauranteName}-${item.name}`}
                className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2 text-sm"
              >
                <span className="text-slate-700">{item.name}</span>
                <span className="font-semibold text-slate-900">
                  ${item.price}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default SearchResultCard;
