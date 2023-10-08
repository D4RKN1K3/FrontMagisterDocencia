import React from 'react';

const ModalCRUD = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center overflow-x-hidden bg-black/50 outline-none focus:outline-none">
      <div className="bg-white p-0 rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
};

export default ModalCRUD;
