import { Movie } from "../Model/Movie";
const fetch = require("node-fetch");
var express = require("express");
var xml2js = require('xml2js');


export async function GetMovieByID(ID: string): Promise<Movie | undefined> {
  const getMovieQuery =
    `
    query getMovie {
      movie(id: `+ID+`) {
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

    let movie = new Movie(data.id,data.name);

    

    return movie;
  } catch (error) {
    console.log("An error occured during the search. Check your internet connection!");
  }
}

export async function GetWikiSummery(title: string): Promise<string | undefined> {
  try {
    let res = await fetch("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles="+title, {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      }
    });
    let json = await res.text();
    json = JSON.parse(json);
    json = Object.values(json.query.pages)[0]
    json = json.extract;

    return json;
  } catch (error) {
    console.log("An error occured during the search. Check your internet connection!");
  }
}
