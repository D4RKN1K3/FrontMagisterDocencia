import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from "react-router-dom";

import ModalCRUD from '../../../../modal/modalCRUD';
import Alert from '../../../../alert/alert';
import AlertVerification from '../../../../alert/alertVerification';
import WaitingAlert from '../../../../alert/waitingAlert';
import IconOnlyAlert from '../../../../alert/iconOnlyAlert'

import { GETRequest, POSTFileRequest, PUTFileRequest } from '../../../../../utils/requestHelpers';
import { sortItems } from '../../../../../utils/crudHelpers/searchFilter';
import { renewSession, deniedSession } from '../../../../../utils/sessionHelpers';
import ItemListHeaderStage from '../../../../forms/header/itemListHeaderStage';
import PaginationButtons from '../../../../button/table/paginationButtons';
import FormContainer from '../../../../forms/body/formContainer';
import FileDropzone from '../../../../input/fileDropzone';
import TableStage from '../../../../table/tableStage';

const StageCRUD = ({ name, urls, title, subtitle }) => {
  const [itemName] = useState(name);
  const navigate = useNavigate();
  const { specializationHasUserID } = useParams();

  const [items, setItems] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

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
            specializationHasUserID,
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
    if (specializationHasUserID) {
      if (!isMounted.current) {
        isMounted.current = true;
        // Coloca el código que deseas ejecutar solo una vez aquí
        fetchItems();
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
          createMessage={'Subir Anteproyecto'}
          create2Message={'Proceso de Evaluación'}
          updateMessage={'Cambiar Anteproyecto'}
          update2Message={'Proceso de Evaluación'}
        >
          <FileDropzone onFileChange={handleFileChange} />
        </FormContainer>
      </ModalCRUD>

      <div className='min-h-screen mx-2 my-2'>
        <ItemListHeaderStage
          title={title}
          subtitle={subtitle}
          message={'Subir Anteproyecto'}
          openModal={openModal}
        />

        <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} length={items.length} itemsPerPage={ITEMS_PER_PAGE} numberFiltered={items.length} />

        <TableStage items={getCurrentPageItems()} handleEdit={handleEdit} />
      </div>
    </div >
  );
};

export default StageCRUD;