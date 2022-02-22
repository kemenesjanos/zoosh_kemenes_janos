import { Movie } from "../src/Model/Movie";
import { SearchMoviesByID } from "./Logic/SearchMovieByID";

SearchMoviesByID("karate").then((res?) => {
  if (res?.length != 0) {
    res?.forEach((movie: Movie) => {
      console.log(movie.title);
    });
  } else {
    console.log("No movies found!");
  }
});

// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// readline.question("Who are you?", (name: any) => {
//   console.log(`Hey there ${name}!`);
//   readline.close();
// });
