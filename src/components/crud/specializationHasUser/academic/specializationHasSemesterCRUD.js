import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

import Alert from '../../../alert/alert';
import AlertVerification from '../../../alert/alertVerification';
import WaitingAlert from '../../../alert/waitingAlert';

import { GETRequest, PUTRequest } from '../../../../utils/requestHelpers';
import { filterMultipleItems, sortItems } from '../../../../utils/crudHelpers/searchFilter';
import { renewSession, deniedSession } from '../../../../utils/sessionHelpers';
import ModalCRUD from '../../../modal/modalCRUD';
import FormContainer from '../../../forms/body/formContainer';
import SearchWithSelect from '../../../search/searchWithSelect';
import PaginationButtons from '../../../button/table/paginationButtons';
import TabNavigation from '../../../tab/tabNavigation';
import Table from '../../../table/table';
import CustomButton from '../../../button/customButton';
import SortButton from '../../../sort/sortButton';
import IconOnlyAlert from '../../../alert/iconOnlyAlert';
import SearchSelect from '../../../input/searchSelect';

const SpecializationHasSemesterCRUD = ({ name, urls, title, subtitle }) => {
  const [itemName] = useState(name);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    evaluationStatusID: '',
  });

  const options = [
    { label: `Identificador de la Revisión de la Especialización`, value: 'specializationHasUserID' },
    { label: `Nombre Completo del Estudiante`, value: 'fullName' },
    { label: `Identificador de la Especialización`, value: 'specializationID' },
    { label: `Nombre de la Especialización`, value: 'name' },
    { label: `Identificador del Estado de la Revisión`, value: 'evaluationStatusID' },
    { label: `Nombre del Estado de la Revisión`, value: 'evaluationStatusName' },
    { label: `Identificador del Semestre`, value: 'semesterID' },
    { label: `Fecha de Inicio`, value: 'startDate' },
    { label: `Fecha de Finalización`, value: 'finishDate' },
    { label: `Tipo de Semestre`, value: 'semesterNumber' },
    { label: `Año del Semestre`, value: 'year' },
    { label: `Nombre Completo del Primer Academíco`, value: 'academic1_fullName' },
    { label: `Nombre Completo del Segundo Academíco`, value: 'academic2_fullName' },
    { label: `Nombre Completo del Tercer Academíco`, value: 'academic3_fullName' },
  ];

  const [updateId, setUpdateId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(1);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleUpdate();
  };

  const handleEdit = (item) => {
    setUpdateId(item.specializationHasUserID);
    setNewItem({
      evaluationStatusID: item.evaluationStatusID
    });
    openModal();
  };

  const clearItem = () => {
    setUpdateId(null);
    setNewItem({
      evaluationStatusID: '',
    });
  };

  const OptionMessage = async (data) => {
    setMessageWaiting(false);
    if (data.verificationMessage) {
      setMessageVerification(data.verificationMessage);
      fetchItemsSelect('evaluationStatus', urls[1]);
      fetchItemsSelect('semester', urls[2]);
      fetchItems();
      closeModal();
    }
    else if (data.renewalMessage) {
      setMessageVerification(data.renewalMessage);
      await fetchItems();
      fetchItemsSelect('evaluationStatus', urls[1]);
      fetchItemsSelect('semester', urls[2]);
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
    }
    else {
      setMessageError('Error Inesperado');
    }
  };

  const [semester, setSemester] = useState([]);
  const [evaluationStatus, setevaluationStatus] = useState([]);

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
      if (nameSelect === 'evaluationStatus') {
        const sortedItems = sortItems(data, 'evaluationStatusID', 'asc');
        const format = sortedItems.map(item => ({
          value: item.evaluationStatusID,
          label: `${item.name}`,
        }));
        setevaluationStatus(format);
      }
      else if (nameSelect === 'semester') {
        const sortedItems = sortItems(data, 'finishDate', 'desc');
        setSemester(sortedItems);
      }
    }
    else {
      setMessageError('Error Inesperado');
    }
  };

  // -------------------------------Funciones para la Paginacion-------------------------------
  const [searchType, setSearchType] = useState('specializationHasUserID');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType2] = useState('semesterID');
  const [searchTerm2, setSearchTerm2] = useState('');

  const [sortDirection, setSortDirection] = useState('desc');
  const [sortProperty, setSortProperty] = useState('finishDate');

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const searchParamsArray = [
      { searchType, searchTerm },
      { searchType: searchType2, searchTerm: searchTerm2 }
    ];
    const filteredItems = filterMultipleItems(items, searchParamsArray);
    const sortedItems = sortItems(filteredItems, sortProperty, sortDirection);
    return sortedItems.slice(startIndex, endIndex);
  };

  const getNumberFiltered = () => {
    const searchParamsArray = [
      { searchType, searchTerm },
      { searchType: searchType2, searchTerm: searchTerm2 }
    ];
    const filteredItems = filterMultipleItems(items, searchParamsArray);
    return filteredItems.length;
  }

  // -------------------------------Funciones de Extra-------------------------------
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      // Coloca el código que deseas ejecutar solo una vez aquí
      fetchItems();
      fetchItemsSelect('evaluationStatus', urls[1]);
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
        <tr key={item.specializationHasUserID} className='text-center'>
          <td className='px-4 py-2'>{item.specializationHasUserID}</td>
          <td className='whitespace-nowrap px-4 py-2'>{item.fullName}</td>
          <td className='px-4 py-2'>{item.specializationID}</td>
          <td className='whitespace-nowrap px-4 py-2'>{item.name}</td>
          <td className='px-4 py-2'>{item.evaluationStatusID}</td>
          <td className='px-4 py-2'>{item.evaluationStatusName}</td>
          <td className='px-4 py-2'>{item.semesterID}</td>
          <td className='px-4 py-2'>{item.startDate}</td>
          <td className='px-4 py-2'>{item.finishDate}</td>
          <td className='px-4 py-2'>{item.semesterNumber}</td>
          <td className='px-4 py-2'>{item.year}</td>
          <td className='px-4 py-2'>{item.academic1_fullName}</td>
          <td className='px-4 py-2'>{item.academic2_fullName}</td>
          <td className='px-4 py-2'>{item.academic3_fullName}</td>
          <td className='px-4 py-2'>
            <div className='w-full flex-1 sm:w-60'>
              <CustomButton onClick={() => handleEdit(item)} type='button' color='orange' padding_x='4' padding_smx='6' padding_mdx='8' padding_y='2' width='full' height='10'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                Actualizar Estado
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
        <FormContainer
          createMessage={`Asignar Academícos`}
          create2Message={`Asignación de Academícos`}
          updateId={updateId}
          itemName={itemName}
          pText={''}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        >
          <SearchSelect
            selectId='evaluationStatusID'
            placeholder="Seleccionar un Estado de la Evaluacion"
            options={evaluationStatus}
            value={newItem.evaluationStatusID}
            onChange={(selectedOption) => setNewItem({ ...newItem, evaluationStatusID: selectedOption.value })}
          />
        </FormContainer>
      </ModalCRUD>

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
        <TabNavigation setSearchTerm={setSearchTerm2} currentTab={currentTab} setCurrentTab={setCurrentTab} items={semester} itemsPerPage={1} />
        <Table theadContent={theadContent} tbodyContent={tbodyContent} />
      </div>
    </div >
  );
};

export default SpecializationHasSemesterCRUD;