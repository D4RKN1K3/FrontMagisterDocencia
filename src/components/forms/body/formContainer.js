import React from 'react';
import FormHeader from '../header/formHeader';
import FormButtons from '../../button/form/formButtons'

const FormContainer = ({
  updateId,
  itemName,
  pText,
  handleSubmit,
  closeModal,
  children,
}) => {
  return (
    <div className="mx-auto max-w-screen items-center w-96 sm:w-full">
      <form
        onSubmit={handleSubmit}
        className="mb-0 space-y-4 rounded-lg p-2 sm:p-4 lg:p-6"
      >
        <FormHeader
          updateId={updateId}
          itemName={itemName}
          pText={pText}
        />

        <div className="space-y-1 sm:space-y-2">{children}</div>

        <FormButtons
          handleSubmit={handleSubmit}
          closeModal={closeModal}
          updateId={updateId}
          itemName={itemName}
        />
      </form>
    </div>
  );
};

export default FormContainer;
