import { Movie } from "../Model/Movie";
const fetch = require("node-fetch");

export async function GetSimilarMoviesByID(
  ID: string
): Promise<Movie[] | undefined> {
  const getSimilarMoviesQuery =
    `
      query getMovie {
        movie(id: ` +
    ID +
    `) {similar{name, id}}}
        `;

  try {
    let res = await fetch("https://tmdb.sandbox.zoosh.ie/dev/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        query: getSimilarMoviesQuery,
      }),
    });
    let resText = await res.text();
    let data = JSON.parse(resText);

    let similars: {name: string, id: string}[] = data.data.movie.similar;

    let movies: Movie[] = [];
    similars.forEach(e => {
        movies.push(new Movie(e.id,e.name));
    });

    return movies;
  } catch (error) {
    console.log(
      "An error occured during the search. Check your internet connection!"
    );
    throw error;
  }
}
