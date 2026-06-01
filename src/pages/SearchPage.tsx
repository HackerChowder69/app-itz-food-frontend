import { useNavigate, useParams } from "react-router";

import { useSearchRestaurantes } from "@/api/RestaurantApi";
import SearchBar from "@/components/SearchBar";
import SearchResultCard from "@/components/search/SearchResultCard";

function SearchPage() {
  const navigate = useNavigate();
  const { city = "" } = useParams();
  const searchCity = city.trim();
  const { data, error, isLoading } = useSearchRestaurantes({
    city: searchCity,
  });

  const handleSearchSubmit = (searchQuery: string) => {
    navigate(`/search/${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="space-y-6">
      <SearchBar
        defaultValue={searchCity}
        placeholder="Buscar otra ciudad"
        onSubmit={handleSearchSubmit}
      />

      <section className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Restaurantes en {searchCity}
          </h1>
          {data ? (
            <p className="mt-1 text-sm text-slate-600">
              {data.pagination.total} resultado(s) encontrado(s)
            </p>
          ) : null}
        </div>

        {isLoading ? (
          <div className="rounded-lg border bg-white p-6 text-sm text-slate-600">
            Cargando resultados...
          </div>
        ) : null}

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error.message}
          </div>
        ) : null}

        {!isLoading && data?.data.length === 0 ? (
          <div className="rounded-lg border bg-white p-6 text-sm text-slate-600">
            No se encontraron restaurantes.
          </div>
        ) : null}

        <div className="grid gap-4">
          {data?.data.map((restaurante) => (
            <SearchResultCard
              key={`${restaurante.user}-${restaurante.restauranteName}`}
              restaurante={restaurante}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default SearchPage;
