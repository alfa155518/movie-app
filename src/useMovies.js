import { useState } from "react";

// my Key
const key = "d2ba65c4";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");
  let tempQuery = "interstellar";
  // function Get Data
  async function getData() {
    const controller = new AbortController();

    try {
      setLoading(true);
      setError("");

      // Fetch API
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${key}&s=${!query ? tempQuery : query}`,
        { signal: controller.signal }
      );

      // If There Error
      if (!res.ok) throw new Error("Something went wrong with fetching movies");

      const data = await res.json();

      // If There No Response
      if (data.Response === "False") throw new Error("Movie not found");

      // Set Data In State
      setMovies(data.Search);
      setError("");

      // If there Error Show It
    } catch (err) {
      if (err.name !== "AbortError") {
        console.log(err.message);
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      }
    } finally {
      setLoading(false);
    }

    return function () {
      controller.abort();
    };
  }
  return { movies, loading, err, getData };
}
