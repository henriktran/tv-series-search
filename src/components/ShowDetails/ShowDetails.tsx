import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useOnClickOutside, useScrollLock } from "usehooks-ts";
import { getShowById } from "../../api/shows";
import { Show } from "../../types/show";
import "./ShowDetails.scss";

interface ShowDetailsProps {
  showId: string;
}

const ShowDetails: React.FC<ShowDetailsProps> = ({ showId }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [show, setShow] = useState<Show>();

  const handleCloseDialog = useCallback(() => {
    navigate("/");
  }, [navigate]);

  useScrollLock();
  useOnClickOutside(containerRef, handleCloseDialog);

  const getSummaryText = (summary: string) => {
    const parser = new DOMParser();
    const document = parser.parseFromString(summary, "text/html");
    return document?.documentElement?.textContent;
  };

  useEffect(() => {
    getShowById(showId).then((showResponse) => {
      setShow(showResponse);
    });
  }, [showId]);

  // close if esc key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseDialog();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [handleCloseDialog]);

  return (
    <div className="backdrop">
      <dialog
        className="show-details"
        ref={containerRef}
        open
        onClose={handleCloseDialog}
      >
        {show && (
          <>
            <header>
              <span className="image-container">
                {show?.image?.original ? (
                  <img src={show?.image?.original} alt={show?.name} />
                ) : (
                  <span className="no-image" />
                )}
              </span>
              <h2>{show.name}</h2>
              <button className="close" onClick={handleCloseDialog}></button>
            </header>
            <div className="content-body">
              {show.genres && <p>{show.genres.join(", ")}</p>}
              <div className="data">
                {show.averageRuntime && (
                  <p className="chip">~{show.averageRuntime} min / episode</p>
                )}
                {show.rating.average && (
                  <p className="chip">{show.rating.average} / 10</p>
                )}
                {show?.premiered && <p>Premiered: {show?.premiered}</p>}
              </div>
              {show.summary && <p>{getSummaryText(show.summary)}</p>}
            </div>
          </>
        )}
      </dialog>
    </div>
  );
};

export default ShowDetails;
