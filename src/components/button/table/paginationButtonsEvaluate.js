import React, { useMemo } from 'react';

const PaginationButtons = ({
  currentPage,
  setCurrentPage,
  length,
  itemsPerPage,
  numberFiltered,
  setShowRubric
}) => {
  const handlePrevPage = () => {
    setShowRubric(false);
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setShowRubric(false);
    const totalPages = Math.ceil(length / itemsPerPage);
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  const handlePageChange = (page) => {
    setShowRubric(false);
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(length / itemsPerPage);
  const pagesArray = useMemo(() => {
    const maxVisiblePages = 6;
    const visiblePages = Math.min(totalPages, maxVisiblePages);

    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = startPage + visiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    return Array.from({ length: visiblePages }, (_, i) => startPage + i);
  }, [currentPage, totalPages]);

  return (
    <div className='flex flex-col items-center md:flex-row md:justify-between mt-3'>
      <div className='flex-1 text-center md:text-start'>
        <p className='text-gray-500 sm:text-lg'>Mostrando {numberFiltered} de {length} elementos después de aplicar los filtros.</p>
      </div>
      <div className="flex flex-1 justify-center md:justify-end gap-1">
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
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
              className={`inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow ${currentPage === page
                ? 'bg-orange-500 text-white'
                : 'hover:bg-white hover:border-orange-500 hover:text-orange-500'
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
    </div>
  );
};

export default PaginationButtons;
