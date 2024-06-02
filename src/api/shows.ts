import axios from "axios";
import { Show, ShowSearchResult } from "../types/show";

export const getShows = async (query: string): Promise<ShowSearchResult[]> => {
  try {
    const { data } = await axios.get("search/shows?q=" + query);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios error
      console.error("Axios error:", error.message);
      return [];
    } else {
      // Handle other errors
      console.error("Error:", error);
      return [];
    }
  }
};

export const getShowById = async (id: string): Promise<Show> => {
  const { data } = await axios.get("/shows/" + id);
  return data;
};
