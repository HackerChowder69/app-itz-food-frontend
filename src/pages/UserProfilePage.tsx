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
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-amber-200 bg-amber-50 p-8 shadow-xl shadow-amber-100/40">
        <h1 className="text-3xl font-semibold text-amber-900">
          Auth0 pendiente de configuracion
        </h1>
        <p className="mt-3 text-sm text-amber-800">{authSetupMessage}</p>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-orange-100 bg-white p-8 shadow-xl shadow-orange-100/40">
        <h1 className="text-3xl font-semibold text-slate-900">
          Perfil de usuario
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Necesitas iniciar sesion para completar tus datos y sincronizarlos con
          el backend.
        </p>
        <Button
          className="mt-6 bg-orange-500 text-white hover:bg-orange-600"
          onClick={() => void loginWithRedirect()}
        >
          Iniciar sesion
        </Button>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="rounded-lg border bg-white p-6">
        <h1 className="text-3xl font-semibold text-slate-900">
          Perfil de usuario
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Aqui puedes consultar y actualizar los datos del usuario autenticado.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-md border bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-medium text-slate-900">Correo</p>
            <p className="mt-1">{currentUser?.email ?? user?.email ?? "Sin correo"}</p>
          </div>
          <div className="rounded-md border bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-medium text-slate-900">Auth0 ID</p>
            <p className="mt-1 break-all text-xs">
              {currentUser?.auth0Id ?? user?.sub ?? "Sin identificador"}
            </p>
          </div>
        </div>
      </div>

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
