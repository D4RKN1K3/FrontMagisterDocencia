import React from "react";
import * as XLSX from "xlsx";
import { filterItems } from "../../utils/crudHelpers/searchFilter";
import { sortItems } from "../../utils/crudHelpers/searchFilter";
import CustomButton from "../button/customButton";

const ExcelExportComponent = ({ items, fileName, label, searchTerm, searchType, sortProperty, sortDirection }) => {
    if (!items || items.length === 0) {
        return <p>No hay datos disponibles para exportar</p>;
    }
    const exportFilteredAndSortedItems = () => {
        const filteredItems = filterItems(items, searchTerm, searchType);

        return sortItems(filteredItems, sortProperty, sortDirection);
    };

    const handleExport = () => {
        // Crea un nuevo libro de Excel
        const wb = XLSX.utils.book_new();

        // Crea una hoja de trabajo y agrega los datos
        const ws = XLSX.utils.json_to_sheet(exportFilteredAndSortedItems());
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // Crea un archivo de Excel y lo descarga
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    };

    return (
        <CustomButton
            onClick={handleExport} type='button'
            color='orange'
            padding_x='4'
            padding_smx='6'
            padding_mdx='8'
            padding_y='2'
            width='full'
            height='10'
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Exportar {label}
        </CustomButton>
    );
};

export default ExcelExportComponent;