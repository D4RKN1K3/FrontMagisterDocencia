import React from 'react';

const SortButton = ({ value, sortProperty, setSortProperty, setSortDirection, isActive, isAscending }) => {


    const handleSortPropertyChange = (property) => {
        // Si usuario selecciona una nueva propiedad de ordenamiento, pero es diferente a la propiedad actual,
        // establecer la dirección de ordenamiento en 'asc' (ascendente)
        if (property !== sortProperty) {
            setSortDirection('asc');
        }
        // Si usuario selecciona una nueva propiedad de ordenamiento y es la misma que la propiedad actual,
        // alternar la dirección de ordenamiento entre 'asc' y 'desc'
        else {
            setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
        }
        // Establecer la nueva propiedad de ordenamiento seleccionada
        setSortProperty(property);
    };

    return (
        <button
            onClick={() => handleSortPropertyChange(value)}
            className={`transition-transform transform ${isActive ? (isAscending ? 'rotate-0' : 'rotate-180') : 'rotate-0'}`}
        >
            {isActive ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )}
        </button>
    );
};

export default SortButton;
