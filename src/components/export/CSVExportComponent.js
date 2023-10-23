import React from "react";
import { CSVLink } from "react-csv";
import { filterItems } from "../../utils/crudHelpers/searchFilter";
import { sortItems } from "../../utils/crudHelpers/searchFilter";
import CustomButton from "../button/customButton";

const ExcelExportComponent = ({ items, fileName, searchTerm, searchType, sortProperty, sortDirection }) => {
    if (!items || items.length === 0) {
        return <p>No hay datos disponibles para exportar</p>;
    }

    const exportFilteredAndSortedItems = () => {
        const filteredItems = filterItems(items, searchTerm, searchType);
        return sortItems(filteredItems, sortProperty, sortDirection);
    };

    const dataForCSV = exportFilteredAndSortedItems().map((item) => ({
        userID: item.userID,
        rut: item.rut,
        firstName: item.firstName,
        secondName: item.secondName,
        surnameF: item.surnameF,
        surnameM: item.surnameM,
        sex: item.sex,
        stateCivil: item.stateCivil,
        birthday: item.birthday,
        address: item.address,
        email: item.email,
        phone: item.phone,
        entry: item.entry,
        id: item.id,
    }));

    const headersForCSV = [
        { label: "UserID", key: "userID" },
        { label: "Rut", key: "rut" },
        { label: "First Name", key: "firstName" },
        { label: "Second Name", key: "secondName" },
        { label: "Surname F", key: "surnameF" },
        { label: "Surname M", key: "surnameM" },
        { label: "Sex", key: "sex" },
        { label: "State Civil", key: "stateCivil" },
        { label: "Birthday", key: "birthday" },
        { label: "Address", key: "address" },
        { label: "Email", key: "email" },
        { label: "Phone", key: "phone" },
        { label: "Entry", key: "entry" },
        { label: "ID", key: "id" },
    ];

    return (
        <CustomButton
            type='button'
            color='orange'
            padding_x='4'
            padding_smx='6'
            padding_mdx='8'
            padding_y='2'
            width='full'
            height='10'
        >
            <CSVLink data={dataForCSV} headers={headersForCSV} filename={`${fileName}.csv`}>
                Exportar a CSV
            </CSVLink>
        </CustomButton>
    );
};

export default ExcelExportComponent;