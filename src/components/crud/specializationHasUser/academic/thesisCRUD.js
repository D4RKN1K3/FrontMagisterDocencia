import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from "react-router-dom";

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
import PageHeader from '../../../forms/header/pageHeader';

const ThesisCRUD = ({ name, urls, title, subtitle, stageID }) => {
  const [itemName] = useState(name);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    evaluationStatusID: '',
  });

  const options = [
    { label: `Identificador de la Revisión de la Especialización`, value: 'specializationHasSemesterID' },
    { label: `Rut del Estudiante`, value: 'rut' },
    { label: `Nombre Completo del Estudiante`, value: 'fullName' },
    { label: `Email del Estudiante`, value: 'email' },
    { label: `Nombre de la Especialización`, value: 'name' },
    { label: `Tipo de Evaluacion`, value: 'typeEvaluateName' },
    { label: `Nombre del Estado de la Revisión`, value: 'evaluationStatusName' },
    { label: `Estado` , value: 'statusName'},
    { label: `Rut del Director`, value: 'director_rut' },
    { label: `Rut del Co-Director`, value: 'codirector_rut' },
    { label: `Nombre Completo del Director`, value: 'director_fullName' },
    { label: `Nombre Completo del Co-Director`, value: 'codirector_fullName' },
    { label: `Email del Director`, value: 'director_email' },
    { label: `Email del Co-Director`, value: 'codirector_email' },
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
          specializationHasSemesterID: updateId,
          ...newItem,
          access_token,
          semesterID : semester[0].semesterID,
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
    setUpdateId(item.specializationHasSemesterID);
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
  const [searchType, setSearchType] = useState('specializationHasSemesterID');
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
      <th className='whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900'>
        Asignar de Académicos
      </th>
      {options.map((option) => (
        <th key={option.value} className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
          <div className='flex items-center justify-center text-center gap-1'>
            {option.label}
            <SortButton value={option.value} sortProperty={sortProperty} setSortProperty={setSortProperty} setSortDirection={setSortDirection} isActive={sortProperty === option.value} isAscending={sortDirection === 'asc'} />
          </div>
        </th>
      ))}
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
        <tr key={item.specializationHasSemesterID} className='text-center'>
          <td className='px-4 py-2 flex flex-row gap-1'>
            <div className='flex-1 sm:w-60'>
              <CustomButton onClick={() => handleEdit(item)} type='button' color='orange' padding_x='4' padding_smx='6' padding_mdx='8' padding_y='2' width='full' height='10'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                Actualizar Evaluación
              </CustomButton>
            </div>
            <div className='flex-1 sm:w-60'>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                to={`/Administrative/Academic/Evaluate/Thesis/${item.specializationHasUserID}/${item.specializationHasSemesterID}/${stageID}`}
              >
                <CustomButton
                  type="button"
                  color='orange'
                  padding_x='4'
                  padding_smx='6'
                  padding_mdx='8'
                  padding_y='2'
                  width='full'
                  height='full'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />                                                </svg>
                  {(stageID === 1) ? 'Etapa 1' : 'Etapa 2'}
                </CustomButton>
              </Link>
            </div>
          </td>
          <td className='px-4 py-2'>{item.specializationHasSemesterID}</td>
          <td className='whitespace-nowrap px-4 py-2'>{item.rut}</td>
          <td className='whitespace-nowrap px-4 py-2'>{item.fullName}</td>
          <td className='whitespace-nowrap px-4 py-2'>{item.email}</td>
          <td className='whitespace-nowrap px-4 py-2'>{item.name}</td>
          <td className='px-4 py-2'>{item.typeEvaluateName}</td>
          <td className='px-4 py-2'>{item.evaluationStatusName}</td>
          <td className='px-4 py-2'>{item.statusName}</td>
          <td className='px-4 py-2'>{item.director_rut}</td>
          <td className='px-4 py-2'>{item.codirector_rut}</td>
          <td className='px-4 py-2'>{item.director_fullName}</td>
          <td className='px-4 py-2'>{item.codirector_fullName}</td>
          <td className='px-4 py-2'>{item.director_email}</td>
          <td className='px-4 py-2'>{item.codirector_email}</td>
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
          updateMessage={`Actualizar Evaluación`}
          update2Message={`Actualización de la Evaluación`}
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
        <PageHeader title={title} subtitle={subtitle} />
        <SearchWithSelect selectId={`${searchType}`} searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchType={searchType} setSearchType={setSearchType} options={options} />
        <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} length={items.length} itemsPerPage={ITEMS_PER_PAGE} numberFiltered={getNumberFiltered()} />
        <TabNavigation setSearchTerm={setSearchTerm2} currentTab={currentTab} setCurrentTab={setCurrentTab} items={semester} itemsPerPage={1} />
        <Table theadContent={theadContent} tbodyContent={tbodyContent} />
      </div>
    </div >
  );
};

export default ThesisCRUD;