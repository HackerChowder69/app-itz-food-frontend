import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { CartItem, Order, UpdateUser } from "@/api/types";
import { useAppAuth } from "@/auth/useAppAuth";
import { toast } from "@/components/ui/toast";
import { apiBaseUrl, authSetupMessage } from "@/config/env";

type CreateCheckoutSessionRequest = {
  cartItems: CartItem[];
  deliveryDetails: UpdateUser;
  restaurantId: string;
};

type CreateCheckoutSessionResponse = {
  orderId: string;
  sessionId?: string;
  url: string;
};

const buildApiUrl = (path: string) => `${apiBaseUrl}${path}`;

export function useCreateCheckoutSession() {
  const { getAccessTokenSilently, isAuthConfigured } = useAppAuth();
  const queryClient = useQueryClient();

  return useMutation<
    CreateCheckoutSessionResponse,
    Error,
    CreateCheckoutSessionRequest
  >({
    mutationFn: async (checkoutSessionRequest) => {
      if (!isAuthConfigured) {
        throw new Error(authSetupMessage);
      }

      const accessToken = await getAccessTokenSilently();
      const response = await fetch(
        buildApiUrl("/api/order/checkout/create-checkout-session"),
        {
          body: JSON.stringify(checkoutSessionRequest),
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );

      if (!response.ok) {
        const data = (await response.json().catch(() => undefined)) as
          | { message?: string }
          | undefined;

        throw new Error(data?.message || "No se pudo crear la orden");
      }

      return (await response.json()) as CreateCheckoutSessionResponse;
    },
    onError: (error) => {
      toast.error(error.message || "No se pudo crear la orden.");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useGetOrders() {
  const { getAccessTokenSilently, isAuthenticated, isAuthConfigured } =
    useAppAuth();

  return useQuery<Order[], Error>({
    enabled: isAuthConfigured && isAuthenticated,
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(buildApiUrl("/api/order"), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("No se pudieron obtener las ordenes");
      }

      return (await response.json()) as Order[];
    },
    queryKey: ["orders"],
  });
}

export function useGetRestaurantOrders() {
  const { getAccessTokenSilently, isAuthenticated, isAuthConfigured } =
    useAppAuth();

  return useQuery<Order[], Error>({
    enabled: isAuthConfigured && isAuthenticated,
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(buildApiUrl("/api/order/restaurant"), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("No se pudieron obtener las ordenes del restaurante");
      }

      return (await response.json()) as Order[];
    },
    queryKey: ["restaurantOrders"],
  });
}
