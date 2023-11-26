import React from 'react';

const SearchWithSelect = ({
    selectId,
    searchTerm,
    setSearchTerm,
    searchType,
    setSearchType,
    options,
}) => {
    return (
        <div className='flex flex-col items-center gap-1 sm:flex-row'>
            <div className='flex-1 w-full sm:w-auto'>
                <div className="relative z-1">
                    <label htmlFor={selectId} className="sr-only">
                        {selectId}
                    </label>
                    <input
                        type="text"
                        id={selectId}
                        name={selectId}
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-10 w-full rounded-md border-gray-200 py-2.5 pl-10 pr-3 shadow-sm sm:text-sm"
                        autoComplete="on"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </div>
            </div>

            <div className='flex-2 w-full sm:w-auto'>
                <select
                    id="searchSelect"
                    name="searchSelect"
                    className="h-10 w-full rounded-lg border-gray-300 text-gray-700 text-sm"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SearchWithSelect;