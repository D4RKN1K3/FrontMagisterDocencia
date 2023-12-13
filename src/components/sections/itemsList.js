import React from 'react';
import Checkbox from '../input/checkbox';

const ItemsList = ({message, selectAll, handleSelectAllChange, children }) => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 pb-2 sm:pb-4 sm:px-3 lg:pb-6 lg:px-2">
      <div className="flex flex-row items-center justify-center gap-2 my-2">
        <Checkbox
          id='deleteAllInput'
          name='deleteAllInput'
          checked={selectAll}
          onChange={handleSelectAllChange}
        />
        <p className='text-gray-500 sm:text-lg'>{message}</p>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {children}
      </div>
    </div>
  );
};

export default ItemsList;
