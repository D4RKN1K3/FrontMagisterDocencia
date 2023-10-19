import React, { useState, useCallback } from 'react';
import DynamicSelect from './input/dynamicSelect';
import { useDropzone } from 'react-dropzone';
import Cookies from 'js-cookie';
import { POSTRequest, GETRequest, POSTFileRequest } from '../utils/requestHelpers';      



export function Insert() {

    const [uploadedFiles, setUploadedFiles] = useState([]);
    
    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles);
        const fileNames = acceptedFiles.map((file) => file.name);
        setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, ...fileNames]);
    }, []);
    

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
        id: '',
        titulo: '',
        grado: '',
        postgrado: '',
        procedencia: '',
      });

    const validMaritalStatuses = ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a', 'Otro'];
    const validGenders = ['Masculino', 'Femenino', 'No binario', 'Otro'];


    const handleRutChange = (e) => {
        let rut = e.target.value;
        rut = rut.replace(/\D/g, '');      
        if (rut.length <= 1) {
          setNewItem({ ...newItem, rut });
        } else {
          rut = rut.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + rut.slice(-1);
          setNewItem({ ...newItem, rut });
        }
      };
      
    
    const handleDateChange = (e) => {
        let date = e.target.value;
        date = date.replace(/\D/g, ''); 
    
        if (date.length > 4) {
          date = date.replace(/(\d{2})(\d{2})(\d{4})/, '$1-$2-$3');
        }
        
        setNewItem({ ...newItem, birthday: date });
    };


    const handleCreate = async () => {
        try {
          const url = process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/roleAssignment/user/';
          const access_token = Cookies.get('access_token');
          if (access_token) {
    
            const roleIDs = [4]
            const config = { ...newItem, roleIDs, access_token: access_token };
            
            const response = await POSTRequest(url, config);
            console.log(response)
            await fetchItems();
            
          } else {
    
          }
        } catch (error) {
        }
      };
    
    const fetchItems = async () => {
        try {
            const url = process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/roleAssignment/roleHasUser/rolesHasUser';
            const access_token = Cookies.get('access_token');
            if (access_token) {
                const config = {
                access_token,
                };
    
                const response = await GETRequest(url, config);
                let usuarioEncontrado = false;

                for (const buscar in response) {
                    if (newItem.rut === response[buscar].rut) {
                        console.log("Usuario encontrado:", response[buscar]);
                        const roleHasUserID = response[buscar].userID
                        console.log(roleHasUserID)

                        try {
                            const url = process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/roleAssignment/document/';
                            const access_token = Cookies.get('access_token');
                            if (access_token) {
                      
                              const config = {access_token: access_token, roleHasUserID: roleHasUserID };
                              
                              console.log("dsads", config)
                              
                              const response = await POSTFileRequest(url, config, uploadedFiles);
                              
                              console.log("subido correctamente", response)
                            } else {
                      
                            }
                          } catch (error) {
                          }

                        usuarioEncontrado = true;
                        break; 
                    }
                }

                if (!usuarioEncontrado) {
                console.log("No se encontró el usuario");
                }
                    

            }
        } catch (error) {

        }
    };


    
    
    

    const handleSubmit = async (event) => {
        newItem.birthday = newItem.birthday.replace(/\D/g, '')
        newItem.birthday = newItem.birthday.replace(/(\d{2})(\d{2})(\d{4})/, '$3-$2-$1');        
        await handleCreate();
        

        

      };

      const { getRootProps, getInputProps } = useDropzone({ onDrop });
      const dropzoneStyle = {
        width: '200px',  
        height: '200px',
        border: '2px dashed #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };

    return(
        <>
    <div class="flex mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-lg">
            <h1 class="text-2xl font-bold font-normal sm:text-3xl">Ingrese datos del alumno</h1>

            <form action="" class=" mx-auto mb-0 mt-8 max-w-md space-y-4" id="borderimg1">
            <div>
                <div className='flex gap-1 sm:gap-2 '>
                    <div className='flex-1'>
                        <label class="sr-only" for="firstName"></label>
                        <input
                            class="w-full rounded-lg border-gray-200 p-3 text-sm"                            
                            type="text"
                            inputId='firstName'
                            value={newItem.firstName}
                            onChange={(e) => setNewItem({ ...newItem, firstName: e.target.value })}
                            placeholder={`Ingrese Primer Nombre`} />
                    </div>
                    <div className='flex-1'>
                    <label class="sr-only" for="secondName"></label>
                        <input
                            class="w-full rounded-lg border-gray-200 p-3 text-sm"
                            type="text"
                            inputId='secondName'
                            value={newItem.secondName}
                            onChange={(e) => setNewItem({ ...newItem, secondName: e.target.value })}
                            placeholder={`Ingrese Segundo Nombre`} />
                    </div>
                </div>

                <div className='flex gap-1 sm:gap-2 '>
                    <div className='flex-1'>
                        <label class="sr-only" for="surnameM"></label>
                        <input
                            class="w-full rounded-lg border-gray-200 p-3 text-sm"                            
                            type="text"
                            inputId='surnameM'
                            value={newItem.surnameM}
                            onChange={(e) => setNewItem({ ...newItem, surnameM: e.target.value })}
                            placeholder={`Ingrese Primer Apellido`} />
                    </div>
                    <div className='flex-1'>
                    <label class="sr-only" for="surnameF"></label>
                        <input
                            class="w-full rounded-lg border-gray-200 p-3 text-sm"
                            type="text"
                            inputId='surnameF'
                            value={newItem.surnameF}
                            onChange={(e) => setNewItem({ ...newItem, surnameF: e.target.value })}
                            placeholder={`Ingrese Segundo Apellido`} />
                    </div>
                </div>
                
            </div>

            <div>
                <label class="sr-only" for="name">Rut</label>
                <input
                    class="w-full rounded-lg border-gray-200 p-3 text-sm"
                    type="text"
                    inputId='rut'
                    value={newItem.rut}
                    onChange={handleRutChange}
                    placeholder={`Ingrese Rut`} />
            </div>

            <div className='flex'>
            <DynamicSelect selectId='sex' label="Seleccione Sexo" options={validGenders} value={newItem.sex} onChange={(e) => setNewItem({ ...newItem, sex: e.target.value })} />
            <DynamicSelect selectId='stateCivil' label="Seleccione Estado Civil" options={validMaritalStatuses} value={newItem.stateCivil} onChange={(e) => setNewItem({ ...newItem, stateCivil: e.target.value })} />
          </div>


            <div>
                <label class="sr-only" for="name">Fecha de nacimiento</label>
                <input
                    class="w-full rounded-lg border-gray-200 p-3 text-sm"
                    type="text"
                    inputId='birthday'
                    value={newItem.birthday}
                    onChange={handleDateChange}
                    placeholder="Ingrese Fecha de Nacimiento (DD-MM-YYYY)"/>
            </div>

            <div>
                <label class="sr-only" for="name">Direccion</label>
                <input
                    class="w-full rounded-lg border-gray-200 p-3 text-sm"
                    type="text"
                    inputId='address'
                    value={newItem.address}
                    onChange={(e) => setNewItem({ ...newItem, address: e.target.value })}
                    placeholder={`Ingrese Dirección`} />
            </div>

            <div>
                <label class="sr-only" for="email">Correo</label>
                <input
                    class="w-full rounded-lg border-gray-200 p-3 text-sm"    
                    type="email"
                    inputId='emailUser'
                    value={newItem.email}
                    onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
                    placeholder={`Ingrese Email`}                    
                    />
            </div>

            <div>
                <label class="sr-only" for="name">Telefono</label>
                <input
                    class="w-full rounded-lg border-gray-200 p-3 text-sm"
                    type="text"
                    inputId='phone'
                    value={newItem.phone}
                    onChange={(e) => setNewItem({ ...newItem, phone: e.target.value })}
                    placeholder={`Ingrese Telefono`} />
            </div>

            <div>
                <label class="sr-only" for="name">Titulo</label>
                <input
                    class="w-full rounded-lg border-gray-200 p-3 text-sm"
                    type="text"
                    inputId='titulo'
                    value={newItem.titulo}
                    onChange={(e) => setNewItem({ ...newItem, titulo: e.target.value })}
                    placeholder={`Ingrese Titulo`}  />
            </div>

            <div>
                <label class="sr-only" for="name">Grado</label>
                <input
                    class="w-full rounded-lg border-gray-200 p-3 text-sm"
                    type="text"
                    inputId='grado'
                    value={newItem.grado}
                    onChange={(e) => setNewItem({ ...newItem, grado: e.target.value })}
                    placeholder={`Ingrese Grado`} />
            </div>

            <div>
                <label class="sr-only" for="name">Postrado</label>
                <input
                    class="w-full rounded-lg border-gray-200 p-3 text-sm"
                    type="text"
                    inputId='postgrado'
                    value={newItem.postgrado}
                    onChange={(e) => setNewItem({ ...newItem, postgrado: e.target.value })}
                    placeholder={`Ingrese Postgrado`} />
            </div>

            <div>
                <label class="sr-only" for="name">Procedencia</label>
                <input
                    class="w-full rounded-lg border-gray-200 p-3 text-sm"
                    type="text"
                    inputId='procedencia'
                    value={newItem.procedencia}
                    onChange={(e) => setNewItem({ ...newItem, procedencia: e.target.value })}
                    placeholder={`Ingrese Universidad de procedencia`} />
            </div>
            
            </form>
            
        </div>

        

        <div className="flex-col items-center space-y-4">
            <div {...getRootProps()} className="dropzone" style={dropzoneStyle}>
                <input {...getInputProps()} />
                <p>Arrastra y suelta archivos aquí, o haz clic para seleccionar archivos</p>
            </div>
            {uploadedFiles.length > 0 && (
                <div className="file-list">
                <p className="font-semibold">Archivos subidos:</p>
                <ul className="mt-4">
                    {uploadedFiles.map((fileName, index) => (
                    <li key={index}>{fileName}</li>
                    ))}
                </ul>
                </div>
            )}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
            Crear estudiante
            </button>
        </div>

        
        

        
    </div></>
    )
}