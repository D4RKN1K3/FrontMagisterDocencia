import React from 'react';

const ModalFile = ({ isOpen, onClose, children }) => {

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center overflow-x-hidden bg-zinc-900/70 outline-none focus:outline-none`}
      onClick={handleClose}
    >
      <div
        className={`ml-20 p-0 w-3/4 rounded-xl shadow-md`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalFile;
