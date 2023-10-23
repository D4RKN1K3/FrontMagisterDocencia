import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

import ModalCRUD from '../../modal/modalCRUD';
import Alert from '../../alert/alert';
import AlertVerification from '../../alert/alertVerification';
import WaitingAlert from '../../alert/waitingAlert';

import { GETRequest, POSTRequest, DELETERequest } from '../../../utils/requestHelpers';
import { sortItems } from '../../../utils/crudHelpers/searchFilter';
import { renewSession, deniedSession } from '../../../utils/sessionHelpers';
import FormHeaderNotUpdate from '../../forms/body/formContainerNotUpdate'
import MultiSelect from '../../input/multiSelect';
import CustomButton from '../../button/customButton';

const CustomPath = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  );
};

const RoleCRUD = ({ name, urls, userID, handleFetchItems }) => {
  const [itemName] = useState(name);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [sortDirection] = useState('asc');
  const [sortProperty] = useState('roleID');
  const roles = [
    { value: 1, label: 'Director' },
    { value: 2, label: 'Encargado' },
    { value: 3, label: 'Académico' },
    { value: 4, label: 'Estudiante' },
  ];

  // -------------------------------Funciones Para CRUD-------------------------------
  const fetchItems = async () => {
    try {
      const url = urls[0];
      const access_token = Cookies.get('access_token');
      if (access_token) {
        const config = {
          access_token,
          userID
        };
        const response = await GETRequest(url, config);
        OptionMessage(response);
      } else {
        setMessageError('No tienes una session');
      }
    } catch (error) {
      setMessageError(`Error seaching ${itemName}:` + error.message);
    }
  };
  const handleCreate = async (roleIDs) => {
    try {
      const url = urls[0];
      const access_token = Cookies.get('access_token');
      if (access_token) {
        const chunkSize = process.env.REACT_APP_MAX_LENGHT_ARRAY_STRING;
        for (let i = 0; i < roleIDs.length; i += chunkSize) {
          const chunk = roleIDs.slice(i, i + chunkSize);
          const config = {
            access_token,
            userID,
            roleIDs: chunk,
          };
          const response = await POSTRequest(url, config);
          OptionMessage(response);
        }
      } else {
        setMessageError('No tienes una sesión');
      }
    } catch (error) {
      setMessageError(`Error creating ${itemName}:` + error.message);
    }
  };
  const handleDeleteSelected = async (roleIDs) => {
    try {
      const url = urls[0];
      const access_token = Cookies.get('access_token');
      if (access_token) {
        const chunkSize = process.env.REACT_APP_MAX_LENGHT_ARRAY_STRING;
        for (let i = 0; i < roleIDs.length; i += chunkSize) {
          const chunk = roleIDs.slice(i, i + chunkSize);
          const config = {
            access_token,
            userID,
            roleIDs: chunk,
          };
          const response = await DELETERequest(url, config);
          OptionMessage(response);
        }
      } else {
        setMessageError('No tienes una sesión');
      }
    } catch (error) {
      setMessageError(`Error deleting ${itemName}:` + error.message);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessageWaiting(true);
    const currentRoles = items.map(option => option.value);
    const newRoles = selectedRoles.map(option => option.value);
    const newRolesAdded = newRoles.filter((role) => !currentRoles.includes(role));
    const rolesToBeRemoved = currentRoles.filter((role) => !newRoles.includes(role));
    if (newRolesAdded.length === 0 && rolesToBeRemoved.length === 0) {
      setMessageWaiting(false);
      setMessageVerification("No se ha realizado ningun cambio");
    }
    if (newRolesAdded.length > 0) {
      await handleCreate(newRolesAdded);
    }
    if (rolesToBeRemoved.length > 0) {
      await handleDeleteSelected(rolesToBeRemoved);
    }
  };
  const OptionMessage = async (data) => {
    setMessageWaiting(false);
    setRequestMade(false);
    if (data.verificationMessage) {
      setMessageVerification(data.verificationMessage);
      setModalOpen(false);
      await handleFetchItems();
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
      const errorList = data.errors.map((error, index) => `${index + 1}. ${error.msg}`).join('<br/>');
      setMessageError(<p>Se encontraron los siguientes errores:<br />{errorList}</p>);
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
      const sortedItems = sortItems(data, sortProperty, sortDirection);
      const roles = sortedItems.map(item => ({
        value: item.roleID,
        label: item.role.name
      }));
      setSelectedRoles(roles);
      setItems(roles);
    } else {
      setMessageError('Error Inesperado');
    }
  };

  // -------------------------------Funciones de Extra-------------------------------
  const [modalOpen, setModalOpen] = useState(false);
  const [requestMade, setRequestMade] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [messageVerification, setMessageVerification] = useState(null);
  const [messageWaiting, setMessageWaiting] = useState(null);

  const closeAlert = () => {
    setMessageError(null);
    setMessageVerification(null);
  }

  // -------------------------------Funciones para los Modal-------------------------------
  const openModal = async () => {
    if (!requestMade) {
      setMessageWaiting(true);
      await fetchItems();
      setRequestMade(true);
    }
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {messageWaiting && <WaitingAlert />}
      {messageError && <Alert message={messageError} onClose={closeAlert} />}
      {messageVerification && (<AlertVerification message={messageVerification} onClose={closeAlert} />)}

      <ModalCRUD isOpen={modalOpen}>
        <FormHeaderNotUpdate
          message={'Asignación de Roles'}
          messageButton={'Guardar Cambios'}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
          customPath={<CustomPath />}
        >
          <MultiSelect
            selectId="roles"
            placeholder="Roles Actuales"
            options={roles}
            selectedRoles={selectedRoles}
            setSelectedRoles={setSelectedRoles}
          />
        </FormHeaderNotUpdate>
      </ModalCRUD>


      <CustomButton onClick={openModal} type="button"
        color="orange"
        padding_x='4'
        padding_smx='6'
        padding_mdx='8'
        padding_y='2'
        width='full'
        height='10'
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <CustomPath />
        </svg>
        Editar Roles
      </CustomButton>

    </div>
  );
};

export default RoleCRUD;