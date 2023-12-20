import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from "react-router-dom";

import Alert from '../../../alert/alert';
import AlertVerification from '../../../alert/alertVerification';
import WaitingAlert from '../../../alert/waitingAlert';
import IconOnlyAlert from '../../../alert/iconOnlyAlert'

import { GETRequest } from '../../../../utils/requestHelpers';
import { sortItems } from '../../../../utils/crudHelpers/searchFilter';
import { renewSession, deniedSession } from '../../../../utils/sessionHelpers';
import PaginationButtons from '../../../button/table/paginationButtonsEvaluate';
import TableEvaluate from '../../../table/tableEvaluate';
import HandleRubricCRUD from '../../handleRubric/handleRubricCRUD';
import PageHeader from '../../../forms/header/pageHeader';

const EvaluatePreliminaryProjectCRUD = ({ name, urls, title, subtitle }) => {
  const [itemName] = useState(name);
  const navigate = useNavigate();
  const { stageID, specializationHasUserID, specializationHasSemesterID } = useParams();

  const [items, setItems] = useState([]);
  const [specializationHasStudent, setspecializationHasStudent] = useState([]);
  const [showRubric, setShowRubric] = useState(false);
  const [evaluateID, setEvaluateID] = useState('');

  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 1;

  // -------------------------------Funciones Para CRUD-------------------------------
  const fetchItems = async (nameSelect, url, params) => {
    try {
      const access_token = Cookies.get('access_token');
      if (access_token) {
        setMessageWaiting(true);
        const config = {
          ...params,
          access_token,
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

  const fetchRubric = async (evaluateID) => {
    if (showRubric) {
      setMessageError('Ya tienes una Rubrica asociado a esta evaluación');
      return;
    } else {
      setShowRubric(!showRubric);
      setEvaluateID(evaluateID);
    }
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
            stageID,
            specializationHasSemesterID,
          });
        fetchItems('specializationHasStudent', urls[1],
          {
            specializationHasSemesterID,
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

  return (
    <div>
      {messageWaiting && <WaitingAlert />}
      {messageError && <Alert message={messageError} onClose={closeAlert} />}
      {messageVerification && (<AlertVerification message={messageVerification} onClose={closeAlert} />)}

      <div className='min-h-screen mx-2 my-2'>
        <PageHeader title={title} subtitle={subtitle} />

        <PaginationButtons setShowRubric={setShowRubric} currentPage={currentPage} setCurrentPage={setCurrentPage} length={items.length} itemsPerPage={ITEMS_PER_PAGE} numberFiltered={items.length} />

        <TableEvaluate items={getCurrentPageItems()} specializationHasStudent={specializationHasStudent} fetchRubric={fetchRubric} />
        {showRubric &&
          <HandleRubricCRUD showRubric={showRubric} specializationHasSemesterID={specializationHasSemesterID} evaluateID={evaluateID} name={'Rubrica'} urls={urls.slice(2)} title={`Bienvenido a gestión de rubricas`} subtitle={'CRUD de Rubricas'} />
        }
      </div>
    </div >
  );
};

export default EvaluatePreliminaryProjectCRUD;