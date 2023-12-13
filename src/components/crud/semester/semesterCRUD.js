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
import DateInput from '../../input/dateInput';
import Table from '../../table/table';

const SemesterCRUD = ({ name, urls, title, subtitle }) => {
  const [itemName] = useState(name);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [newItem, setNewItem] = useState({
    startDate: null,
    finishDate: null,
    year: '',
    semesterNumber: '',
  });

  const options = [
    { label: `Identificador del ${itemName}`, value: 'semesterID' },
    { label: `Año del Semestre`, value: 'year' },
    { label: `Numero del Semestre`, value: 'semesterNumber' },
    { label: `Fecha de Inicio`, value: 'startDate' },
    { label: `Fecha de Finalización`, value: 'finishDate' },
  ];

  const semester = [
    { value: 1, label: 'Primer Semestre' },
    { value: 2, label: 'Segundo Semestre' },
  ];

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
      console.log(newItem)
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
          semesterID: updateId,
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
          const idsToDelete = selectedItems.map(item => item.semesterID);

          const chunkSize = process.env.REACT_APP_MAX_LENGHT_ARRAY_STRING;
          for (let i = 0; i < idsToDelete.length; i += chunkSize) {
            const chunk = idsToDelete.slice(i, i + chunkSize);

            const config = {
              access_token: access_token,
              semesterIDs: chunk,
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
    setUpdateId(item.semesterID);
    setNewItem({
      startDate: item.startDate,
      finishDate: item.finishDate,
      year: item.year,
      semesterNumber: item.semesterNumber,
    });
    openModal();
  };

  const clearItem = () => {
    setUpdateId(null);
    setNewItem({
      startDate: null,
      finishDate: null,
      year: '',
      semesterNumber: '',
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
        prevSelectedItems.filter((selectedItem) => selectedItem.semesterID !== item.semesterID)
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
      if (data.message.error.message !== undefined) {
        setMessageError(data.message.error.message);
        return
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

  // -------------------------------Funciones para la Paginacion-------------------------------
  const [searchType, setSearchType] = useState('semesterID');
  const [searchTerm, setSearchTerm] = useState('');

  const [sortDirection, setSortDirection] = useState('asc');
  const [sortProperty, setSortProperty] = useState('semesterID');

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const filteredItems = filterItems(items, searchTerm, searchType);
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

  // -------------------------------Contenido de los items-------------------------------

  const theadContent = (
    <tr>
      <th className='px-4 py-2'>
        <Checkbox id='deleteAllInput' name='deleteAllInput' checked={selectAll} onChange={handleSelectAllChange} />
      </th>
      {options.map((option) => (
        <th key={option.value} className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
          <div className='flex items-center justify-center text-center gap-1'>
            {option.label}
            <SortButton value={option.value} sortProperty={sortProperty} setSortProperty={setSortProperty} setSortDirection={setSortDirection} isActive={sortProperty === option.value} isAscending={sortDirection === 'asc'} />
          </div>
        </th>
      ))}
      <th className='whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900'>
        Acciones
      </th>
    </tr>
  );

  const tbodyContent = (
    <>
      {items.length === 0 && messageWaiting && (
        <tr>
          <td colSpan={options.length} className="w-1/2 h-96 translate-x-1/4">
            <IconOnlyAlert />
          </td>
        </tr>
      )}
      {getCurrentPageItems().map((item) => (
        <tr key={item.semesterID} className='text-center'>
          <td className='px-4 py-2'>
            <Checkbox id={`deleteInput-${item.semesterID}`} name={`deleteInput-${item.semesterID}`} checked={selectedItems.some((selectedItem) => selectedItem.semesterID === item.semesterID)} onChange={(e) => handleCheckboxChange(e, item)} />
          </td>
          <td className='px-4 py-2'>{item.semesterID}</td>
          <td className='px-4 py-2'>{item.year}</td>
          <td className='px-4 py-2'>{item.semesterNumber}</td>
          <td className='px-4 py-2'>{item.startDate}</td>
          <td className='px-4 py-2'>{item.finishDate}</td>
          <td className='px-4 py-2'>
            <div className='flex gap-2'>
              <CustomButton onClick={() => handleEdit(item)} type='button' color='orange' padding_x='4' padding_smx='6' padding_mdx='8' padding_y='2' width='full' height='10'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                Actualizar
              </CustomButton>
            </div>
          </td>
        </tr>
      ))}
    </>
  );

  return (
    <div>
      {messageWaiting && <WaitingAlert />}
      {messageError && <Alert message={messageError} onClose={closeAlert} />}
      {messageVerification && (<AlertVerification message={messageVerification} onClose={closeAlert} />)}

      <ModalCRUD isOpen={ModalOpen}>
        <FormContainer updateId={updateId} itemName={itemName} pText={'Se recomienda crear solo el semestre actual, ya que este será procesado por todos los usuarios.'} handleSubmit={handleSubmit} closeModal={closeModal}>
          <TextInput
            inputId='yearSemester'
            value={newItem.year}
            onChange={(e) => setNewItem({ ...newItem, year: e.target.value })}
            placeholder={`Ingresar Año del Semestre`}
          />
          <SearchSelect
            selectId='typeID'
            placeholder="Seleccione Tipo de Semestre"
            options={semester}
            value={newItem.semesterNumber}
            onChange={(selectedOption) => setNewItem({ ...newItem, semesterNumber: selectedOption.value })}
          />
          <DateInput
            selectId={'startDate'}
            placeholderText={'Selecciona una Fecha de Inicio'}
            value={newItem.startDate}
            onChange={(selectedDate) => setNewItem({ ...newItem, startDate: selectedDate })}
          />
          <DateInput
            selectId={'finishDate'}
            placeholderText={'Selecciona una Fecha de Finalización'}
            value={newItem.finishDate}
            onChange={(selectedDate) => setNewItem({ ...newItem, finishDate: selectedDate })}
          />
        </FormContainer>
      </ModalCRUD>

      <div className='min-h-screen'>
        <ItemListHeader title={title} subtitle={subtitle} itemName={itemName} openModal={openModal} fetchItems={fetchItems} handleDeleteSelected={handleDeleteSelected} />

        <SearchWithSelect selectId={`${searchType}`} searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchType={searchType} setSearchType={setSearchType} options={options} />

        <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} length={items.length} itemsPerPage={ITEMS_PER_PAGE} numberFiltered={getNumberFiltered()}/>

        <Table theadContent={theadContent} tbodyContent={tbodyContent} />

      </div>
    </div>
  );
};

export default SemesterCRUD;