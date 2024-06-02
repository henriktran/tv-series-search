import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ShowSearchResult } from "../../types/show";
import SearchResults from "./SearchResults";

const mockShowList: ShowSearchResult[] = [
  {
    score: 1.2047658,
    show: {
      id: 169,
      url: "https://www.tvmaze.com/shows/169/breaking-bad",
      name: "Breaking Bad",
      type: "Scripted",
      language: "English",
      genres: ["Drama", "Crime", "Thriller"],
      status: "Ended",
      runtime: 60,
      averageRuntime: 60,
      premiered: "2008-01-20",
      ended: "2019-10-11",
      officialSite: "http://www.amc.com/shows/breaking-bad",
      schedule: {
        time: "22:00",
        days: ["Sunday"],
      },
      rating: {
        average: 9.2,
      },
      weight: 99,
      network: {
        id: 20,
        name: "AMC",
        country: {
          name: "United States",
          code: "US",
          timezone: "America/New_York",
        },
        officialSite: null,
      },
      webChannel: {
        id: 0,
        name: "",
        country: "",
        officialSite: "",
      },
      dvdCountry: null,
      externals: {
        tvrage: 18164,
        thetvdb: 81189,
        imdb: "tt0903747",
      },
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/501/1253519.jpg",
        original:
          "https://static.tvmaze.com/uploads/images/original_untouched/501/1253519.jpg",
      },
      summary:
        "<p><b>Breaking Bad</b> follows protagonist Walter White, a chemistry teacher who lives in New Mexico with his wife and teenage son who has cerebral palsy. White is diagnosed with Stage III cancer and given a prognosis of two years left to live. With a new sense of fearlessness based on his medical prognosis, and a desire to secure his family's financial security, White chooses to enter a dangerous world of drugs and crime and ascends to power in this world. The series explores how a fatal diagnosis such as White's releases a typical man from the daily concerns and constraints of normal society and follows his transformation from mild family man to a kingpin of the drug trade.</p>",
      updated: 1717045985,
      _links: {
        self: {
          href: "https://api.tvmaze.com/shows/169",
        },
        previousepisode: {
          href: "https://api.tvmaze.com/episodes/2007806",
          name: "El Camino: A Breaking Bad Movie",
        },
      },
    },
  },
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

describe("SearchResults", () => {
  it("should render the correct number of results", () => {
    render(
      <MemoryRouter>
        <SearchResults showList={mockShowList} query="test" />
      </MemoryRouter>
    );

    const resultsText = screen.getByText(/2 results for "test"/i);
    expect(resultsText).toBeInTheDocument();
  });

  it("should render show cards with correct names and images", () => {
    render(
      <MemoryRouter>
        <SearchResults showList={mockShowList} query="test" />
      </MemoryRouter>
    );

    const breakingBadCard = screen.getByText("Breaking Bad");
    const gameOfThronesCard = screen.getByText("Game of Thrones");

    expect(breakingBadCard).toBeInTheDocument();
    expect(gameOfThronesCard).toBeInTheDocument();

    const breakingBadImage = screen.getByAltText("Breaking Bad");
    const gameOfThronesImage = screen.getByAltText("Game of Thrones");

    expect(breakingBadImage).toHaveAttribute(
      "src",
      "https://static.tvmaze.com/uploads/images/medium_portrait/501/1253519.jpg"
    );
    expect(gameOfThronesImage).toHaveAttribute(
      "src",
      "https://static.tvmaze.com/uploads/images/medium_portrait/498/1245274.jpg"
    );
  });
});
