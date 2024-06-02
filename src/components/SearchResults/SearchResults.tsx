import React from "react";
import { useNavigate } from "react-router-dom";
import { ShowSearchResult } from "../../types/show";
import "./SearchResults.scss";

interface SearchResultsProps {
  showList: ShowSearchResult[];
  query?: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ showList, query }) => {
  const navigate = useNavigate();

  const openShowDetails = (showId: number) => {
    navigate(`/${showId}`);
  };

  return (
    <>
      <h2>
        {showList.length} results for "{query}"
      </h2>
      <div className="search-results">
        {showList.map((showResult) => (
          <button
            key={showResult.show.id}
            className="show-card"
            onClick={() => {
              openShowDetails(showResult.show.id);
            }}
          >
            <span
              className={`image-container${
                !showResult.show.image ? " placeholder" : ""
              }`}
            >
              {showResult.show.image ? (
                <img
                  src={showResult.show.image.medium}
                  alt={showResult.show.name}
                />
              ) : (
                <span>{showResult.show.name[0]}</span>
              )}
            </span>
            {showResult.show.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default SearchResults;
