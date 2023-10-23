import React from 'react';
import PasswordCRUD from '../crud/profile/password/passwordCRUD';

const ProfileCard = ({ item }) => {

  const getFormattedRoles = (roles) => {
    return roles.split(' ').map(role => role.trim());
  };

  return (
    <div className="w-96 md:w-1/2 relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8" >
      <span
        className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-red-500 via-yellow-500 from-green-300 via-blue-500"
      ></span>

      <div className="flex justify-center gap-x-10">
        <div>
          <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
            {item.firstName} {item.secondName} {item.surnameM} {item.surnameF}
          </h3>

          <p className="mt-1 text-xs font-medium text-gray-600 flex justify-center">
            {item.email}
          </p>

          <p className="mt-2 text-xs font-medium text-gray-600 flex justify-center">
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
          </p>
        </div>

        <div className="">
          <img
            alt="Paul Clapton"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
            className="h-16 w-16 rounded-lg object-cover shadow-sm"
          />
        </div>
      </div>

      <div className="mt-0 flex justify-center">
        <p className="max-w-[40ch] text-sm text-gray-500">
        </p>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-3">
        <div className="flex flex-col">
          <dt className="text-sm font-medium text-gray-600">Rut del Usuario</dt>
          <dd className="text-xs text-gray-500">{item.rut}</dd>
        </div>

        <div className="flex flex-col">
          <dt className="text-sm font-medium text-gray-600">Fecha de Cumpleaños</dt>
          <dd className="text-xs text-gray-500">{item.birthday}</dd>
        </div>

        <div className="flex flex-col">
          <dt className="text-sm font-medium text-gray-600">Sexo</dt>
          <dd className="text-xs text-gray-500">{item.sex}</dd>
        </div>

        <div className="flex flex-col">
          <dt className="text-sm font-medium text-gray-600">Estado Civil</dt>
          <dd className="text-xs text-gray-500">{item.stateCivil}</dd>
        </div>

        <div className="flex flex-col">
          <dt className="text-sm font-medium text-gray-600">Telefono del Usuario</dt>
          <dd className="text-xs text-gray-500">{item.phone}</dd>
        </div>

        <div className="flex flex-col">
          <dt className="text-sm font-medium text-gray-600">Dirección del Usuario</dt>
          <dd className="text-xs text-gray-500">{item.address}</dd>
        </div>
      </dl>

      <div className="mt-4">
        <PasswordCRUD />
      </div>
    </div>
  );
};

export default ProfileCard;
