import { Movie } from "../Model/Movie";
const fetch = require("node-fetch");
var express = require("express");
var xml2js = require("xml2js");

export async function GetDetailMovieByID(
  ID: string
): Promise<{ sum: string; wikiLink: string; imdbLink: string } | undefined> {
  const movie = await GetMovieByID(ID);
  if (movie) {
    const sum = GetWikiSummery(movie?.title);
    let wikiLink =
      "https://en.wikipedia.org/wiki/" + movie?.title.replace(" ", "_");
  } else {
    return undefined;
  }
}

async function GetMovieByID(ID: string): Promise<Movie | undefined> {
  const getMovieQuery =
    `
    query getMovie {
      movie(id: ` +
    ID +
    `) {
        id
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
        query: getMovieQuery,
      }),
    });
    let resText = await res.text();
    let data = JSON.parse(resText).data.movie;

    let movie = new Movie(data.id, data.name);

    return movie;
  } catch (error) {
    console.log(
      "An error occured during the search. Check your internet connection!"
    );
  }
}

async function GetWikiSummery(title: string): Promise<string | undefined> {
  try {
    let res = await fetch(
      "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" +
        title,
      {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      }
    );
    let sum = await res.text();
    sum = JSON.parse(sum);
    sum = Object.values(sum.query.pages)[0];
    sum = sum.extract;

    return sum;
  } catch (error) {
    console.log(
      "An error occured during the search. Check your internet connection!"
    );
  }
}

export async function GetLinks(
  title: string
): Promise<{ imdbLink: string; wikiLink: string } | undefined> {
  try {
    // Wikidata Query Service
    // SELECT ?item ?IMDb_ID ?title ?sitelink ?article WHERE {
    //   ?item wdt:P31 wd:Q11424 .
    //   ?item wdt:P345 ?IMDb_ID .
    //   ?item wdt:P1476 ?title.
    //   FILTER Contains(?title, "Forrest Gump").
    //   ?sitelink schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> ;.
    // }
    let res = await fetch(
      "https://query.wikidata.org/sparql?query=SELECT%20%3Fitem%20%3FIMDb_ID%20%3Ftitle%20%3Fsitelink%20%3Farticle%20WHERE%20%7B%0A%20%20%3Fitem%20wdt%3AP31%20wd%3AQ11424%20.%0A%20%20%3Fitem%20wdt%3AP345%20%3FIMDb_ID%20.%0A%20%20%3Fitem%20wdt%3AP1476%20%3Ftitle.%0A%20%20FILTER%20Contains(%3Ftitle%2C%20%22" +
        title.replace(" ", "%20") +
        "%22).%0A%20%20%3Fsitelink%20schema%3Aabout%20%3Fitem%20%3B%20schema%3AisPartOf%20%3Chttps%3A%2F%2Fen.wikipedia.org%2F%3E%20%3B.%0A%20%20%0A%7D",
      {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      }
    );
    let xml = await res.text();
    let result: any;
    xml2js.parseString(xml, (err: any, parseRes: any) => {
      if (err) {
        console.log("Cannot convert xml to json");
        throw err;
      }
      result = parseRes;
    });

    let movieData = (Object.values(result.sparql.results[0].result) as any)[0];
    let imdb =
      "https://www.imdb.com/title/" + movieData.binding[1].literal[0] + "/";

    let wiki: string = movieData.binding[3].uri[0];

    return { imdbLink: imdb, wikiLink: wiki };
  } catch (error) {
    console.log("An error occured! Cannot find links!");
    return undefined;
  }
}
