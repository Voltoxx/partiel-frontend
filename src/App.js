import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SearchBar from './components/SearchBar';
import MovieList from './pages/MovieList';
import Pagination from './components/Pagination';
import MovieDetails from './pages/MovieDetails';
import GenreSelector from './components/GenreSelector';
import Logo from './assets/img/logo.png';
import getApiKey from './utils/apiKey';

function App() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [keyword, setKeyword] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    const fetchMovies = async (keyword = '', genreId = '', page = 1) => {
        const apiKey = getApiKey();
        let url;

        if (keyword && genreId) {
            // Si les deux paramètres sont fournis
            url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}&page=${page}&with_genres=${genreId}`;
        } else if (keyword) {
            // Si seul le mot-clé est fourni
            url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}&page=${page}`;
        } else if (genreId) {
            // Si seul le genre est fourni
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}`;
        } else {
            // Si aucun paramètre n'est fourni
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results); // Stocker tous les films récupérés
        setTotalPages(data.total_pages); // Utiliser total_pages directement

    };

    useEffect(() => {
        fetchMovies(keyword, selectedGenre, page);
    }, [keyword, selectedGenre, page]);

    return (
        <Router>
            <div className="container mx-auto p-4">
                <div className="flex justify-center mb-4">
                    <img src={Logo} alt="Logo" className="h-20"/>
                </div>
                <SearchBar onSearch={setKeyword}/>
                <p className="mb-2 font-bold"> ou </p>
                <GenreSelector onGenreChange={setSelectedGenre}/>
                <Routes>
                    <Route path="/" element={
                        <>
                            <MovieList movies={movies}/>
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        </>
                    }/>
                    <Route path="/movie/:id" element={<MovieDetails/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
