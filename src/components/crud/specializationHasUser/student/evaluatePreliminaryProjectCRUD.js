import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from "react-router-dom";

import ModalCRUD from '../../../modal/modalCRUD';
import Alert from '../../../alert/alert';
import AlertVerification from '../../../alert/alertVerification';
import WaitingAlert from '../../../alert/waitingAlert';
import IconOnlyAlert from '../../../alert/iconOnlyAlert'

import { GETRequest, POSTFileRequest, PUTFileRequest } from '../../../../utils/requestHelpers';
import { sortItems } from '../../../../utils/crudHelpers/searchFilter';
import { renewSession, deniedSession } from '../../../../utils/sessionHelpers';
import ItemListHeaderStage from '../../../forms/header/itemListHeaderStage';
import PaginationButtons from '../../../button/table/paginationButtons';
import FormContainer from '../../../forms/body/formContainer';
import FileDropzone from '../../../input/fileDropzone';
import TableStage from '../../../table/tableStage';
import ModalFile from '../../../modal/modalFile';
import { PDFViewer } from '@react-pdf/renderer';
import ExportPDF from '../../handleRubric/exportPDF/exportPDF';

const EvaluatePreliminaryProjectCRUD = ({ name, urls, title, subtitle }) => {
  const [itemName] = useState(name);
  const navigate = useNavigate();
  const { stageID, specializationHasUserID, specializationHasSemesterID } = useParams();

  const [items, setItems] = useState([]);
  const [specializationHasStudent, setspecializationHasStudent] = useState([]);
  const [rubricHasQuestion, setRubricHasQuestion] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [academicName, setAcamicName] = useState('');

  const [updateId, setUpdateId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = parseInt(process.env.REACT_APP_ITEMS_PER_PAGE, 10);

  // -------------------------------Funciones Para CRUD-------------------------------
  const fetchItems = async (nameSelect, url, params) => {
    try {
      const access_token = Cookies.get('access_token');
      if (access_token) {
        setMessageWaiting(true);
        const config = {
          ...params,
          access_token,
          typeEvaluateID : 1,
        };
        const response = await GETRequest(url, config);
        OptionMessage(response, nameSelect);
      } else {
        setMessageError('No tienes una session');
      }
    } catch (error) {
      setMessageWaiting(false);
      setMessageError(`Error seaching ${itemName}:` + error.message);
    }
  };

  const fetchRubric = async (evaluateID, academicID, academicName) => {
    if (!academicID) {
      setMessageError('No tiene Académicos Asignados');
      return;
    }
    try {
      const access_token = Cookies.get('access_token');
      const url = urls[2];
      if (access_token) {
        setMessageWaiting(true);
        setAcamicName(academicName)
        const config = {
          access_token,
          specializationHasUserID,
          stageID,
          specializationHasSemesterID,
          evaluateID,
          academicID,
          typeEvaluateID : 1,
        };
        const response = await GETRequest(url, config);
        console.log(response)
        OptionMessage(response, 'rubricHasQuestion');
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
            specializationHasUserID,
            stageID,
            specializationHasSemesterID,
            typeEvaluateID : 1,
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
        if (selectedFile) {
          setMessageWaiting(true);
          const config = {
            access_token,
            evaluateID: updateId,
            specializationHasUserID,
            stageID,
            specializationHasSemesterID,
            typeEvaluateID : 1,
          };
          const response = await PUTFileRequest(url, config, selectedFile);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (updateId !== null) {
      await handleUpdate();
    } else {
      await handleCreate();
    }
  };

  const handleEdit = (item) => {
    setUpdateId(item.evaluateID);
    openModal();
  };

  const clearItem = () => {
    setUpdateId(null);
    setSelectedFile(null);
  };

  const OptionMessage = async (data, nameSelect) => {
    setMessageWaiting(false);
    if (data.verificationMessage) {
      setMessageVerification(data.verificationMessage);
      await fetchItems('items', urls[0],
        {
          specializationHasUserID,
          stageID,
          specializationHasSemesterID,
        });
      closeModal();
    }
    else if (data.renewalMessage) {
      setMessageVerification(data.renewalMessage);
      await fetchItems('items', urls[0],
        {
          specializationHasUserID,
          stageID,
          specializationHasSemesterID,
        });
      await fetchItems('specializationHasStudent', urls[1],
        {
          specializationHasSemesterID,
          specializationHasUserID
        });
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
      if (nameSelect === 'specializationHasStudent') {
        setspecializationHasStudent(data);
      } else if (nameSelect === 'rubricHasQuestion') {
        if (data.length > 0) {
          const sortedItems = sortItems(data, 'questionID', 'asc');
          setRubricHasQuestion(sortedItems);
          openModalFile();
        } else {
          setMessageError('La evaluación del académico asignado aún no ha sido completada');
        }
      } else {
        setItems(data);
      }
    }
    else {
      setMessageError('Error Inesperado');
    }
  };

  // -------------------------------Funciones para la Paginacion-------------------------------

  const [sortDirection] = useState('asc');
  const [sortProperty] = useState('evaluateID');

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    // Ordenar los elementos según la dirección de ordenamiento y la propiedad seleccionada
    const sortedItems = sortItems(items, sortProperty, sortDirection);
    return sortedItems.slice(startIndex, endIndex);
  };
  // -------------------------------Funciones de Extra-------------------------------
  const isMounted = useRef(false);
  useEffect(() => {
    if (specializationHasUserID && specializationHasSemesterID && stageID) {
      if (!isMounted.current) {
        isMounted.current = true;
        // Coloca el código que deseas ejecutar solo una vez aquí
        fetchItems('items', urls[0],
          {
            specializationHasUserID,
            stageID,
            specializationHasSemesterID,
          });
        fetchItems('specializationHasStudent', urls[1],
          {
            specializationHasSemesterID,
            specializationHasUserID
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specializationHasUserID]);

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

  const [ModalOpenFile, setModalOpenFile] = useState(false);

  const openModalFile = () => {
    setModalOpenFile(true);
  };
  const closeModalFile = () => {
    setModalOpenFile(false);
  };

  return (
    <div>
      {messageWaiting && <WaitingAlert />}
      {messageError && <Alert message={messageError} onClose={closeAlert} />}
      {messageVerification && (<AlertVerification message={messageVerification} onClose={closeAlert} />)}

      <ModalCRUD isOpen={ModalOpen}>
        <FormContainer
          updateId={updateId}
          itemName={`${specializationHasStudent.typeEvaluateName}`}
          pText={''}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
          createMessage={`Subir ${specializationHasStudent.typeEvaluateName}`}
          create2Message={'Proceso de Evaluación'}
          updateMessage={`Modificar ${specializationHasStudent.typeEvaluateName}`}
          update2Message={'Proceso de Evaluación'}
        >
          <FileDropzone onFileChange={handleFileChange} />
        </FormContainer>
      </ModalCRUD>

      <ModalFile isOpen={ModalOpenFile} onClose={closeModalFile}>
        <div className="w-full h-screen">
          <PDFViewer width="100%" height="100%">
            <ExportPDF rubricHasQuestion={rubricHasQuestion} academicName={academicName} />
          </PDFViewer>
        </div>
      </ModalFile>

      <div className='min-h-screen mx-2 my-2'>
        <ItemListHeaderStage
          title={title}
          subtitle={subtitle}
          message={'Subir Anteproyecto'}
          openModal={openModal}
        />

        <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} length={items.length} itemsPerPage={ITEMS_PER_PAGE} numberFiltered={items.length} />

        <TableStage items={getCurrentPageItems()} specializationHasStudent={specializationHasStudent} handleEdit={handleEdit} fetchRubric={fetchRubric} />
      </div>
    </div >
  );
};

export default EvaluatePreliminaryProjectCRUD;