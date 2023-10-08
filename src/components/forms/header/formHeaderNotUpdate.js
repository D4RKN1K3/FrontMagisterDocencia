import React from 'react';

const FormHeaderNotUpdate = ({ message, secondaryMessage, pText }) => {
  return (
    <div className="mx-auto max-w-lg text-center">
      <h1 className="text-2xl font-bold sm:text-3xl">
        {message}
      </h1>

      <h2 className="text-center text-lg font-medium">
        {secondaryMessage}
      </h2>

      <div className="mx-auto mt-4 max-w-md text-center text-gray-500">{pText}</div>
    </div>
  );
};

export default FormHeaderNotUpdate;
