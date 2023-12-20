import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

import Alert from '../../../alert/alert';
import AlertVerification from '../../../alert/alertVerification';
import WaitingAlert from '../../../alert/waitingAlert';

import { GETRequest, POSTRequest, PUTRequest, DELETERequest } from '../../../../utils/requestHelpers';
import { filterItems, sortItems } from '../../../../utils/crudHelpers/searchFilter';
import { renewSession, deniedSession } from '../../../../utils/sessionHelpers';
import SearchWithSelect from '../../../search/searchWithSelect';
import PaginationButtons from '../../../button/table/paginationButtons';
import SearchSelect from '../../../input/searchSelect';
import SpecializationSection from '../../../sections/specialization/specializationSection';
import PageHeader from '../../../forms/header/pageHeader';

const SpecializationHasSemesterCRUD = ({ name, urls, title, subtitle }) => {
  const [itemName] = useState(name);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [newItem, setNewItem] = useState({
    specializationID: '',
    semesterID: '',
  });

  const options = [
    { label: `Nombre de la ${itemName}`, value: 'specialization.name' },
    { label: `Descripcion del Estado`, value: 'status.name' },
    { label: `Numero del Semestre de Ingreso`, value: 'entrySemester.semesterNumber' },
    { label: `Año de Ingreso`, value: 'entrySemester.year' },
    { label: `Numero del Semestre de Finalización`, value: 'completionSemester.semesterNumber' },
    { label: `Año de Finalización`, value: 'completionSemester.year' },
  ];

  const [updateId, setUpdateId] = useState(null);
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
          specializationHasUserID: updateId,
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
          const idsToDelete = selectedItems.map(item => item.specializationHasUserID);

          const chunkSize = process.env.REACT_APP_MAX_LENGHT_ARRAY_NUMBER;
          for (let i = 0; i < idsToDelete.length; i += chunkSize) {
            const chunk = idsToDelete.slice(i, i + chunkSize);

            const config = {
              access_token,
              specializationHasUserIDs: chunk,
              semesterID: newItem.semesterID,
            };
            console.log(config)
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
    setUpdateId(item.specializationHasUserID);
    setNewItem({
      specializationID: item.specializationID,
      semesterID: item.entrySemester.semesterID,
    });
  };

  const clearItem = () => {
    setUpdateId(null);
    setNewItem({
      specializationID: '',
      semesterID: '',
    });
  };

  const clearCheckbox = () => {
    setSelectedItems([]);
  };

  const handleCheckboxChange = (event, item) => {
    if (event.target.checked) {
      setSelectedItems([item]);
    } else {
      setSelectedItems([]);
    }
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
      fetchItemsSelect('specialization', urls[1]);
      fetchItemsSelect('semester', urls[2]);
    }
    else if (data.errorDenied) {
      setMessageError(data.errorDenied);
      deniedSession(navigate);
    }
    else if (data.expirationError) {
      const renewedData = await renewSession();
      await fetchItemsSelect('specialization', urls[1]);
      await fetchItemsSelect('semester', urls[2]);
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
  const [semester, setSemester] = useState([]);
  const [specialization, setSpecialization] = useState([]);

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
      if (nameSelect === 'specialization') {
        const sortedItems = sortItems(data, 'specializationID', 'asc');
        const format = sortedItems.map(item => ({
          value: item.specializationID,
          label: item.name
        }));
        setSpecialization(format);
      }
      else if (nameSelect === 'semester') {
        const sortedItems = sortItems(data, 'finishDate', 'desc');
        const format = sortedItems.map(item => ({
          value: item.semesterID,
          label: `${item.year} - ${item.semesterNumber === 1 ? 'Primer' : 'Segundo'} Semestre`
        }));
        setSemester(format);
      }
    }
    else {
      setMessageError('Error Inesperado');
    }
  };

  // -------------------------------Funciones para la Paginacion-------------------------------
  const [searchType, setSearchType] = useState('specializationHasUserID');
  const [searchTerm, setSearchTerm] = useState('');

  const [sortDirection] = useState('desc');
  const [sortProperty] = useState('finishDate');

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
      fetchItemsSelect('specialization', urls[1]);
      fetchItemsSelect('semester', urls[2]);
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
  const closeModal = () => {
    clearItem();
  };

  return (
    <div>
      {messageWaiting && <WaitingAlert />}
      {messageError && <Alert message={messageError} onClose={closeAlert} />}
      {messageVerification && (<AlertVerification message={messageVerification} onClose={closeAlert} />)}

      <div className='min-h-screen'>
        <PageHeader title={title} subtitle={subtitle} />

        <SearchWithSelect selectId={`${searchType}`} searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchType={searchType} setSearchType={setSearchType} options={options} />

        <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} length={items.length} itemsPerPage={ITEMS_PER_PAGE} numberFiltered={getNumberFiltered()} />

        <SpecializationSection updateId={updateId} itemName={itemName} items={getCurrentPageItems()} selectedItems={selectedItems} handleDeleteSelected={handleDeleteSelected} handleCheckboxChange={handleCheckboxChange} handleEdit={handleEdit} handleSubmit={handleSubmit} closeModal={closeModal}>
          <SearchSelect
            selectId='semesterID'
            placeholder="Seleccione semestre de ingreso"
            options={semester}
            value={newItem.semesterID}
            onChange={(selectedOption) => setNewItem({ ...newItem, semesterID: selectedOption.value })}
          />
          <SearchSelect
            selectId='specializationID'
            placeholder="Seleccione Especialización"
            options={specialization}
            value={newItem.specializationID}
            onChange={(selectedOption) => setNewItem({ ...newItem, specializationID: selectedOption.value })}
          />
        </SpecializationSection>
      </div>
    </div >
  );
};

export default SpecializationHasSemesterCRUD;