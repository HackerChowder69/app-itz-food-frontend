import { useEffect } from "react";

import { useGetUser, useUpdateUser } from "@/api/UserApi";
import { useAppAuth } from "@/auth/useAppAuth";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { authSetupMessage } from "@/config/env";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

function UserProfilePage() {
  const { isAuthenticated, isAuthConfigured, isLoading, loginWithRedirect, user } =
    useAppAuth();
  const {
    data: currentUser,
    error: getUserError,
    isError: hasGetUserError,
    isLoading: isLoadingProfile,
  } = useGetUser();
  const {
    isPending,
    mutateAsync: updateUser,
  } = useUpdateUser();

  useEffect(() => {
    if (!hasGetUserError) {
      return;
    }

    toast.error(getUserError?.message || "No se pudieron cargar tus datos.");
  }, [getUserError, hasGetUserError]);

  if (isLoading || isLoadingProfile) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingButton />
      </div>
    );
  }

  if (!isAuthConfigured) {
    return (
      <section className="mx-auto max-w-[860px] rounded-lg border bg-amber-50 p-6">
        <h1 className="text-xl font-bold text-amber-900">
          Auth0 pendiente de configuracion
        </h1>
        <p className="mt-3 text-sm text-amber-800">{authSetupMessage}</p>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="mx-auto max-w-[860px] rounded-lg border bg-slate-50 p-6">
        <h1 className="text-xl font-bold text-slate-900">
          Perfil de usuario
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Necesitas iniciar sesion para completar tus datos y sincronizarlos con
          el backend.
        </p>
        <Button
          className="mt-6 h-9 rounded-md bg-orange-500 px-4 text-white hover:bg-orange-600"
          onClick={() => void loginWithRedirect()}
        >
          Iniciar sesion
        </Button>
      </section>
    );
  }

  return (
    <section className="py-4">
      <UserProfileForm
        key={currentUser?._id ?? user?.sub ?? "profile-form"}
        currentUser={currentUser}
        isLoading={isPending}
        onSave={updateUser}
      />
    </section>
  );
}

export default UserProfilePage;
