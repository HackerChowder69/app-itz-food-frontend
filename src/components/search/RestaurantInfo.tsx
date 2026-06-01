import { Dot } from "lucide-react";

import type { Restaurante } from "@/api/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type RestaurantInfoProps = {
  restaurant: Restaurante;
};

function RestaurantInfo({ restaurant }: RestaurantInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{restaurant.restauranteName}</CardTitle>
        <CardDescription>
          {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-1 text-sm font-medium text-slate-700">
          {restaurant.cuisines.map((cuisine, index) => (
            <span key={cuisine} className="inline-flex items-center">
              {cuisine}
              {index < restaurant.cuisines.length - 1 ? (
                <Dot className="size-4 text-orange-500" />
              ) : null}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default RestaurantInfo;
