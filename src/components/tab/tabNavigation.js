import React, { useMemo } from 'react';

const PaginationTabButtons = ({
    items,
    currentTab,
    setCurrentTab,
    itemsPerPage,
    setSearchTerm,
}) => {
    const handlePrevPage = () => {
        if (currentTab === 0) {
            setCurrentTab(totalPages - 1);
        } else {
            setCurrentTab((prevPage) => Math.max(0, prevPage - 1));
        }
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil(length / itemsPerPage);
        setCurrentTab((prevPage) => Math.min(totalPages, prevPage + 1));
    };

    const handlePageChange = (page, semesterID) => {
        setCurrentTab(page);
        setSearchTerm(semesterID);
    };

    const handlePageDefaultChange = () => {
        setCurrentTab(0);
        setSearchTerm('');
    };

    const length = items.length;
    const totalPages = Math.ceil(length / itemsPerPage);

    const maxVisiblePages = window.innerWidth < 500 ? 1 : 5;
    const pagesArray = useMemo(() => {
        const visiblePages = Math.min(totalPages, maxVisiblePages);

        let startPage = Math.max(1, currentTab - Math.floor(visiblePages / 2));
        let endPage = startPage + visiblePages - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - visiblePages + 1);
        }

        return Array.from({ length: visiblePages }, (_, i) => startPage + i);
    }, [currentTab, totalPages, maxVisiblePages]);

    return (
        <div className='flex flex-col items-center md:justify-between mt-3'>
            <div className="flex flex-1 justify-center md:justify-end gap-1">
                <button
                    onClick={handlePrevPage}
                    className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow rtl:rotate-180"
                    disabled={currentTab === 0} // Deshabilitar el botón de retroceso en la página Todos los Semestres
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
                    <button
                        onClick={() => handlePageDefaultChange()}
                        className={`inline-flex items-center justify-center w-auto h-8 p-2 border rounded-md shadow ${currentTab === 0
                            ? 'bg-orange-500 text-white'
                            : 'hover:bg-white hover:border-orange-500 hover:text-orange-500'
                            }`}
                    >
                        <span className="text-xs sm:text-sm">
                            Todos los Semestres
                        </span>
                    </button>
                </div>

                <div className="space-x-1">
                    {pagesArray.map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page, items[page - 1].semesterID)}
                            className={`inline-flex items-center justify-center w-auto h-8 p-2 border rounded-md shadow ${currentTab === page
                                ? 'bg-orange-500 text-white'
                                : 'hover:bg-white hover:border-orange-500 hover:text-orange-500'
                                }`}
                        >
                            <span className="text-xs sm:text-sm">
                                {items[page - 1].year} - {items[page - 1].semesterNumber === 1 ? 'Primer' : 'Segundo'} Semestre
                            </span>
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleNextPage}
                    disabled={currentTab === totalPages}
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

export default PaginationTabButtons;
