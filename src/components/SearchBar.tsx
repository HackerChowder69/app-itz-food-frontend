import type { FormEvent } from "react";
import { useEffect, useState } from "react";

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  defaultValue?: string;
  placeholder?: string;
  onReset?: () => void;
  onSubmit: (searchQuery: string) => void;
};

function SearchBar({
  defaultValue = "",
  onReset,
  onSubmit,
  placeholder = "Buscar por ciudad",
}: Props) {
  const [searchQuery, setSearchQuery] = useState(defaultValue);
  const [error, setError] = useState("");

  useEffect(() => {
    setSearchQuery(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedSearchQuery = searchQuery.trim();

    if (!trimmedSearchQuery) {
      setError("Escribe una ciudad para buscar.");
      return;
    }

    setError("");
    onSubmit(trimmedSearchQuery);
  };

  const handleReset = () => {
    setSearchQuery("");
    setError("");
    onReset?.();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex min-h-10 w-full items-stretch overflow-hidden rounded-md border bg-white focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100">
        <Input
          aria-label="Buscar restaurantes"
          className="h-auto rounded-none border-0 focus:border-0 focus:ring-0"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        {searchQuery ? (
          <button
            type="button"
            aria-label="Limpiar busqueda"
            className="flex w-10 shrink-0 items-center justify-center text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            onClick={handleReset}
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
        <Button
          type="submit"
          className="rounded-none bg-orange-500 px-4 text-white hover:bg-orange-600"
        >
          <Search className="h-4 w-4" />
          Buscar
        </Button>
      </div>
      {error ? <p className="mt-2 text-sm font-medium text-red-600">{error}</p> : null}
    </form>
  );
}

export default SearchBar;
