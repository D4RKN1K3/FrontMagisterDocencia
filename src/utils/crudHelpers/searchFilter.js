export const filterItemsByDateRange = (items, startDate, endDate, datePropertyName) => {
    if (!Array.isArray(items) || !items) {
        return [];
    }

    if (!startDate || !endDate) {
        // Si startDate o endDate no están definidos, devolver el array original sin filtrar
        return items;
    }

    return items.filter((item) => {
        const propValue = item[datePropertyName];

        if (propValue instanceof Date) {
            // Si la propiedad es de tipo Date, comparar directamente las fechas
            return propValue >= startDate && propValue <= endDate;
        } else if (typeof propValue === 'string') {
            // Si la propiedad es de tipo string (puede ser un timestamptz), convertir a Date y comparar
            const propDate = new Date(propValue);
            return !isNaN(propDate.getTime()) && propDate >= startDate && propDate <= endDate;
        }

        return false;
    });
};


// Función para filtrar los elementos según el término de búsqueda y el tipo de búsqueda seleccionado
const checkInclusion = (targetString, searchString) => {
    const targetArray = targetString.split(',').map((item) => item.trim().toLowerCase());
    const searchArray = searchString.split(',').map((item) => item.trim().toLowerCase());

    return searchArray.every((searchItem) => targetArray.some((targetItem) => targetItem.includes(searchItem)));
};

export const filterItems = (items, searchTerm, searchType) => {
    if (!Array.isArray(items) || !items) {
        return [];
    }

    return items.filter((item) => {
        const nestedProperties = searchType.split('.');
        let propValue = item;


        for (const prop of nestedProperties) {
            if (propValue && propValue.hasOwnProperty(prop)) {
                propValue = propValue[prop];
            } else {
                // Si alguna propiedad anidada es nula o indefinida, la búsqueda falla
                return false;
            }
        }

        if (propValue === null || propValue === undefined) {
            // Si la propiedad final es nula o indefinida, la búsqueda falla
            return false;
        }

        if (typeof propValue === 'string') {
            // Usar la función de utilidad para verificar la inclusión independientemente del orden
            return checkInclusion(propValue, searchTerm);
        } else if (typeof propValue === 'number') {
            return propValue.toString().includes(searchTerm);
        } else if (propValue instanceof Date) {
            const searchTermDate = new Date(searchTerm);
            if (isNaN(searchTermDate.getTime())) {
                return false;
            }
            return propValue.getTime() === searchTermDate.getTime();
        }

        return false;
    });
};

const checkMultipleInclusion = (targetString, searchTerms) => {
    const targetArray = targetString.split(',').map((item) => item.trim().toLowerCase());

    return searchTerms.every((searchTerm) => targetArray.some((targetItem) => targetItem.includes(searchTerm)));
};

export const filterMultipleItems = (items, searchParamsArray) => {
    if (!Array.isArray(items) || !items) {
        return [];
    }

    return items.filter((item) => {
        return searchParamsArray.every((searchParams) => {
            const { searchType, searchTerm } = searchParams;
            const nestedProperties = searchType.split('.');
            let propValue = item;

            for (const prop of nestedProperties) {
                propValue = propValue[prop];

                if (propValue === undefined) {
                    return false;
                }
            }

            if (typeof propValue === 'string') {
                return checkMultipleInclusion(propValue, searchTerm.split(',').map((item) => item.trim().toLowerCase()));
            } else if (typeof propValue === 'number') {
                return propValue.toString().includes(searchTerm);
            } else if (propValue instanceof Date) {
                const searchTermDate = new Date(searchTerm);
                if (isNaN(searchTermDate.getTime())) {
                    return false;
                }
                return propValue.getTime() === searchTermDate.getTime();
            }

            return false;
        });
    });
};

// Función para ordenar los elementos según la dirección de ordenamiento y la propiedad seleccionada
export const sortItems = (items, sortProperty, sortDirection) => {
    
    if (!Array.isArray(items) || !items) {
        return [];
    }

    return items.sort((a, b) => {
        if (sortProperty === 'format.name') {
            const propA = a.format && a.format.name;
            const propB = b.format && b.format.name;
            if (typeof propA === 'string' && typeof propB === 'string') {
                return sortDirection === 'asc' ? propA.localeCompare(propB) : propB.localeCompare(propA);
            }
        } else {
            const propA = a[sortProperty];
            const propB = b[sortProperty];
            if (propA !== undefined && propB !== undefined) {
                if (typeof propA === 'string' && typeof propB === 'string') {
                    return sortDirection === 'asc' ? propA.localeCompare(propB) : propB.localeCompare(propA);
                }
                if (typeof propA === 'number' && typeof propB === 'number') {
                    return sortDirection === 'asc' ? propA - propB : propB - propA;
                }
                if (propA instanceof Date && propB instanceof Date) {
                    return sortDirection === 'asc' ? propA.getTime() - propB.getTime() : propB.getTime() - propA.getTime();
                }
            }
        }
        return 0;
    });
};
