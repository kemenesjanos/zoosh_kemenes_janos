import { Movie } from "../Model/Movie";
const fetch = require("node-fetch");
var express = require("express");

export async function SearchMoviesByID(title: string): Promise<Movie[] | undefined> {
  const searchMoviesQuery =
    `
    query SearchMovies {
      searchMovies(query: "` +
    title +
    `") {
          id
          score
          genres{name}
          name
        }
      }
      `;

  try {
    let res = await fetch("https://tmdb.sandbox.zoosh.ie/dev/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        query: searchMoviesQuery,
      }),
    });
    let resText = await res.text();
    let data = JSON.parse(resText).data.searchMovies;

    let movies: Movie[] = [];

    data.forEach(
      (movie: {
        id: string;
        name: string;
        genres: { name: string };
        score: number;
      }) => {
        movies.push(
          new Movie(movie.id, movie.name, movie.genres.name, movie.score)
        );
      }
    );

    return movies;
  } catch (error) {
    console.log("An error occured during the search. Check your internet connection!");
  }
}
