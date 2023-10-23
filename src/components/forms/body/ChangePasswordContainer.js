import React from 'react';
import CustomButton from '../../button/customButton'

const ChangePasswordContainer = ({
  handleSubmit,
  children,
}) => {
  return (
    <div className="mx-auto max-w-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="mb-0 w-80 md:w-96 space-y-4 rounded-lg p-2 sm:p-4 lg:p-6"
      >

        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl text-orange-500">
            Cambio de Contraseña
          </h1>
        </div>

        <div className="mx-auto mt-4 max-w-md text-xs sm:text-sm md:text-md text-center text-gray-500">
          <p>
            La contraseña debe cumplir con las siguientes características:
            <br />
            - No se permite el uso de contraseñas repetidas.
            <br />
            - Debe tener una longitud mínima de 8 caracteres.
            <br />
            - Debe contener al menos una letra mayúscula.
            <br />
            - Debe contener al menos una letra minúscula.
            <br />
            - Debe contener al menos un número.
            <br />- Debe contener al menos un carácter especial.
          </p>
        </div>

        <div className="space-y-1 sm:space-y-2">{children}</div>

        <div className="flex items-center justify-center gap-1 sm:gap-2">
          <CustomButton
            onClick={handleSubmit}
            type="submit"
            color="orange"
            padding_x="0"
            padding_smx="0"
            padding_mdx="0"
            padding_y="2.5"
            width="full"
            height="10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
            Cambiar Contraseña
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordContainer;
