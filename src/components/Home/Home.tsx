import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDebounceValue } from "usehooks-ts";
import { getShows } from "../../api/shows";
import { ShowSearchResult } from "../../types/show";
import SearchResults from "../SearchResults/SearchResults";
import ShowDetails from "../ShowDetails/ShowDetails";
import "./Home.css";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { showId } = useParams();
  const [debouncedSearchTerm, setSearch] = useDebounceValue("", 500);
  const [showList, setShowList] = useState<ShowSearchResult[]>([]);

  useEffect(() => {
    if (!debouncedSearchTerm) return;
    getShows(debouncedSearchTerm).then((response) => {
      setShowList(response);
    });
  }, [debouncedSearchTerm]);

  return (
    <>
      <div className="show-grid">
        <label htmlFor="search">Search for TV series:</label>
        <input
          id="search"
          type="search"
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        {debouncedSearchTerm.length > 0 && (
          <SearchResults showList={showList} query={debouncedSearchTerm} />
        )}
        {showId && <ShowDetails showId={showId} />}
      </div>
    </>
  );
};

export default Home;
