import { useNavigate } from "react-router";

import SearchBar from "@/components/SearchBar";

function Home() {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchQuery: string) => {
    navigate(`/search/${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="space-y-6">
      <SearchBar onSubmit={handleSearchSubmit} />
    </div>
  );
}

export default Home;
