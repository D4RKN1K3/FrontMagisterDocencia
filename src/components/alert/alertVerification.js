import React, { useEffect } from 'react';

const AlertVerification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleContainerClick = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleContainerClick}
    >
      <div
        role="alert"
        className="fixed top-0 right-0 m-4 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring"
      >
        <div className="flex w-full max-w-sm sm:max-w-md md:max-w-lg overflow-hidden bg-white rounded-lg shadow-md">
          <div className="flex flex-2 items-center justify-center w-16 bg-emerald-500">
            <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
            </svg>
          </div>

          <div className="flex-1 px-4 py-2 -mx-3">
            <div className="mx-3">
              <span className="font-semibold text-emerald-500">Mensaje de Verificación</span>
              <p className="text-sm text-gray-600">{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertVerification;
