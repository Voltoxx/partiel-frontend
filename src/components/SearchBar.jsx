import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [keyword, setKeyword] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(keyword);
    };

    const handleClear = () => {
        setKeyword('');
        onSearch('');
    };

    return (
        <form onSubmit={handleSearch} className="flex mb-4 relative">
            <div className="relative flex-1">
                <input
                    type="text"
                    placeholder="Star Wars, Harry Potter..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-l-lg pr-10"
                />
                {keyword && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute inset-y-0 right-0 flex items-center px-2"
                        style={{ right: '10px' }}
                    >
                        <svg
                            className="w-4 h-4 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
            >
                Rechercher
            </button>
        </form>
    );
}

export default SearchBar;
