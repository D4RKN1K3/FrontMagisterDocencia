import React from 'react';
import FormHeaderNotUpdate from '../header/formHeaderNotUpdate';
import FormButtonsNotUpdate from '../../button/form/formButtonsNotUpdate'
import '../../../style/border.css'

const FormContainerNotUpdate = ({
  message,
  secondaryMessage,
  pText,
  messageButton,
  handleSubmit,
  closeModal,
  children,
  customPath,
}) => {
  return (
    <div className="mx-auto max-w-screen items-center w-96 sm:w-full"
      id="borderimg1"
    >
      <form
        onSubmit={handleSubmit}
        className="mb-0 space-y-4 rounded-lg p-2 sm:p-4 lg:p-6"
      >
        <FormHeaderNotUpdate
          message={message}
          secondaryMessage={secondaryMessage}
          pText={pText}
        />

        <div className="space-y-1 sm:space-y-2">{children}</div>

        <FormButtonsNotUpdate
          handleSubmit={handleSubmit}
          closeModal={closeModal}
          message={messageButton}
          customPath={customPath}
        />
      </form>
    </div>
  );
};

export default FormContainerNotUpdate;
