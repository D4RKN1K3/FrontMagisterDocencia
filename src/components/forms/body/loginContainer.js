import React from 'react';
import logo from '../../../img/logo-uta.png'
import CustomButton from '../../button/customButton'
import SocialButton from '../../crud/login/socialButton/socialButton';

const LoginContainer = ({
  handleSubmit,
  children,
  isAdminAccess,
}) => {
  return (
    <div className="mx-auto h-screen max-w-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="mb-0 w-full sm:w-96 space-y-2 rounded-lg p-2 sm:p-4 lg:p-6"
      >
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-4xl text-orange-500">
            Inicio de Sesión
          </h1>
        </div>

        <img
          className="w-40 h-40 mx-auto my-3"
          src={logo} alt="Logo Uta"
        />

        <div className="space-y-2">{children}</div>

        <div className="flex items-center justify-center">
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Iniciar Sesión
          </CustomButton>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex w-full items-center">
            <hr className="h-1 w-full rounded bg-orange-500" />
            <span className="mx-2 text-xl text-gray-400">o</span>
            <hr className="h-1 w-full rounded bg-orange-500" />
          </div>
          <SocialButton isAdminAccess={isAdminAccess}/>
        </div>
      </form>
    </div>
  );
};

export default LoginContainer;
