import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

import ModalCRUD from '../../modal/modalCRUD';
import Alert from '../../alert/alert';
import AlertVerification from '../../alert/alertVerification';
import WaitingAlert from '../../alert/waitingAlert';
import IconOnlyAlert from '../../alert/iconOnlyAlert'
import CustomButton from '../../button/customButton';

import { GETRequest, POSTRequest, PUTRequest, DELETERequest } from '../../../utils/requestHelpers';
import { filterItems, sortItems } from '../../../utils/crudHelpers/searchFilter';
import { renewSession, deniedSession } from '../../../utils/sessionHelpers';
import ItemListHeader from '../../forms/header/itemListHeader';
import SearchWithSelect from '../../search/searchWithSelect';
import SortButton from '../../sort/sortButton';
import PaginationButtons from '../../button/table/paginationButtons';
import FormContainer from '../../forms/body/formContainer';
import Checkbox from '../../input/checkbox';
import TextInput from '../../input/textInput';
import SearchSelect from '../../input/searchSelect';
import DynamicSelect from '../../input/dynamicSelect';

const TitleCRUD = ({ name, urls, title, subtitle }) => {
  const [itemName] = useState(name);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    typeID: '',
    universityID: '',
    departamentTitle: '',
  });

  const options = [
    { label: `Identificador del ${itemName}`, value: 'titleID' },
    { label: `Nombre del ${itemName}`, value: 'name' },
    { label: `Departamento del Título`, value: 'departamentTitle' },
    { label: `Identificador del Tipo`, value: 'typeID' },
    { label: `Identificador de la Universidad`, value: 'universityID' },
    { label: `Nombre de la Universidad`, value: 'nameuniversity' },
    { label: `Pais`, value: 'country' },
    { label: `Ciudad`, value: 'city' },
    { label: `Nombre del Tipo`, value: 'nameType' },
    { label: `Tipo`, value: 'type' },
  ];

  const [type, setType] = useState([]);
  const [university, setUniversity] = useState([]);
  const validDepartamentTitle = ['Educacio y Humanidad', 'Ingeniería', 'Ciencias', 'Medicina'];

  const [updateId, setUpdateId] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = parseInt(process.env.REACT_APP_ITEMS_PER_PAGE, 10);

  // -------------------------------Funciones Para CRUD-------------------------------
  const fetchItems = async () => {
    try {
      const url = urls[0];
      const access_token = Cookies.get('access_token');
      if (access_token) {
        setMessageWaiting(true);
        const config = {
          access_token,
        };

        const response = await GETRequest(url, config);
        OptionMessage(response);
      } else {
        setMessageError('No tienes una session');
      }
    } catch (error) {
      setMessageWaiting(false);
      setMessageError(`Error seaching ${itemName}:` + error.message);
    }
  };

  const handleCreate = async () => {
    try {
      const url = urls[0];
      const access_token = Cookies.get('access_token');
      if (access_token) {
        setMessageWaiting(true);
        const config = { ...newItem, access_token };
        const response = await POSTRequest(url, config);
        OptionMessage(response);
      } else {
        setMessageError('No tienes una session');
      }
    } catch (error) {
      setMessageWaiting(false);
      setMessageError(`Error creating ${itemName}:` + error.message);
    }
  };

  const handleUpdate = async () => {
    if (updateId === null) return;

    try {
      const url = urls[0];
      const access_token = Cookies.get('access_token');
      if (access_token) {
        setMessageWaiting(true);
        const config = {
          titleID: updateId,
          ...newItem,
          access_token,
        };
        const response = await PUTRequest(url, config);
        OptionMessage(response);
      } else {
        setMessageError('No tienes una session');
      }
    } catch (error) {
      setMessageWaiting(false);
      setMessageError(`Error updating ${itemName}:` + error.message);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const url = urls[0];
      const access_token = Cookies.get('access_token');
      if (access_token) {
        setMessageWaiting(true);
        if (selectedItems.length !== 0) {
          const idsToDelete = selectedItems.map(item => item.titleID);

          const chunkSize = process.env.REACT_APP_MAX_LENGHT_ARRAY_NUMBER;
          for (let i = 0; i < idsToDelete.length; i += chunkSize) {
            const chunk = idsToDelete.slice(i, i + chunkSize);

            const config = {
              access_token,
              titleIDs: chunk,
            };
            const response = await DELETERequest(url, config);
            OptionMessage(response);
          }
        }
      } else {
        setMessageError('No tienes una sesión');
      }
    } catch (error) {
      setMessageWaiting(false);
      setMessageError(`Error deleting ${itemName}:` + error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (updateId !== null) {
      await handleUpdate();
    } else {
      await handleCreate();
    }
  };

  const handleEdit = (item) => {
    setUpdateId(item.titleID);
    setNewItem({
      name: item.name,
      typeID: item.typeID,
      universityID: item.universityID,
      nameuniversity: item.nameuniversity,
      country: item.country,
      city: item.city,
      nameType: item.nameType,
      type: item.type,
      departamentTitle: item.departamentTitle,
    });
    openModal();
  };

  const clearItem = () => {
    setUpdateId(null);
    setNewItem({
      name: '',
      typeID: '',
      universityID: '',
      departamentTitle: '',
    });
  };

  const clearCheckbox = () => {
    setSelectedItems([]);
    setSelectAll(false);
  };

  const handleCheckboxChange = (event, item) => {
    if (event.target.checked) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((selectedItem) => selectedItem.titleID !== item.titleID)
      );
    }
  };

  const handleSelectAllChange = (event) => {
    setSelectAll(event.target.checked);
    setSelectedItems(event.target.checked ? items : []);
  };

  const OptionMessage = async (data) => {
    setMessageWaiting(false);
    if (data.verificationMessage) {
      setMessageVerification(data.verificationMessage);
      fetchItems();
      closeModal();
    }
    else if (data.renewalMessage) {
      setMessageVerification(data.renewalMessage);
      await fetchItems();
      fetchItemsSelect('type', urls[1]);
      fetchItemsSelect('university', urls[2]);
    }
    else if (data.errorDenied) {
      setMessageError(data.errorDenied);
      deniedSession(navigate);
    }
    else if (data.expirationError) {
      const renewedData = await renewSession();
      OptionMessage(renewedData);
    }
    else if (data.message) {
      if (data.message.error && data.message.error.message !== undefined) {
        setMessageError(data.message.error.message);
        return;
      }
      setMessageError(data.message);
    }
    else if (data.errors) {
      const errorList = data.errors.map((error, index) => (`${index + 1}. ${error.msg}`)).join('<br/>');
      const formattedErrorList = { __html: errorList };
      setMessageError(
        <div>
          <p>Se encontraron los siguientes errores:</p>
          <div dangerouslySetInnerHTML={formattedErrorList} />
        </div>
      );
    }
    else if (data.error) {
      if (Object.keys(data.error).length === 0) {
        setMessageError('Error desconocido');
      } else if (data.error.message !== undefined) {
        setMessageError(data.error.message);
      } else {
        setMessageError(data.error);
      }
    }
    else if (data) {
      setItems(data);
      clearCheckbox();
    }
    else {
      setMessageError('Error Inesperado');
    }
  };
  // -------------------------------Funciones para los Selectores Especiales-------------------------------
  const fetchItemsSelect = async (nameSelect, url) => {
    try {
      const access_token = Cookies.get('access_token');
      if (access_token) {
        setMessageWaiting(true);
        const config = {
          access_token,
        };

        const response = await GETRequest(url, config);
        OptionMessageSelect(nameSelect, response);
      } else {
        setMessageError('No tienes una session');
      }
    } catch (error) {
      setMessageWaiting(false);
      setMessageError(`Error seaching ${itemName}:` + error.message);
    }
  };

  const OptionMessageSelect = async (nameSelect, data) => {
    setMessageWaiting(false);
    if (data.verificationMessage) {
      setMessageVerification(data.verificationMessage);
      fetchItems();
    }
    else if (data.errorDenied) {
      setMessageError(data.errorDenied);
      deniedSession(navigate);
    }
    else if (data.expirationError) {
      const renewedData = await renewSession();
      OptionMessage(renewedData);
    }
    else if (data.message) {
      if (data.message.error && data.message.error.message !== undefined) {
        setMessageError(data.message.error.message);
        return;
      }
      setMessageError(data.message);
    }
    else if (data.errors) {
      const errorList = data.errors.map((error, index) => (`${index + 1}. ${error.msg}`)).join('<br/>');
      const formattedErrorList = { __html: errorList };
      setMessageError(
        <div>
          <p>Se encontraron los siguientes errores:</p>
          <div dangerouslySetInnerHTML={formattedErrorList} />
        </div>
      );
    }
    else if (data.error) {
      if (Object.keys(data.error).length === 0) {
        setMessageError('Error desconocido');
      } else if (data.error.message !== undefined) {
        setMessageError(data.error.message);
      } else {
        setMessageError(data.error);
      }
    }
    else if (data) {
      if (nameSelect === 'university') {
        const sortedItems = sortItems(data, 'universityID', 'asc');
        const format = sortedItems.map(item => ({
          value: item.universityID,
          label: item.name
        }));
        setUniversity(format);
      }
      else if (nameSelect === 'type') {
        const sortedItems = sortItems(data, 'typeID', 'asc');
        const format = sortedItems.map(item => ({
          value: item.typeID,
          label: item.name
        }));
        setType(format);
      }
    }
    else {
      setMessageError('Error Inesperado');
    }
  };

  // -------------------------------Funciones para la Paginacion-------------------------------
  const [searchType, setSearchType] = useState('titleID');
  const [searchTerm, setSearchTerm] = useState('');

  const [sortDirection, setSortDirection] = useState('asc');
  const [sortProperty, setSortProperty] = useState('titleID');

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // Filtrar y ordenar los elementos según término de búsqueda y tipo de búsqueda seleccionado
    const filteredItems = filterItems(items, searchTerm, searchType);

    // Ordenar los elementos según la dirección de ordenamiento y la propiedad seleccionada
    const sortedItems = sortItems(filteredItems, sortProperty, sortDirection);
    return sortedItems.slice(startIndex, endIndex);
  };

  const getNumberFiltered = () => {
    const filteredItems = filterItems(items, searchTerm, searchType);
    return filteredItems.length;
  }

  // -------------------------------Funciones de Extra-------------------------------

  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      // Coloca el código que deseas ejecutar solo una vez aquí
      fetchItems();
      fetchItemsSelect('type', urls[1]);
      fetchItemsSelect('university', urls[2]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const [messageError, setMessageError] = useState(null);
  const [messageVerification, setMessageVerification] = useState(null);
  const [messageWaiting, setMessageWaiting] = useState(null);

  const closeAlert = () => {
    setMessageError(null);
    setMessageVerification(null);
  }

  // -------------------------------Funciones para los Modal-------------------------------
  const [ModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    clearItem();
  };

  return (
    <div>
      {messageWaiting && <WaitingAlert />}
      {messageError && <Alert message={messageError} onClose={closeAlert} />}
      {messageVerification && (<AlertVerification message={messageVerification} onClose={closeAlert} />)}

      <ModalCRUD isOpen={ModalOpen}>
        <FormContainer
          updateId={updateId}
          itemName={itemName}
          pText={''}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        >
          <TextInput
            inputId='nameTitle'
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder={`Ingresar Nombre del Título`}
          />
          <DynamicSelect selectId='departamentTitle' label="Seleccione Departamento del Título" options={validDepartamentTitle} value={newItem.departamentTitle} onChange={(e) => setNewItem({ ...newItem, departamentTitle: e.target.value })} />
          <SearchSelect
            selectId='typeID'
            placeholder="Seleccione Tipo"
            options={type}
            value={newItem.typeID}
            onChange={(selectedOption) => setNewItem({ ...newItem, typeID: selectedOption.value })}
          />

          <SearchSelect
            selectId='universityID'
            placeholder="Seleccione Universidad"
            options={university}
            value={newItem.universityID}
            onChange={(selectedOption) => setNewItem({ ...newItem, universityID: selectedOption.value })}
          />
        </FormContainer>
      </ModalCRUD>

      <div className='min-h-screen mx-2 my-2'>
        <ItemListHeader
          title={title}
          subtitle={subtitle}
          itemName={itemName}
          openModal={openModal}
          fetchItems={fetchItems}
          handleDeleteSelected={handleDeleteSelected}
        />

        <SearchWithSelect
          selectId={`${searchType}`}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchType={searchType}
          setSearchType={setSearchType}
          options={options}
        />

        <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} length={items.length} itemsPerPage={ITEMS_PER_PAGE} numberFiltered={getNumberFiltered()} />
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm mt-4'>
            <thead className='ltr:text-left rtl:text-right'>
              <tr>
                <th className='px-4 py-2'>
                  <Checkbox
                    id='deleteAllInput'
                    name='deleteAllInput'
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  />
                </th>
                {options.map((option) => (
                  <th key={option.value} className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                    <div className='flex items-center justify-center text-center gap-1'>
                      {option.label}
                      <SortButton
                        value={option.value}
                        sortProperty={sortProperty}
                        setSortProperty={setSortProperty}
                        setSortDirection={setSortDirection}
                        isActive={sortProperty === option.value}
                        isAscending={sortDirection === 'asc'}
                      />
                    </div>
                  </th>
                ))}
                <th className='whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900'>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className='ltr:text-left rtl:text-right'>
              {items.length === 0 && messageWaiting && (
                <tr>
                  <td colSpan={options.length} className="w-1/2 h-96 translate-x-1/4">
                    <IconOnlyAlert />
                  </td>
                </tr>
              )}
              {getCurrentPageItems().map((item) => (
                <tr key={item.titleID} className='text-center'>
                  <td className='px-4 py-2'>
                    <Checkbox
                      id={`deleteInput-${item.titleID}`}
                      name={`deleteInput-${item.titleID}`}
                      checked={selectedItems.some((selectedItem) => selectedItem.titleID === item.titleID)}
                      onChange={(e) => handleCheckboxChange(e, item)}
                    />
                  </td>
                  <td className='px-4 py-2'>{item.titleID}</td>
                  <td className='whitespace-nowrap px-4 py-2'>{item.name}</td>
                  <td className='px-4 py-2'>{item.departamentTitle}</td>
                  <td className='px-4 py-2'>{item.typeID}</td>
                  <td className='px-4 py-2'>{item.universityID}</td>
                  <td className='px-4 py-2'>{item.nameUniversity}</td>
                  <td className='px-4 py-2'>{item.country}</td>
                  <td className='px-4 py-2'>{item.city}</td>
                  <td className='px-4 py-2'>{item.nameType}</td>
                  <td className='px-4 py-2'>{item.type}</td>
                  <td className='px-4 py-2 flex gap-2'>
                    <div className='w-40'>
                      <CustomButton
                        onClick={() => handleEdit(item)} type='button'
                        color='orange'
                        padding_x='4'
                        padding_smx='6'
                        padding_mdx='8'
                        padding_y='2'
                        width='full'
                        height='10'
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                        Actualizar
                      </CustomButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
};

export default TitleCRUD;