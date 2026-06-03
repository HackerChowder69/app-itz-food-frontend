import { LoaderCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";

import { useCreateUser } from "@/api/UserApi";
import { useAppAuth } from "@/auth/useAppAuth";
import { authSetupMessage } from "@/config/env";

export default function AuthCallBackPage() {
  const navigate = useNavigate();
  const { isAuthConfigured, user } = useAppAuth();
  const hasCreatedUser = useRef(false);
  const { error, mutateAsync } = useCreateUser();

  useEffect(() => {
    const syncUser = async () => {
      if (!user?.sub || !user.email || hasCreatedUser.current) {
        return;
      }

      hasCreatedUser.current = true;
      await mutateAsync({
        auth0Id: user.sub,
        email: user.email,
        name: user.name,
      });
      navigate("/");
    };

    void syncUser();
  }, [mutateAsync, navigate, user]);

  if (!isAuthConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-lg rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center">
          <p className="text-lg font-semibold text-amber-800">
            Auth0 esta pendiente de configuracion
          </p>
          <p className="mt-3 text-sm text-amber-700">{authSetupMessage}</p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-full bg-amber-500 px-5 py-2 text-sm font-medium text-white hover:bg-amber-600"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-md rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-lg font-semibold text-red-700">
            No se pudo completar el inicio de sesion
          </p>
          <p className="mt-3 text-sm text-red-600">
            {(error as Error).message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="rounded-3xl border border-orange-200 bg-white px-8 py-10 text-center shadow-lg shadow-orange-100">
        <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-orange-500" />
        <p className="mt-4 text-lg font-semibold text-slate-900">
          Preparando tu sesion
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Estamos registrando tu usuario y validando el acceso al backend.
        </p>
      </div>
    </div>
  );
}
