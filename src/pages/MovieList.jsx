import { Link } from "react-router-dom";
import React from "react";

function MovieList({ movies }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.length === 0 ? (
                <p>Aucun film trouvé.</p>
            ) : (
                movies.map((movie) => (
                    <div
                        key={movie.id}
                        className="bg-white border p-2 rounded-lg shadow-md flex flex-col items-center transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    >
                        <Link to={`/movie/${movie.id}`} className="flex flex-col items-center">
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                                className="w-32 h-48 object-cover mb-2 rounded-md"
                            />
                            <h3 className="text-lg font-semibold mb-1 text-center">{movie.title}</h3>
                        </Link>
                        <p className="text-gray-600 text-xs mb-1 text-center">
                            {movie.release_date ? `Sorti en ${new Date(movie.release_date).getFullYear()}` : 'Date inconnue'}
                        </p>
                        <p className="text-xs text-gray-800 text-center">
                            {movie.overview.length > 200 ? movie.overview.substring(0, 197) + '...' : movie.overview}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default MovieList;
