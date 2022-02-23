import { Movie } from "../src/Model/Movie";
import { SearchMoviesByTitle } from "./Logic/SearchMovieByTitle";
import { GetLinks } from "./Logic/DetailMovieByID";
import { GetSimilarMoviesByID } from "./Logic/GetSimilarMoviesByID"

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

//GetWikiSummery("Harry Potter").then( (res: {sum: string, wikiLink: string, imdbLink: string} | undefined) => { res? console.log(res.sum): console.log("Movie article not found!")});

GetSimilarMoviesByID("10734").then((res: Movie[] | undefined) => {
    console.log(res ? res[0].title : "alma");
})

// GetLinks("Harry Potter").then(  
//   (res: { imdbLink: string; wikiLink: string } | undefined) => {
//     console.log(res?.imdbLink);
//   }
// );

// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// readline.question("Who are you?", (name: any) => {
//   console.log(`Hey there ${name}!`);
//   readline.close();
// });
