import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAppAuth } from "@/auth/useAppAuth";
import { toast } from "@/components/ui/toast";
import { apiBaseUrl, authSetupMessage } from "@/config/env";

import type { BackEndUser, UpdateUser, User } from "./types";

const buildApiUrl = (path: string) => `${apiBaseUrl}${path}`;

type CreateUserRequest = Pick<User, "auth0Id" | "email"> & {
  name?: string;
};

const getApiErrorMessage = async (response: Response, fallback: string) => {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const data = (await response.json().catch(() => undefined)) as
      | { message?: string }
      | undefined;

    return data?.message || fallback;
  }

  const text = await response.text().catch(() => "");
  return text || fallback;
};

export function useCreateUser() {
  const { getAccessTokenSilently, isAuthConfigured } = useAppAuth();
  const queryClient = useQueryClient();

  return useMutation<User, Error, CreateUserRequest>({
    mutationFn: async (user) => {
      if (!isAuthConfigured) {
        throw new Error(authSetupMessage);
      }

      const accessToken = await getAccessTokenSilently();
      const response = await fetch(buildApiUrl("/api/user"), {
        body: JSON.stringify(user),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(
          await getApiErrorMessage(response, "Error al crear el usuario")
        );
      }

      return (await response.json()) as User;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      toast.error(error.message || "Error al crear el usuario.");
    },
  });
}

export function useGetUser() {
  const { getAccessTokenSilently, isAuthenticated, isAuthConfigured } =
    useAppAuth();

  return useQuery<BackEndUser, Error>({
    enabled: isAuthConfigured && isAuthenticated,
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(buildApiUrl("/api/user"), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          await getApiErrorMessage(response, "No se pudo recuperar el perfil")
        );
      }

      return (await response.json()) as BackEndUser;
    },
    queryKey: ["currentUser"],
    retry: false,
  });
}

export function useUpdateUser() {
  const { getAccessTokenSilently, isAuthConfigured } = useAppAuth();
  const queryClient = useQueryClient();

  return useMutation<BackEndUser, Error, UpdateUser>({
    mutationFn: async (formData: UpdateUser) => {
      if (!isAuthConfigured) {
        throw new Error(authSetupMessage);
      }

      const accessToken = await getAccessTokenSilently();
      const response = await fetch(buildApiUrl("/api/user"), {
        body: JSON.stringify(formData),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error(
          await getApiErrorMessage(response, "No se pudo actualizar el perfil")
        );
      }

      return (await response.json()) as BackEndUser;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Perfil actualizado correctamente.");
    },
    onError: (error) => {
      toast.error(error.message || "No se pudo actualizar el perfil.");
    },
  });
}

export const useGetCurrentUser = useGetUser;
export const useUpdateCurrentUser = useUpdateUser;
