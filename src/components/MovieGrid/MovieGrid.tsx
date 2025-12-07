import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";
import PlaceholderPoster from "../../assets/placeholer-poster.png";

interface MovieGridProps {
  movies: Movie[];
  onClick: (id: number) => void;
}

export default function MovieGrid({ movies, onClick }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map(({ id, poster_path, title }) => (
        <li key={id}>
          <div className={css.card}>
            <img
              onClick={() => onClick(id)}
              className={css.image}
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                  : PlaceholderPoster
              }
              alt={title}
              loading="lazy"
            />
            <h2 className={css.title}>{title.toLocaleLowerCase()}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
