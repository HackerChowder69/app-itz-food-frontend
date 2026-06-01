import { useQuery } from "@tanstack/react-query";

import { apiBaseUrl } from "@/config/env";

import type { Restaurante, RestaurantSearchResponse } from "./types";

type SearchRestauranteParams = {
  city: string;
  searchQuery?: string;
  selectedCuisines?: string[];
  page?: number;
};

const buildApiUrl = (path: string) => `${apiBaseUrl}${path}`;

const buildSearchPath = ({
  city,
  page,
  searchQuery,
  selectedCuisines,
}: SearchRestauranteParams) => {
  const params = new URLSearchParams();

  if (searchQuery) {
    params.set("searchQuery", searchQuery);
  }

  if (selectedCuisines && selectedCuisines.length > 0) {
    params.set("selectedCuisines", selectedCuisines.join(","));
  }

  if (page && page > 1) {
    params.set("page", String(page));
  }

  const queryString = params.toString();
  const path = `/api/restaurante/search/${encodeURIComponent(city)}`;

  return queryString ? `${path}?${queryString}` : path;
};

export const searchRestaurantes = async (
  params: SearchRestauranteParams
): Promise<RestaurantSearchResponse> => {
  const response = await fetch(buildApiUrl(buildSearchPath(params)));

  if (!response.ok) {
    throw new Error("No se pudo realizar la busqueda");
  }

  return (await response.json()) as RestaurantSearchResponse;
};

export const getRestaurantById = async (
  restaurantId: string
): Promise<Restaurante> => {
  const response = await fetch(
    buildApiUrl(`/api/restaurante/${encodeURIComponent(restaurantId)}`)
  );

  if (!response.ok) {
    throw new Error("No se pudo obtener el restaurante");
  }

  return (await response.json()) as Restaurante;
};

export function useSearchRestaurantes(params: SearchRestauranteParams) {
  return useQuery<RestaurantSearchResponse, Error>({
    enabled: Boolean(params.city.trim()),
    queryFn: () => searchRestaurantes(params),
    queryKey: [
      "searchRestaurantes",
      params.city,
      params.searchQuery ?? "",
      params.selectedCuisines?.join(",") ?? "",
      params.page ?? 1,
    ],
  });
}

export function useGetRestaurantById(restaurantId?: string) {
  const trimmedRestaurantId = restaurantId?.trim() ?? "";

  return useQuery<Restaurante, Error>({
    enabled: Boolean(trimmedRestaurantId),
    queryFn: () => getRestaurantById(trimmedRestaurantId),
    queryKey: ["getRestaurantById", trimmedRestaurantId],
  });
}
