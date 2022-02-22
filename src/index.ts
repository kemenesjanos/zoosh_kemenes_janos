import { Movie } from "../src/Model/Movie";
import { SearchMoviesByTitle } from "./Logic/SearchMovieByTitle";
import { GetMovieByID, GetWikiSummery } from "./Logic/DetailMovieByID"

// SearchMoviesByTitle("karate").then((res?) => {
//   if (res?.length != 0) {
//       let structDatas: {title:string, id: string, category?: string, score?: number}[] = [];
//     res?.forEach((movie: Movie) => {
//         structDatas.push({title: movie.title, id: movie.id, category: movie.category, score: movie.score})
//     });
//     console.table(structDatas);
//   } else {
//     console.log("No movies found!");
//   }
// });

GetMovieByID("158496").then((res?) => {
      console.log(res?.title);
});

GetWikiSummery("The Karate Kid").then( (res: string | undefined) => { console.log(res)});



// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// readline.question("Who are you?", (name: any) => {
//   console.log(`Hey there ${name}!`);
//   readline.close();
// });
