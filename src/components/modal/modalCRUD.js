import React, { useEffect, useState } from 'react';

const ModalCRUD = ({ isOpen, children }) => {
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    let timeout;

    if (isOpen) {
      // Después de 2 segundos, desactiva la animación y reinicia el temporizador si isOpen cambia
      timeout = setTimeout(() => {
        setShouldAnimate(false);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    // Reinicia el temporizador cuando isOpen cambia de false a true
    if (isOpen) {
      setShouldAnimate(true);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-40 flex items-center justify-center overflow-x-hidden bg-zinc-900/70 outline-none focus:outline-none`}>
      <div className={`ml-20 mr-4 bg-white p-0 rounded-xl shadow-md ${shouldAnimate ? 'animate-bounce' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default ModalCRUD;
