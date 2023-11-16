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
import DynamicSelect from '../../input/dynamicSelect';
import MultiSelect from '../../input/multiSelect';

const UserCRUD = ({ name, urls, title, subtitle }) => {
  const [itemName] = useState(name);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [newItem, setNewItem] = useState({
    rut: '',
    firstName: '',
    secondName: '',
    surnameM: '',
    surnameF: '',
    sex: '',
    stateCivil: '',
    birthday: '',
    address: '',
    email: '',
    phone: '',
    entry: '',
    id: '',
    roles: '',
  });

  const options = [
    { label: `Identificador del ${itemName}`, value: 'userID' },
    { label: `Rut del ${itemName}`, value: 'rut' },
    { label: `Primer Nombre`, value: 'firstName' },
    { label: `Segundo Nombre`, value: 'secondName' },
    { label: `Primer Apellido`, value: 'surnameM' },
    { label: `Segundo Apellido`, value: 'surnameF' },
    { label: `Sexo`, value: 'sex' },
    { label: `Estado Civil`, value: 'stateCivil' },
    { label: `Fecha de Cumpleaños`, value: 'birthday' },
    { label: `Direccion`, value: 'address' },
    { label: `Email del ${itemName}`, value: 'email' },
    { label: `Telefono del ${itemName}`, value: 'phone' },
    { label: `Fecha de Creacion`, value: 'entry' },
    { label: `Roles de ${itemName}`, value: 'roles' },
  ];
  const validMaritalStatuses = ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a', 'Otro'];
  const validGenders = ['Masculino', 'Femenino', 'No binario', 'Otro'];
  const roles = [
    { value: 1, label: 'Director' },
    { value: 2, label: 'Encargado' },
    { value: 3, label: 'Académico' },
    { value: 4, label: 'Estudiante' },
  ];

  const [selectedRoles, setSelectedRoles] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = parseInt(process.env.REACT_APP_ITEMS_PER_PAGE, 10);
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  // -------------------------------Funciones Para CRUD-------------------------------
  const fetchItems = async () => {
    try {
      const url = urls[1];
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
        const roleIDs = selectedRoles.map(option => option.value);
        const config = { ...newItem, roleIDs, access_token: access_token };
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
          userID: updateId,
          ...newItem,
          access_token: access_token,
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
          const idsToDelete = selectedItems.map(item => item.id);

          const chunkSize = process.env.REACT_APP_MAX_LENGHT_ARRAY_STRING;
          for (let i = 0; i < idsToDelete.length; i += chunkSize) {
            const chunk = idsToDelete.slice(i, i + chunkSize);

            const config = {
              access_token: access_token,
              IDs: chunk,
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
    setUpdateId(item.userID);
    setNewItem({
      rut: item.rut,
      firstName: item.firstName,
      secondName: item.secondName,
      surnameM: item.surnameM,
      surnameF: item.surnameF,
      sex: item.sex,
      stateCivil: item.stateCivil,
      birthday: item.birthday,
      address: item.address,
      email: item.email,
      phone: item.phone,
    });
    openModal();
  };

  const clearItem = () => {
    setUpdateId(null);
    setSelectedRoles([]);
    setNewItem({
      rut: '',
      firstName: '',
      secondName: '',
      surnameM: '',
      surnameF: '',
      sex: '',
      stateCivil: '',
      birthday: '',
      address: '',
      email: '',
      phone: '',
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
        prevSelectedItems.filter((selectedItem) => selectedItem.userID !== item.userID)
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
  const [searchType, setSearchType] = useState('userID');
  const [searchTerm, setSearchTerm] = useState('');

  const [sortDirection, setSortDirection] = useState('asc');
  const [sortProperty, setSortProperty] = useState('userID');

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // Filtrar y ordenar los elementos según término de búsqueda y tipo de búsqueda seleccionado
    const filteredItems = filterItems(items, searchTerm, searchType);

    // Ordenar los elementos según la dirección de ordenamiento y la propiedad seleccionada
    const sortedItems = sortItems(filteredItems, sortProperty, sortDirection);
    return sortedItems.slice(startIndex, endIndex);
  };

  const getNumberFiltered = () => {
    const filteredItems = filterItems(items, searchTerm, searchType);
    return filteredItems.length;
  }

  const handleSortPropertyChange = (property) => {
    // Si usuario selecciona una nueva propiedad de ordenamiento, pero es diferente a la propiedad actual,
    // establecer la dirección de ordenamiento en 'asc' (ascendente)
    if (property !== sortProperty) {
      setSortDirection('asc');
    }
    // Si usuario selecciona una nueva propiedad de ordenamiento y es la misma que la propiedad actual,
    // alternar la dirección de ordenamiento entre 'asc' y 'desc'
    else {
      setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    }
    // Establecer la nueva propiedad de ordenamiento seleccionada
    setSortProperty(property);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
  const getFormattedRoles = (roles) => {
    return roles.split(' ').map(role => role.trim());
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
        >
          <TextInput
            inputId='emailUser'
            value={newItem.email}
            onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
            placeholder={`Ingresar Email`}
          />
          {(!updateId) && (
            <MultiSelect
              selectId="roles"
              placeholder="Seleccione Roles"
              options={roles}
              selectedRoles={selectedRoles}
              setSelectedRoles={setSelectedRoles}
            />
          )}
          <TextInput
            inputId='rut'
            value={newItem.rut}
            onChange={(e) => setNewItem({ ...newItem, rut: e.target.value })}
            placeholder={`Ingresar Rut`}
          />
          <div className='flex gap-1 sm:gap-2'>
            <div className='flex-1'>
              <TextInput
                inputId='firstName'
                value={newItem.firstName}
                onChange={(e) => setNewItem({ ...newItem, firstName: e.target.value })}
                placeholder={`Ingresar Primer Nombre`}
              />
            </div>
            <div className='flex-1'>
              <TextInput
                inputId='secondName'
                value={newItem.secondName}
                onChange={(e) => setNewItem({ ...newItem, secondName: e.target.value })}
                placeholder={`Ingresar Segundo Nombre`}
              />
            </div>
          </div>
          <div className='flex gap-1 sm:gap-2'>
            <div className='flex-1'>
              <TextInput
                inputId='surnameM'
                value={newItem.surnameM}
                onChange={(e) => setNewItem({ ...newItem, surnameM: e.target.value })}
                placeholder={`Ingresar Primer Apellido`}
              />
            </div>
            <div className='flex-1'>
              <TextInput
                inputId='surnameF'
                value={newItem.surnameF}
                onChange={(e) => setNewItem({ ...newItem, surnameF: e.target.value })}
                placeholder={`Ingresar Segundo Apellido`}
              />
            </div>
          </div>
          <div className='flex'>
            <DynamicSelect selectId='sex' label="Seleccione Sexo" options={validGenders} value={newItem.sex} onChange={(e) => setNewItem({ ...newItem, sex: e.target.value })} />
            <DynamicSelect selectId='stateCivil' label="Seleccione Estado Civil" options={validMaritalStatuses} value={newItem.stateCivil} onChange={(e) => setNewItem({ ...newItem, stateCivil: e.target.value })} />
          </div>
          <TextInput
            inputId='birthday'
            value={newItem.birthday}
            onChange={(e) => setNewItem({ ...newItem, birthday: e.target.value })}
            placeholder={`Ingresar Fecha de Cumpleaños`}
          />
          <TextInput
            inputId='address'
            value={newItem.address}
            onChange={(e) => setNewItem({ ...newItem, address: e.target.value })}
            placeholder={`Ingresar la Dirección`}
          />
          <TextInput
            inputId='phone'
            value={newItem.phone}
            onChange={(e) => setNewItem({ ...newItem, phone: e.target.value })}
            placeholder={`Ingresar Telefono`}
          />
        </FormContainer>
      </ModalCRUD>

      <div className='min-h-screen mx-2 my-2'>
        <ItemListHeader
          title={title}
          subtitle={subtitle}
          itemName={itemName}
          openModal={openModal}
          fetchItems={fetchItems}
          handleDeleteSelected={handleDeleteSelected}
        />

        <SearchWithSelect
          selectId={`${searchType}`}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchType={searchType}
          setSearchType={setSearchType}
          options={options}
        />

        <p className='mt-4 text-gray-500 sm:text-lg'>Mostrando {getNumberFiltered()} de {items.length} elementos después de aplicar los filtros.</p>

        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm mt-4'>
            <thead className='ltr:text-left rtl:text-right'>
              <tr>
                <th className='px-4 py-2'>
                  <Checkbox
                    id='deleteAllInput'
                    name='deleteAllInput'
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  />
                </th>
                {options.map((option) => (
                  <th key={option.value} className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                    <div className='flex items-center justify-center text-center gap-1'>
                      {option.label}
                      <SortButton
                        onClick={() => handleSortPropertyChange(option.value)}
                        isActive={sortProperty === option.value}
                        isAscending={sortDirection === 'asc'}
                      />
                    </div>
                  </th>
                ))}
                <th className='whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900'>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className='ltr:text-left rtl:text-right'>
              {items.length === 0 && messageWaiting && (
                <tr>
                  <td colSpan={options.length} className="w-1/2 h-96 translate-x-1/4">
                    <IconOnlyAlert />
                  </td>
                </tr>
              )}
              {getCurrentPageItems().map((item) => (
                <tr key={item.userID} className='text-center'>
                  <td className='px-4 py-2'>
                    <Checkbox
                      id={`deleteInput-${item.userID}`}
                      name={`deleteInput-${item.userID}`}
                      checked={selectedItems.some((selectedItem) => selectedItem.userID === item.userID)}
                      onChange={(e) => handleCheckboxChange(e, item)}
                    />
                  </td>
                  <td className='px-4 py-2'>{item.userID}</td>
                  <td className='px-4 py-2'>{item.rut}</td>
                  <td className='px-4 py-2'>{item.firstName}</td>
                  <td className='px-4 py-2'>{item.secondName}</td>
                  <td className='px-4 py-2'>{item.surnameM}</td>
                  <td className='px-4 py-2'>{item.surnameF}</td>
                  <td className='px-4 py-2'>{item.sex}</td>
                  <td className='px-4 py-2'>{item.stateCivil}</td>
                  <td className='px-4 py-2'>{item.birthday}</td>
                  <td className='px-4 py-2'>{item.address}</td>
                  <td className='px-4 py-2'>{item.email}</td>
                  <td className='px-4 py-2'>{item.phone}</td>
                  <td className='px-4 py-2'>{item.entry}</td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium">
                    {getFormattedRoles(item.roles).map((role, index) => (
                      <span
                        key={index}
                        className={`mr-1 px-2.5 py-0.5 rounded 
                          ${role === 'Director'
                            ? 'bg-blue-200 text-blue-800'
                            : role === 'Encargado'
                              ? 'bg-green-200 text-green-800'
                              : role === 'Academico'
                                ? 'bg-yellow-200 text-yellow-800'
                                : role === 'Estudiante'
                                  ? 'bg-sky-200 text-sky-800'
                                  : 'bg-gray-100 text-gray-800'
                          }`
                        }
                      >
                        {role}
                      </span>
                    ))}
                  </td>
                  <td className='px-4 py-2'>
                    <div className='flex gap-2'>
                      <CustomButton
                        onClick={() => handleEdit(item)} type='button'
                        color='indigo'
                        padding_x='4'
                        padding_smx='6'
                        padding_mdx='8'
                        padding_y='2'
                        width='full'
                        height='10'
                      >
                        Actualizar
                      </CustomButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PaginationButtons currentPage={currentPage} totalPages={totalPages} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} handlePageChange={handlePageChange}/>
      </div>
    </div>
  );
};

export default UserCRUD;