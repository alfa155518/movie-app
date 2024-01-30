import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import Box from "./Box";
import MoviesList from "./MoviesList";
import WatchedSummary from "./WatchedSummary";
import WatchedList from "./WatchedList";
import MovieDetails from "./MovieDetails";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

// Calc Average
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [watched, setWatched] = useLocalStorageState();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const { movies, loading, err, getData } = useMovies(query);

  // Start Get Data
  useEffect(() => {
    getData();
  }, [query]);

  // Function Get Movie Details
  function movieDetails(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  // Function Close Details Of Movie
  function handelCloseDetails() {
    setSelectedId(null);
  }

  return (
    <>
      {/* Nav Bar Component */}
      <NavBar movies={movies} query={query} setQuery={setQuery} err={err} />

      {/* Main Component */}
      <Main>
        <Box movies={movies}>
          {!loading && !err && (
            <MoviesList movies={movies} movieDetails={movieDetails} />
          )}
          {loading && <p className="loader">Loading...</p>}
          {err && <ErrorMessage message={err} />}
        </Box>

        {/* Details And Watched List and Summary Component */}
        <Box average={average}>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              handelCloseDetails={handelCloseDetails}
              setWatched={setWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} average={average} />
              <WatchedList watched={watched} setWatched={setWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

// Function Error Message
function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>❌</span> {message}
    </p>
  );
}
