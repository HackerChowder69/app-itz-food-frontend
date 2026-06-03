import { useLocation } from "react-router";

import type { UpdateUser } from "@/api/types";
import { useGetUser } from "@/api/UserApi";
import { useAppAuth } from "@/auth/useAppAuth";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserProfileForm, {
  type UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";

type CheckOutButtonProps = {
  disabled?: boolean;
  isLoading?: boolean;
  onCheckout: (userFormData: UserFormData) => Promise<unknown> | unknown;
};

function CheckOutButton({
  disabled = false,
  isLoading = false,
  onCheckout,
}: CheckOutButtonProps) {
  const { pathname } = useLocation();
  const {
    isAuthenticated,
    isAuthConfigured,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAppAuth();
  const {
    data: getUser,
    error: getUserError,
    isError: hasGetUserError,
    isLoading: isGetUserLoading,
    refetch: refetchUser,
  } = useGetUser();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  const handleCheckout = async (userProfileData: UpdateUser) => {
    await onCheckout(userProfileData);
  };

  if (isAuthLoading) {
    return (
      <LoadingButton className="w-full" label="Validando sesion..." />
    );
  }

  if (!isAuthConfigured) {
    return (
      <Button className="w-full bg-orange-500 hover:bg-orange-500" disabled>
        Auth0 pendiente
      </Button>
    );
  }

  if (!isAuthenticated) {
    return (
      <Button
        className="w-full bg-orange-500 hover:bg-orange-600"
        onClick={() => void handleLogin()}
      >
        Iniciar sesion para pagar
      </Button>
    );
  }

  if (isGetUserLoading) {
    return (
      <LoadingButton className="w-full" label="Cargando perfil..." />
    );
  }

  if (hasGetUserError || !getUser) {
    return (
      <div className="space-y-3 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <p>
          {getUserError?.message ||
            "No se pudo cargar tu perfil para confirmar la compra."}
        </p>
        <Button
          className="w-full bg-orange-500 text-white hover:bg-orange-600"
          onClick={() => void refetchUser()}
          type="button"
        >
          Reintentar perfil
        </Button>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger
        disabled={disabled}
        className="inline-flex h-10 w-full items-center justify-center rounded-md bg-orange-500 px-4 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:pointer-events-none disabled:opacity-50"
      >
        Confirmar compra
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-950">
            Confirma tus datos
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Revisa tu informacion de entrega antes de procesar la orden.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-5">
          <UserProfileForm
            currentUser={getUser}
            isLoading={isLoading}
            loadingLabel="Confirmando..."
            onSave={handleCheckout}
            submitLabel="Confirmar compra"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CheckOutButton;
