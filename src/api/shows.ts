import axios from "axios";
import { Show, ShowSearchResult } from "../types/show";

export const getShows = async (query: string): Promise<ShowSearchResult[]> => {
  const { data } = await axios.get("search/shows?q=" + query);
  return data;
};

export const getShowById = async (id: string): Promise<Show> => {
  const { data } = await axios.get("/shows/" + id);
  return data;
};
