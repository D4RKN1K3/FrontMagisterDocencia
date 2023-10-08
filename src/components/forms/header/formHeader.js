import React from 'react';

const FormHeader = ({ updateId, itemName, pText }) => {
  return (
    <div className="mx-auto max-w-lg text-center">
      <h1 className="text-2xl font-bold sm:text-3xl">
        {updateId ? `Actualizar ${itemName}` : `Crear ${itemName}`}
      </h1>

      <h2 className="text-center text-lg font-medium">
      {updateId ? `Actualización de ${itemName}` : `Creación de ${itemName}`}  
      </h2>

      <p className="mx-auto mt-4 max-w-md text-center text-gray-500">{pText}</p>
    </div>
  );
};

export default FormHeader;
