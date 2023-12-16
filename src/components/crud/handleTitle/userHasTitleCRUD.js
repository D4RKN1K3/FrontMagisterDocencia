import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from "react-router-dom";

import ModalCRUD from '../../modal/modalCRUD';
import Alert from '../../alert/alert';
import AlertVerification from '../../alert/alertVerification';
import WaitingAlert from '../../alert/waitingAlert';
import IconOnlyAlert from '../../alert/iconOnlyAlert'
import CustomButton from '../../button/customButton';

import { GETRequest, POSTFileRequest, PUTRequest, DELETERequest } from '../../../utils/requestHelpers';
import { filterItems, sortItems } from '../../../utils/crudHelpers/searchFilter';
import { renewSession, deniedSession } from '../../../utils/sessionHelpers';
import ItemListHeader from '../../forms/header/itemListHeader';
import SearchWithSelect from '../../search/searchWithSelect';
import SortButton from '../../sort/sortButton';
import PaginationButtons from '../../button/table/paginationButtons';
import FormContainer from '../../forms/body/formContainer';
import Checkbox from '../../input/checkbox';
import FileDropzone from '../../input/fileDropzone';
import SearchSelect from '../../input/searchSelect';
import FilterPanel from '../../search/filterPanel';
import ItemsList from '../../sections/itemsList';

import FileIcon from '../../image/fileIcon';

const UserHasTitleCRUD = ({ name, urls, title, subtitle }) => {
  const [itemName] = useState(name);
  const navigate = useNavigate();
  const { userID } = useParams();

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    titleID: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const options = [
    { label: `Identificador de la ${itemName}`, value: 'userHasTitleID' },
    { label: `Nombre del Título`, value: 'title.name' },
    { label: `Formato de la ${itemName}`, value: 'format.name' },
  ];
  const [selectTitle, setSelectTitle] = useState([]);
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
          userID,
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

  const handleFileChange = async (file) => {
    setSelectedFile(file);
    setMessageVerification("Se ha Cargado el Archivo");
  };

  const handleCreate = async () => {
    try {
      const url = urls[0];
      const access_token = Cookies.get('access_token');
      if (access_token) {
        if (selectedFile) {
          setMessageWaiting(true);
          const config = {
            access_token,
            userID,
            ...newItem,
          };
          const response = await POSTFileRequest(url, config, selectedFile);
          OptionMessage(response);
        }
        else {
          setMessageError('No se ha subido ningún archivo');
        }
      } else {
        setMessageError('No tienes una sesión');
      }
    } catch (error) {
      setMessageWaiting(false);
      setMessageError(`Error importing ${itemName}:` + error.message);
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
          access_token,
          userHasTitleID: updateId,
          ...newItem,
        };
        const response = await PUTRequest(url, config);
        OptionMessage(response);
      } else {
        setMessageError('No tienes una sesión');
      }
    } catch (error) {
      setMessageWaiting(false);
      setMessageError(`Error importing ${itemName}:` + error.message);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const url = urls[0];
      const access_token = Cookies.get('access_token');
      if (access_token) {
        setMessageWaiting(true);
        if (selectedItems.length !== 0) {
          const idsToDelete = selectedItems.map(item => item.userHasTitleID);

          const chunkSize = process.env.REACT_APP_MAX_LENGHT_ARRAY_NUMBER;
          for (let i = 0; i < idsToDelete.length; i += chunkSize) {
            const chunk = idsToDelete.slice(i, i + chunkSize);

            const config = {
              access_token: access_token,
              userHasTitleIDs: chunk,
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
    setUpdateId(item.userHasTitleID);
    setNewItem({
      titleID: item.titleID,
    });
    openModal();
  };

  const clearItem = () => {
    setUpdateId(null);
    setNewItem({
      titleID: '',
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
        prevSelectedItems.filter((selectedItem) => selectedItem.userHasTitleID !== item.userHasTitleID)
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
      fetchItemsSelect(urls[1]);
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
  const fetchItemsSelect = async (url) => {
    try {
      const access_token = Cookies.get('access_token');
      if (access_token) {
        setMessageWaiting(true);
        const config = {
          access_token,
        };

        const response = await GETRequest(url, config);
        OptionMessageSelect(response);
      } else {
        setMessageError('No tienes una session');
      }
    } catch (error) {
      setMessageWaiting(false);
      setMessageError(`Error seaching ${itemName}:` + error.message);
    }
  };

  const OptionMessageSelect = async (data) => {
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
      const sortedItems = sortItems(data, 'titleID', 'asc');
      const format = sortedItems.map(item => ({
        value: item.titleID,
        label: item.name
      }));
      setSelectTitle(format);
    }
    else {
      setMessageError('Error Inesperado');
    }
  };

  // -------------------------------Funciones para la Paginacion-------------------------------
  const [searchType, setSearchType] = useState('userHasTitleID');
  const [searchTerm, setSearchTerm] = useState('');

  const [sortDirection, setSortDirection] = useState('asc');
  const [sortProperty, setSortProperty] = useState('userHasTitleID');

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
    if (userID) {
      if (!isMounted.current) {
        isMounted.current = true;
        // Coloca el código que deseas ejecutar solo una vez aquí
        fetchItems();
        fetchItemsSelect(urls[1]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

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
          <SearchSelect
            selectId='titleID'
            placeholder="Seleccione un Título"
            options={selectTitle}
            value={newItem.titleID}
            onChange={(selectedOption) => setNewItem({ ...newItem, titleID: selectedOption.value })}
          />
          {(!updateId) && (
            <FileDropzone onFileChange={handleFileChange} />
          )}
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
        <FilterPanel message={'Ordenar Títulos del Estudiante'}>
          <ul className="border-t border-gray-200 p-2 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
            {options.map((option) => (
              <li key={option.value} className="inline-flex start-center md:justify-center items-center my-1 md:my-2 gap-2">
                <SortButton
                  value={option.value}
                  sortProperty={sortProperty}
                  setSortProperty={setSortProperty}
                  setSortDirection={setSortDirection}
                  isActive={sortProperty === option.value}
                  isAscending={sortDirection === 'asc'}
                />
                <span className="text-sm font-medium text-gray-700">
                  {option.label}
                </span>
              </li>
            ))}
          </ul>
        </FilterPanel>

        <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} length={items.length} itemsPerPage={ITEMS_PER_PAGE} numberFiltered={getNumberFiltered()} />

        <ItemsList message={'Selecionar Todos los Titulos del Estudiante'} selectAll={selectAll} handleSelectAllChange={handleSelectAllChange}>
          <>
            {items.length === 0 && messageWaiting && (
              <div colSpan={options.length} className="w-full h-96 translate-x-1/2 translate-y-1/2">
                <IconOnlyAlert />
              </div>
            )}
            {getCurrentPageItems().map((item) => (
              <div key={item.userHasTitleID} className="flex flex-col justify-center text-center relative">
                <div className="absolute top-0 left-0">
                  <Checkbox
                    id={`deleteInput-${item.userHasTitleID}`}
                    name={`deleteInput-${item.userHasTitleID}`}
                    checked={selectedItems.some((selectedItem) => selectedItem.userHasTitleID === item.userHasTitleID)}
                    onChange={(e) => handleCheckboxChange(e, item)}
                  />
                </div>
                <div className="flex-1 my-2 inline-flex justify-center items-center my-1 md:my-2 gap-2">
                  <FileIcon format={item.format.name} />
                </div>
                <h4 className="text-xl font-semibold">{item.userHasTitleID}</h4>
                <p className="text-sm text-gray-700 mb-2">{item.title.name}</p>

                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-full flex-1 sm:w-52">
                    <a href={item.documentTitle} target="_blank" rel="noopener noreferrer">
                      <CustomButton
                        type="button"
                        color='orange'
                        padding_x='4'
                        padding_smx='6'
                        padding_mdx='8'
                        padding_y='2'
                        width='full'
                        height='10'
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Ver {itemName}
                      </CustomButton>
                    </a>
                  </div>
                  <div className="w-full flex-1 sm:w-52">
                    <CustomButton
                      onClick={() => handleEdit(item)}
                      type='button'
                      color='orange'
                      padding_x='4'
                      padding_smx='6'
                      padding_mdx='8'
                      padding_y='2'
                      width='full'
                      height='10'
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                      </svg>
                      Actualizar
                    </CustomButton>
                  </div>
                </div>

              </div>
            ))}
          </>
        </ItemsList>

      </div>
    </div >
  );
};

export default UserHasTitleCRUD;