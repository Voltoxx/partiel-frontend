import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import getApidKey from '../utils/apiKey';

function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const apiKey = getApidKey();
            const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
            const movieData = await movieResponse.json();
            setMovie(movieData);

            const reviewsResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}`);
            const reviewsData = await reviewsResponse.json();
            setReviews(reviewsData.results);
        };

        fetchMovieDetails();
    }, [id]);

    return (
        <div className="container mx-auto py-6">
            <button
                onClick={() => navigate('/')}
                className="mb-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            >
                Retour à la liste des films
            </button>

            {movie ? (
                <div className="bg-white border p-8 rounded-lg shadow-lg">
                    <div className="flex flex-col md:flex-row items-start">
                        <div className="md:w-2/3 pr-0 md:pr-6 mb-6 md:mb-0">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{movie.title}</h1>
                            <p className="text-lg text-gray-600 mb-4">
                                {movie.release_date ? `Sorti en ${new Date(movie.release_date).getFullYear()}` : 'Date inconnue'}
                            </p>
                            <p className="text-gray-800 mb-6 leading-relaxed">{movie.overview}</p>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Avis des spectateurs</h2>
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <div
                                        key={review.id}
                                        className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
                                    >
                                        <p className="font-semibold text-gray-800">{review.author}</p>
                                        <p className="text-gray-700 mt-2">{review.content}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">Aucun avis disponible.</p>
                            )}
                        </div>
                        <img
                            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750'}
                            alt={movie.title}
                            className="w-full md:w-1/3 h-auto object-cover rounded md:ml-4 mt-4 md:mt-0"
                        />
                    </div>
                </div>
            ) : (
                <p className="text-gray-600">Chargement des détails du film...</p>
            )}
        </div>
    );
}

export default MovieDetails;