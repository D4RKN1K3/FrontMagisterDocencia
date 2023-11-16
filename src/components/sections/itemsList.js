import React from 'react';

const ItemsList = ({ children }) => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 pb-2 sm:pb-4 sm:px-3 lg:pb-6 lg:px-2">
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {children}
      </div>
    </div>
  );
};

export default ItemsList;
