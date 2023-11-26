import React from 'react';
import FormHeader from '../header/formHeader';
import FormButtons from '../../button/form/formButtons'
import '../../../style/border.css'

const FormContainer = ({
  updateMessage,
  createMessage,
  update2Message,
  create2Message,
  updateId,
  itemName,
  pText,
  handleSubmit,
  closeModal,
  children,
}) => {
  return (
    <div className="mx-auto max-w-screen items-center w-80 sm:w-full"
      id="borderimg1"
    >
      <form
        onSubmit={handleSubmit}
        className="mb-0 space-y-4 rounded p-4 sm:p-6"
      >
        <FormHeader
          updateMessage={updateMessage}
          createMessage={createMessage}
          update2Message={update2Message}
          create2Message={create2Message}
          updateId={updateId}
          itemName={itemName}
          pText={pText}
        />

        <div className="space-y-1 sm:space-y-2">{children}</div>

        <FormButtons
          updateMessage={updateMessage}
          createMessage={createMessage}
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
