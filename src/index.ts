import { Movie } from "../src/Model/Movie";
import { SearchMoviesByTitle } from "./Logic/SearchMovieByTitle";
import { GetSimilarMoviesByID } from "./Logic/GetSimilarMoviesByID";
import { GetDetailMovieByID } from "./Logic/DetailMovieByID";
import PromptSync from "prompt-sync";

const prompt = PromptSync({ sigint: true });

console.clear();

(async function () {
  while (true) {
    console.log(
      "\n\t1 - Search movies by title. \n\t2 - Movie details by ID. \n\t3 - Get related movies by ID. \n\nEnter the selected number:"
    );
    const answer1 = prompt("");

    switch (Number(answer1)) {
      case 1:
        await ConsoleSearchMoviesByTitle();
        break;
      case 2:
        await ConsoleMovieDetailsByID();
        break;
      case 3:
        await ConsoleGetRelatedMoviesByID();
        break;
      default:
        console.clear();
        console.log("Wrong input!");
        break;
    }
  }
})();

async function ConsoleSearchMoviesByTitle() {
  console.clear();
  const answer = prompt("Enter the movie title: ");

  await SearchMoviesByTitle(answer).then((res?) => {
    if (res?.length != 0) {
      let structDatas: {
        title: string;
        id: string;
        category?: string;
        score?: number;
      }[] = [];
      res?.forEach((movie: Movie) => {
        structDatas.push({
          title: movie.title,
          id: movie.id,
          category: movie.category,
          score: movie.score,
        });
      });
      console.table(structDatas);
    } else {
      console.log("No movies found!");
    }
  });
}

async function ConsoleMovieDetailsByID() {
  const answer = prompt("Enter the movie ID: ");

  if (!isNaN(Number(answer))) {
    await GetDetailMovieByID(answer).then((res?) => {
      if (res) {
        console.log("-------------------------------------------------");
        console.log("\n\nDescription\n");
        console.log(res.sum + "\n\n");
        console.log("\tWikipedia link: " + res.wikiLink + "\n");
        console.log("\tIMDB link: " + res.imdbLink);
      }
    });
  } else {
    console.clear();
    console.log("Wrong input!");
  }
}
async function ConsoleGetRelatedMoviesByID() {
  const answer = prompt("Enter the movie ID: ");

  if (!isNaN(Number(answer))) {
    await GetSimilarMoviesByID(answer).then((res: Movie[] | undefined) => {
      if (res && res.length != 0) {
        let structDatas: { title: string; id: string }[] = [];
        res?.forEach((movie: Movie) => {
          structDatas.push({ title: movie.title, id: movie.id });
        });
        console.table(structDatas);
      } else {
        console.log("No similar movies found!");
      }
    });
  } else {
    console.clear();
    console.log("Wrong input!");
  }
}
