import React, { useEffect } from 'react';

const Alert = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 7000);

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
          <div className="flex flex-2 items-center justify-center w-16 bg-red-500">
            <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
            </svg>
          </div>

          <div className="flex-1 px-4 py-2 -mx-3">
            <div className="mx-3">
              <span className="font-semibold text-red-500">Mensaje de Error</span>
              <div className="text-sm text-gray-600">
                {message}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
