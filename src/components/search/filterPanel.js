import React, { useState } from 'react';

const FilterPanel = ({ children }) => {
    const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);

    return (
        <div className="space-y-2 mt-1">
            <div
                className={`overflow-hidden rounded border border-gray-300`}
            >
                <button
                    onClick={() => setIsAvailabilityOpen(!isAvailabilityOpen)}
                    type="button"
                    className="flex h-10 w-full cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                >
                    <span className="text-sm text-gray-700 font-medium">Ordenar Elementos</span>
                    <span
                        className={`transition ${isAvailabilityOpen ? '-rotate-180' : ''
                            }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </span>
                </button>

                <div
                    className={`border-t border-gray-200 bg-white ${isAvailabilityOpen ? 'block' : 'hidden'
                        }`}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

export default FilterPanel;
