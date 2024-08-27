import React, { useEffect, useState } from 'react';
import getApiKey from "../utils/apiKey";

function GenreSelector({ onGenreChange }) {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(() => {
        const fetchGenres = async () => {
            const apiKey = getApiKey();
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
            const data = await response.json();
            setGenres(data.genres);
        };

        fetchGenres();
    }, []);

    const handleGenreChange = (event) => {
        const genreId = event.target.value;
        setSelectedGenre(genreId);
        onGenreChange(genreId);
    };

    return (
        <div className="mb-4">
            <select
                id="genre"
                value={selectedGenre}
                onChange={handleGenreChange}
                className="px-4 py-2 border rounded-lg"
            >
                <option value="">Tous les genres</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default GenreSelector;