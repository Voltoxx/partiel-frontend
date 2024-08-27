import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) {
        return null;
    }

    // Fonction pour générer les numéros de page à afficher
    const generatePageNumbers = () => {
        const pages = [];

        if (totalPages <= 10) {
            // Si le nombre total de pages est inférieur ou égal à 10, afficher toutes les pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Sinon, afficher les pages avec des ellipses
            if (currentPage <= 6) {
                // Si la page actuelle est proche du début
                for (let i = 1; i <= 7; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 5) {
                // Si la page actuelle est proche de la fin
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 6; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Page actuelle au milieu
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pages = generatePageNumbers();

    return (
        <div className="flex items-center justify-center mt-4 space-x-2">
            <button
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            >
                Précédent
            </button>

            {pages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => page !== '...' && onPageChange(page)}
                    disabled={page === '...' || page === currentPage}
                    className={`px-4 py-2 mx-1 rounded-lg ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            >
                Suivant
            </button>
        </div>
    );
}

export default Pagination;
