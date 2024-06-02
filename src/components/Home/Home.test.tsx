import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { getShowById, getShows } from "../../api/shows";
import Home from "./Home";

const mockAxios = new MockAdapter(axios);

jest.mock("../../api/shows");

const mockResponse = [
  {
    score: 1.4290156,
    show: {
      id: 82,
      url: "https://www.tvmaze.com/shows/82/game-of-thrones",
      name: "Game of Thrones",
      type: "Scripted",
      language: "English",
      genres: ["Drama", "Adventure", "Fantasy"],
      status: "Ended",
      runtime: 60,
      averageRuntime: 61,
      premiered: "2011-04-17",
      ended: "2019-05-19",
      officialSite: "http://www.hbo.com/game-of-thrones",
      schedule: {
        time: "21:00",
        days: ["Sunday"],
      },
      rating: {
        average: 8.9,
      },
      weight: 99,
      network: {
        id: 8,
        name: "HBO",
        country: {
          name: "United States",
          code: "US",
          timezone: "America/New_York",
        },
        officialSite: "https://www.hbo.com/",
      },
      webChannel: null,
      dvdCountry: null,
      externals: {
        tvrage: 24493,
        thetvdb: 121361,
        imdb: "tt0944947",
      },
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/498/1245274.jpg",
        original:
          "https://static.tvmaze.com/uploads/images/original_untouched/498/1245274.jpg",
      },
      summary:
        "<p>Based on the bestselling book series <i>A Song of Ice and Fire</i> by George R.R. Martin, this sprawling new HBO drama is set in a world where summers span decades and winters can last a lifetime. From the scheming south and the savage eastern lands, to the frozen north and ancient Wall that protects the realm from the mysterious darkness beyond, the powerful families of the Seven Kingdoms are locked in a battle for the Iron Throne. This is a story of duplicity and treachery, nobility and honor, conquest and triumph. In the <b>Game of Thrones</b>, you either win or you die.</p>",
      updated: 1704792924,
      _links: {
        self: {
          href: "https://api.tvmaze.com/shows/82",
        },
        previousepisode: {
          href: "https://api.tvmaze.com/episodes/1623968",
          name: "The Iron Throne",
        },
      },
    },
  },
];

describe("Home", () => {
  beforeEach(() => {
    mockAxios.reset();
    (getShows as jest.Mock).mockResolvedValue(mockResponse);
    (getShowById as jest.Mock).mockResolvedValue(mockResponse[0].show);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should render the search input", () => {
    act(() => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });

    const searchInput = screen.getByPlaceholderText("Search");
    expect(searchInput).toBeInTheDocument();
  });

  it("should call getShows with the search term after debounce delay", async () => {
    mockAxios
      .onGet("/api/shows?q=game%20of%20thrones")
      .reply(200, mockResponse);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "game of thrones" } });
    userEvent.type(searchInput, "game of thrones");

    // Advance timers by the debounce delay
    act(() => {
      jest.advanceTimersByTime(500);
    });
    // Wait for the SearchResults component to be rendered
    const searchResults = await waitFor(() =>
      screen.getByText(/1 results for "game of thrones/i)
    );
    expect(searchResults).toBeInTheDocument();
    expect(getShows).toHaveBeenCalledWith("game of thrones");
  });

  it("should render ShowDetails component when showId is present in the URL", () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={["/shows/1"]}>
          <Routes>
            <Route path="/shows/:showId" element={<Home />} />
          </Routes>
        </MemoryRouter>
      );
    });

    const showDetails = screen.getByRole("dialog");
    expect(showDetails).toBeInTheDocument();
  });
});
