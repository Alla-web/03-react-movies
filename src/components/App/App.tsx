import { useState } from "react";
import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import fetchMovies from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const noMoviesNotify = () => toast("No movies found for your request.");

  const handleSearch = async (query: string) => {
    setMovies([]);
    setLoader(true);
    setError(false);

    try {
      const movieArray = await fetchMovies(query);
      if (movieArray.length > 0) {
        setMovies(movieArray);
      } else {
        noMoviesNotify();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(true);
      }
    } finally {
      setLoader(false);
    }
  };

  const handleModal = (movie: Movie) => {
    if (!movie) return;
    setSelectedMovie(movie);
  };

  const onModalClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {loader ? <Loader /> : null}
      {movies.length > 0 ? (
        <MovieGrid movies={movies} onSelect={handleModal} />
      ) : null}
      {error ? <ErrorMessage /> : null}
      {selectedMovie ? (
        <MovieModal movie={selectedMovie} onClose={onModalClose} />
      ) : null}
    </div>
  );
}
