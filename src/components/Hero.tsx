import foodHero from "@/assets/food-hero.png";

function Hero() {
  return (
    <section className="mb-8 overflow-hidden rounded-lg border bg-white">
      <div className="grid items-center gap-6 p-6 md:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold leading-tight text-slate-950">
            Ordena tu comida favorita
          </h1>
          <p className="text-base leading-7 text-slate-600">
            Busca restaurantes por ciudad, elige del menu y confirma tu pedido
            en minutos.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg bg-slate-50">
          <img
            src={foodHero}
            alt="Comida preparada para ordenar"
            className="h-full min-h-64 w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
