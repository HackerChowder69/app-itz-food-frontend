import { useEffect, useState } from "react";

import { useAppAuth } from "@/auth/useAppAuth";
import { apiBaseUrl, authSetupMessage } from "@/config/env";
import { cn } from "@/lib/utils";

type HealthResponse = {
  message: string;
  services?: {
    auth0?: string;
    cloudinary?: string;
    database?: string;
  };
};

const HEALTH_URL = apiBaseUrl ? `${apiBaseUrl}/health` : "/health";

function Home() {
  const { error, isAuthenticated, isAuthConfigured, user } =
    useAppAuth();
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    fetch(HEALTH_URL)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Health check failed");
        }
        return (await res.json()) as HealthResponse;
      })
      .then((data) => {
        if (!isMounted) {
          return;
        }

        setHealth(data);
        setStatus("ok");
        setMessage(data.message ?? "Servidor OK");
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setStatus("error");
        setMessage("No se pudo conectar con el backend");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <section id="estado" className="rounded-lg border bg-white p-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Estado del backend
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Esta seccion confirma la conexion con el servidor y los servicios del
          proyecto.
        </p>

        <div className="mt-4 flex items-center gap-3 text-sm">
          <span
            className={cn(
              "h-3 w-3 rounded-full",
              status === "ok"
                ? "bg-emerald-500"
                : status === "error"
                  ? "bg-red-500"
                  : "bg-amber-500"
            )}
          />
          <span>{status === "loading" ? "Conectando..." : message}</span>
        </div>

        {health?.services ? (
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-md border bg-slate-50 p-4 text-sm">
              <p className="font-medium text-slate-900">Base de datos</p>
              <p className="mt-1 text-slate-600">
                {health.services.database ?? "unknown"}
              </p>
            </div>
            <div className="rounded-md border bg-slate-50 p-4 text-sm">
              <p className="font-medium text-slate-900">Auth0 backend</p>
              <p className="mt-1 text-slate-600">
                {health.services.auth0 ?? "unknown"}
              </p>
            </div>
            <div className="rounded-md border bg-slate-50 p-4 text-sm">
              <p className="font-medium text-slate-900">Cloudinary</p>
              <p className="mt-1 text-slate-600">
                {health.services.cloudinary ?? "unknown"}
              </p>
            </div>
          </div>
        ) : null}
      </section>

      <section className="rounded-lg border bg-white p-6">
        <h2 className="text-2xl font-semibold text-slate-900">Sesion</h2>
        {!isAuthConfigured ? (
          <p className="mt-2 text-sm text-amber-800">{authSetupMessage}</p>
        ) : isAuthenticated ? (
          <p className="mt-2 text-sm text-slate-600">
            Sesion iniciada con <span className="font-medium">{user?.email}</span>
          </p>
        ) : (
          <p className="mt-2 text-sm text-slate-600">
            Aun no has iniciado sesion.
          </p>
        )}

        {error ? (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            Error de Auth0: {error}
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default Home;
