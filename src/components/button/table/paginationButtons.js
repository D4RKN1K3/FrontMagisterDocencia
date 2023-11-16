import React from 'react';

const PaginationButtons = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
  handlePageChange,
}) => {
  
  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div className="flex justify-center items-center space-y-2 text-xs sm:space-y-0 sm:space-x-3 sm:flex mt-2">
      <button
        onClick={handlePrevPage}
        className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow rtl:rotate-180"
        disabled={currentPage === 1}
      >
        <span className="sr-only">Página anterior</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div className="space-x-1">
        {pagesArray.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)} // Llama a la nueva función
            className={`inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow ${currentPage === page ? 'bg-orange-500 text-white' : 'hover:bg-white hover:border-orange-500 hover:text-orange-500'
              }`}
          >
            <span className="sr-only">{`Ir a la página ${page}`}</span>
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow rtl:rotate-180"
      >
        <span className="sr-only">Página siguiente</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default PaginationButtons;
