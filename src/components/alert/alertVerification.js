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
        className="w-80 fixed top-0 right-0 m-4 rounded bg-emerald-100 text-emerald-700
        p-4 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring"
      >
        <div className="flex items-start gap-2 font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <strong className="block font-medium text-xs sm:text-sm">
            Mensaje de Verificación
          </strong>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-start">{message}</p>
      </div>
    </div>
  );
};

export default AlertVerification;
