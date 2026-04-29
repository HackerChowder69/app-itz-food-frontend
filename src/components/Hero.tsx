import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import foodHero from "@/assets/food-hero.png";
import { useAppAuth } from "@/auth/useAppAuth";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { authSetupMessage } from "@/config/env";
import { cn } from "@/lib/utils";

function Hero() {
  const { isAuthenticated, isAuthConfigured, loginWithRedirect } = useAppAuth();

  return (
    <section className="mb-8 rounded-lg border bg-white p-6">
      <div className="grid items-center gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-sm font-semibold text-orange-600">FoodApp 4.1</p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Proteccion de rutas y backend listo para despliegue
          </h1>
          <p className="text-sm leading-6 text-slate-600">
            Rutas protegidas para el perfil, logs del servidor con Morgan y
            endpoint health para monitoreo del backend.
          </p>

          <div className="flex flex-wrap gap-3">
            {isAuthenticated ? (
              <Link
                to="/user-profile"
                className={cn(
                  buttonVariants(),
                  "bg-orange-500 text-white hover:bg-orange-600"
                )}
              >
                Ir a mi perfil
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : isAuthConfigured ? (
              <Button
                className="bg-orange-500 text-white hover:bg-orange-600"
                onClick={() => void loginWithRedirect()}
              >
                Iniciar sesion
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <div className="max-w-md rounded-md border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800">
                {authSetupMessage}
              </div>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border bg-slate-50">
          <img
            src={foodHero}
            alt="Aplicacion de comida"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
