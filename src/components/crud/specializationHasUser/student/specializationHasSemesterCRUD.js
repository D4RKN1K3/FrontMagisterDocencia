import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from "react-router-dom";

import Alert from '../../../alert/alert';
import AlertVerification from '../../../alert/alertVerification';
import WaitingAlert from '../../../alert/waitingAlert';

import { GETRequest, POSTRequest, PUTRequest, DELETERequest } from '../../../../utils/requestHelpers';
import { filterItems, sortItems } from '../../../../utils/crudHelpers/searchFilter';
import { renewSession, deniedSession } from '../../../../utils/sessionHelpers';
import SearchWithSelect from '../../../search/searchWithSelect';
import PaginationButtons from '../../../button/table/paginationButtons';
import SearchSelect from '../../../input/searchSelect';
import SpecializationHasSemesterSection from '../../../sections/specialization/specializationHasSemesterSection';

const SpecializationHasSemesterCRUD = ({ name, urls, title, subtitle }) => {
  const [itemName] = useState(name);
  const navigate = useNavigate();
  const { specializationHasUserID } = useParams();

  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [newItem, setNewItem] = useState({
    typeEvaluateID: '',
    semesterID: '',
  });

  const options = [
    { label: `Nombre de la ${itemName}`, value: 'typeEvaluateName' },
    { label: `Nombre de la Especialización`, value: 'name' },
    { label: `Fecha de Inicio`, value: 'startDate' },
    { label: `Fecha de Finalización`, value: 'finishDate' },
    { label: `Numero del Semestre`, value: 'semesterNumber' },
    { label: `Año del Semestre`, value: 'year' },
    { label: `Estado`, value: 'statusName' },
    { label: `Estado de la Evaluación`, value: 'evaluationStatusName'},
    { label: `Descripcion del Estado de la Evaluación`, value: 'description'},
    { label: `Nombre Completo del Académico Guia`, value: 'guideAcademic_fullName' },
    { label: `Nombre Completo del Académico A`, value: 'academicA_fullName' },
    { label: `Nombre Completo del Académico B`, value: 'academicB_fullName' },
    { label: `Email del Académico Guia`, value: 'guideAcademic_email' },
    { label: `Email del Académico A`, value: 'academicA_email' },
    { label: `Email del Académico B`, value: 'academicB_email' },
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
          specializationHasUserID,
        };
        const response = await GETRequest(url, config);
        console.log(response)
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
        const config = { ...newItem, specializationHasUserID, access_token };
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
          specializationHasSemesterID: updateId,
          ...newItem,
          specializationHasUserID,
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
          const idsToDelete = selectedItems.map(item => item.specializationHasSemesterID);

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
    setUpdateId(item.specializationHasSemesterID);
    setNewItem({
      ...newItem,
      typeEvaluateID: item.typeEvaluateID,
    });
  };

  const clearItem = () => {
    setUpdateId(null);
    setNewItem({
      ...newItem,
      typeEvaluateID: '',
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
      fetchItemsSelect('typeEvaluate', urls[1]);
      fetchItemsSelect('semester', urls[2]);
    }
    else if (data.errorDenied) {
      setMessageError(data.errorDenied);
      deniedSession(navigate);
    }
    else if (data.expirationError) {
      const renewedData = await renewSession();
      await fetchItemsSelect('typeEvaluate', urls[1]);
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
  const [typeEvaluate, setTypeEvaluate] = useState([]);
  const [semester, setSemester] = useState([]);

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
      if (nameSelect === 'typeEvaluate') {
        const sortedItems = sortItems(data, 'typeEvaluateID', 'asc');
        const format = sortedItems.map(item => ({
          value: item.typeEvaluateID,
          label: item.name
        }));
        setTypeEvaluate(format);
      }
      else if (nameSelect === 'semester') {
        const sortedItems = sortItems(data, 'finishDate', 'desc');
        setNewItem({
          ...newItem,
          semesterID: sortedItems[0].semesterID,
        });
        setSemester(sortedItems[0]);
      }
    }
    else {
      setMessageError('Error Inesperado');
    }
  };

  // -------------------------------Funciones para la Paginacion-------------------------------
  const [searchType, setSearchType] = useState('specializationHasSemesterID');
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
      fetchItemsSelect('typeEvaluate', urls[1]);
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
        <div className="text-center mb-4">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            {title}
          </h1>
          <p className="text-md sm:text-lg font-medium text-gray-500">
            {subtitle}
          </p>
        </div>

        <SearchWithSelect selectId={`${searchType}`} searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchType={searchType} setSearchType={setSearchType} options={options} />

        <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} length={items.length} itemsPerPage={ITEMS_PER_PAGE} numberFiltered={getNumberFiltered()} />

        <SpecializationHasSemesterSection updateId={updateId} itemName={itemName} semester={semester} items={getCurrentPageItems()} selectedItems={selectedItems} handleDeleteSelected={handleDeleteSelected} handleCheckboxChange={handleCheckboxChange} handleEdit={handleEdit} handleSubmit={handleSubmit} closeModal={closeModal}>
          <SearchSelect
            selectId='typeEvaluateID'
            placeholder="Seleccione Tipo de Evaluación"
            options={typeEvaluate}
            value={newItem.typeEvaluateID}
            onChange={(selectedOption) => setNewItem({ ...newItem, typeEvaluateID: selectedOption.value })}
          />
        </SpecializationHasSemesterSection>
      </div>
    </div >
  );
};

export default SpecializationHasSemesterCRUD;