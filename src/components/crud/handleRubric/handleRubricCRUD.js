import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { PDFViewer } from '@react-pdf/renderer';

import ModalCRUD from '../../modal/modalCRUD';
import ModalFile from '../../modal/modalFile';
import Alert from '../../alert/alert';
import AlertVerification from '../../alert/alertVerification';
import WaitingAlert from '../../alert/waitingAlert';
import IconOnlyAlert from '../../alert/iconOnlyAlert'

import { GETRequest, POSTRequest, PUTRequest, DELETERequest } from '../../../utils/requestHelpers';
import { sortItems } from '../../../utils/crudHelpers/searchFilter';
import { renewSession, deniedSession } from '../../../utils/sessionHelpers';
import CustomButton from '../../button/customButton';
import FormContainer from '../../forms/body/formContainer';
import FormContainerNotUpdate from '../../forms/body/formContainerNotUpdate'
import TextInput from '../../input/textInput';
import TextArea from '../../input/textArea';
import SearchSelect from '../../input/searchSelect';
import TableRubric from '../../table/tableRubric';
import ExportPDF from './exportPDF/exportPDF';

const CustomPath = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
    </svg>
  );
};

const areObjectsEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

const compareQuestions = (currentQuestions, initialQuestions) => {
  const createdQuestions = currentQuestions.filter(
    (currentQ) => !initialQuestions.some((initialQ) => initialQ.rubricHasQuestionID === currentQ.rubricHasQuestionID)
  );
  const modifiedQuestions = currentQuestions.filter(
    (currentQ) =>
      initialQuestions.some(
        (initialQ) =>
          initialQ.rubricHasQuestionID === currentQ.rubricHasQuestionID &&
          (!areObjectsEqual(initialQ, currentQ) || initialQ.questionID !== currentQ.questionID)
      )
  );
  const deletedQuestions = initialQuestions.filter(
    (initialQ) => !currentQuestions.some((currentQ) => initialQ.rubricHasQuestionID === currentQ.rubricHasQuestionID)
  );

  return {
    createdQuestions,
    modifiedQuestions,
    deletedQuestions,
  };
};

const HandleRubricCRUD = ({ showRubric, evaluateID, specializationHasSemesterID, specializationHasStudent, name, urls, title, subtitle }) => {
  const [itemName] = useState(name);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    rubricName: 0,
    description: '',
    comment: '',
    statusID: '',
  });

  const [rubricHasQuestion, setRubricHasQuestion] = useState([]);
  const [defaultRubricHasQuestion, setDefaultRubricHasQuestion] = useState([]);
  const [question, setQuestion] = useState([]);
  const [defaultQuestion, setDefaultQuestion] = useState([]);
  const [status, setStatus] = useState([]);

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
          specializationHasSemesterID,
          evaluateID,
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
        const config = { ...newItem, access_token, evaluateID, specializationHasSemesterID };
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
          rubricID: updateId,
          ...newItem,
          access_token,
          specializationHasSemesterID
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

  const handleUpdateStatus = async (event) => {
    event.preventDefault();
    if (updateId === null) return;

    try {
      const url = urls[1];
      const access_token = Cookies.get('access_token');
      if (access_token) {
        setMessageWaiting(true);
        const config = {
          rubricID: updateId,
          ...newItem,
          access_token,
          specializationHasSemesterID
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
    if (updateId !== null) {
      await handleUpdate();
    } else {
      await handleCreate();
    }
  };

  const handleEdit = (item) => {
    setUpdateId(item.rubricID);
    setNewItem({
      rubricName: item.rubricName,
      description: item.description,
      comment: item.comment,
      statusID: item.statusID,
    })
    openModal();
  };

  const handleEditStatus = (item) => {
    setUpdateId(item.rubricID);
    setNewItem({
      rubricName: item.rubricName,
      description: item.description,
      comment: item.comment,
      statusID: item.statusID,
    })
    openModalStatus();
  };

  const clearItem = () => {
    setUpdateId(null);
    setNewItem({
      rubricName: 0,
      description: '',
      comment: '',
      statusID: '',
    })
  };

  const OptionMessage = async (data) => {
    setMessageWaiting(false);
    if (data.verificationMessage) {
      setMessageVerification(data.verificationMessage);
      await fetchItemsSelect('rubricHasQuestion', urls[2]);
      fetchItems();
      closeModal();
      closeModalStatus();
    }
    else if (data.renewalMessage) {
      setMessageVerification(data.renewalMessage);
      await fetchItemsSelect('status', urls[1]);
      await fetchItems();
      await fetchItemsSelect('rubricHasQuestion', urls[2]);
      await fetchItemsSelect('defaultQuestion', urls[5]);
      fetchItemsSelect('question', urls[4]);
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

  const fetchItemsSelect = async (nameSelect, url) => {
    try {
      const access_token = Cookies.get('access_token');
      if (access_token) {
        setMessageWaiting(true);
        const config = {
          access_token,
          specializationHasSemesterID,
          evaluateID,
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
      if (nameSelect === 'rubricHasQuestion') {
        const sortedItems = sortItems(data, 'questionID', 'asc');
        setDefaultRubricHasQuestion(data);
        setRubricHasQuestion(sortedItems);
      }
      else if (nameSelect === 'question') {
        const sortedItems = sortItems(data, 'questionID', 'asc');
        const format = sortedItems.map(item => ({
          value: item.questionID,
          label: item.question,
        }));
        setQuestion(format);
      }
      else if (nameSelect === 'defaultQuestion') {
        const sortedItems = sortItems(data, 'questionID', 'asc');
        setDefaultQuestion(sortedItems);
      }
      else if (nameSelect === 'status') {
        const sortedItems = sortItems(data, 'statusID', 'asc');
        const format = sortedItems.map(item => ({
          value: item.statusID,
          label: item.name
        }));
        setStatus(format);
      }
    }
    else {
      setMessageError('Error Inesperado');
    }
  };

  const handleCreateRubricHasQuestion = async (createdValues) => {
    try {
      const url = urls[3];
      const access_token = Cookies.get('access_token');
      if (access_token) {
        setMessageWaiting(true);
        const chunkSize = process.env.REACT_APP_MAX_LENGTH_ARRAY_DATA;
        for (let i = 0; i < createdValues.length; i += chunkSize) {
          const chunk = createdValues.slice(i, i + chunkSize);
          const config = {
            access_token: access_token,
            dataArray: chunk,
          };
          const response = await POSTRequest(url, config);
          OptionMessage(response);
        }
      } else {
        setMessageError('No tienes una session');
      }
    } catch (error) {
      setMessageWaiting(false);
      setMessageError(`Error creating ${itemName}:` + error.message);
    }
  };

  const handleUpdateRubricHasQuestion = async (modifiedValues) => {
    try {
      const url = urls[3];
      const access_token = Cookies.get('access_token');
      if (access_token) {
        setMessageWaiting(true);
        const chunkSize = process.env.REACT_APP_MAX_LENGTH_ARRAY_DATA;
        for (let i = 0; i < modifiedValues.length; i += chunkSize) {
          const chunk = modifiedValues.slice(i, i + chunkSize);
          const config = {
            access_token: access_token,
            rubricHasQuestionArray: chunk,
          };
          const response = await PUTRequest(url, config);
          OptionMessage(response);
        }
      } else {
        setMessageError('No tienes una session');
      }
    } catch (error) {
      setMessageWaiting(false);
      setMessageError(`Error updating ${itemName}:` + error.message);
    }
  };

  const handleDeleteSelected = async (deletedValues, rubricID) => {
    try {
      const url = urls[3];
      const access_token = Cookies.get('access_token');
      if (access_token) {
        setMessageWaiting(true);
        const chunkSize = process.env.REACT_APP_MAX_LENGHT_ARRAY_NUMBER;
        for (let i = 0; i < deletedValues.length; i += chunkSize) {
          const chunk = deletedValues.slice(i, i + chunkSize);
          const config = {
            access_token: access_token,
            rubricHasQuestionIDs: chunk,
            rubricID,
          };
          const response = await DELETERequest(url, config);
          OptionMessage(response);
        }
      } else {
        setMessageError('No tienes una sesión');
      }
    } catch (error) {
      setMessageWaiting(false);
      setMessageError(`Error deleting ${itemName}:` + error.message);
    }
  };

  // -------------------------------Funciones para la Paginacion-------------------------------

  const [sortDirection] = useState('asc');
  const [sortProperty] = useState('rubricID');

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // Ordenar los elementos según la dirección de ordenamiento y la propiedad seleccionada
    const sortedItems = sortItems(items, sortProperty, sortDirection);
    return sortedItems.slice(startIndex, endIndex);
  };

  const handleSaveChanges = async () => {
    const { createdQuestions, modifiedQuestions, deletedQuestions } = compareQuestions(
      rubricHasQuestion,
      defaultRubricHasQuestion
    );
    const createdValues = createdQuestions
      .filter(item => item.questionID !== "")
      .map(item => ({
        questionID: item.questionID,
        rubricID: item.rubricID,
        excellent: item.excellent,
        good: item.good,
        medium: item.medium,
        bad: item.bad,
      }));

    if (createdValues.length === 0 && modifiedQuestions.length === 0 && deletedQuestions.length === 0) {
      setMessageVerification("No se ha realizado ningun cambio");
    }
    if (createdValues.length > 0) {
      if (createdValues.length > 0) {
        await handleCreateRubricHasQuestion(createdValues);
      }
    }
    if (modifiedQuestions.length > 0) {
      const modifiedValues = modifiedQuestions.map(item => ({
        rubricHasQuestionID: item.rubricHasQuestionID,
        questionID: item.questionID,
        rubricID: item.rubricID,
        excellent: item.excellent,
        good: item.good,
        medium: item.medium,
        bad: item.bad,
      }));
      await handleUpdateRubricHasQuestion(modifiedValues);
    }
    if (deletedQuestions.length > 0) {
      const rubricID = deletedQuestions[0].rubricID;
      const deletedValues = deletedQuestions.map(item => item.rubricHasQuestionID);
      await handleDeleteSelected(deletedValues, rubricID);
    }
  };

  // -------------------------------Funciones de Extra-------------------------------

  const isMounted = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchItemsSelect('status', urls[1]);
        await fetchItems();
        await fetchItemsSelect('rubricHasQuestion', urls[2]);
        await fetchItemsSelect('defaultQuestion', urls[5]);
        fetchItemsSelect('question', urls[4]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (!isMounted.current && showRubric) {
      isMounted.current = true;
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showRubric]);

  const [messageError, setMessageError] = useState(null);
  const [messageVerification, setMessageVerification] = useState(null);
  const [messageWaiting, setMessageWaiting] = useState(null);

  const closeAlert = () => {
    setMessageError(null);
    setMessageVerification(null);
  }

  const handleExportPDF = () => {
    if (rubricHasQuestion === 0) {
      setMessageError("La rubrica ha generar esta vacia.");
      return;
    }
    openModalFile();
  };

  // -------------------------------Funciones para los Modal-------------------------------
  const [ModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    clearItem();
  };

  const [ModalOpenFile, setModalOpenFile] = useState(false);

  const openModalFile = () => {
    setModalOpenFile(true);
  };
  const closeModalFile = () => {
    setModalOpenFile(false);
  };

  const [ModalOpenStatus, setModalOpenStatus] = useState(false);

  const openModalStatus = () => {
    setModalOpenStatus(true);
  };
  const closeModalStatus = () => {
    setModalOpenStatus(false);
    clearItem();
  };

  return (
    <div>
      {messageWaiting && <WaitingAlert />}
      {messageError && <Alert message={messageError} onClose={closeAlert} />}
      {messageVerification && (<AlertVerification message={messageVerification} onClose={closeAlert} />)}

      <ModalCRUD isOpen={ModalOpen} >
        <FormContainer
          updateId={updateId}
          itemName={itemName}
          pText={''}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        >
          <TextInput
            inputId='rubricName'
            value={newItem.rubricName}
            onChange={(e) => setNewItem({ ...newItem, rubricName: e.target.value })}
            placeholder={`Ingresar Nombre de la Rubrica`}
          />
          <TextArea
            inputId='description'
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            placeholder={`Ingresar Descripcion`}
          />
          <TextArea
            inputId='comment'
            value={newItem.comment}
            onChange={(e) => setNewItem({ ...newItem, comment: e.target.value })}
            placeholder={`Ingresar Comentario`}
          />
        </FormContainer>
      </ModalCRUD>

      <ModalCRUD isOpen={ModalOpenStatus}>
        <FormContainerNotUpdate
          message={'Actualizar Estado'}
          secondaryMessage={'Actualización del Estado de la Evaluación'}
          pText={''}
          messageButton={'Actualizar Estado'}
          handleSubmit={handleUpdateStatus}
          closeModal={closeModalStatus}
          customPath={<CustomPath />}
        >
          <SearchSelect
            selectId='statusID'
            placeholder="Seleccione Estado de la Rubrica"
            options={status}
            value={newItem.statusID}
            onChange={(selectedOption) => setNewItem({ ...newItem, statusID: selectedOption.value })}
          />
        </FormContainerNotUpdate>
      </ModalCRUD>

      <ModalFile isOpen={ModalOpenFile} onClose={closeModalFile}>
        <div className="w-full h-screen">
          <PDFViewer width="100%" height="100%">
            <ExportPDF rubricHasQuestion={rubricHasQuestion} />
          </PDFViewer>
        </div>
      </ModalFile>

      <div className='min-h-screen my-2'>
        {(items.length === 0 && !messageWaiting) &&
          <div className='w-full'>
            <CustomButton
              onClick={openModal}
              type="button"
              color="orange"
              padding_x="4"
              padding_smx="0"
              padding_mdx="0"
              padding_y="2"
              width="full"
              height="10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Crear Rubrica
            </CustomButton>
          </div>
        }
        {(items.length > 0) &&
          <TableRubric items={getCurrentPageItems()} defaultRubricHasQuestion={defaultRubricHasQuestion} rubricHasQuestion={rubricHasQuestion} setRubricHasQuestion={setRubricHasQuestion} question={question} defaultQuestion={defaultQuestion} handleEditStatus={handleEditStatus} handleEdit={handleEdit} handleSaveChanges={handleSaveChanges} handleExportPDF={handleExportPDF} />
        }
      </div>
    </div >
  );
};

export default HandleRubricCRUD;