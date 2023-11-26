import React from 'react';

const Table = ({ theadContent, tbodyContent }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm mt-4'>
        <thead className='ltr:text-left rtl:text-right'>
          {theadContent}
        </thead>
        <tbody className='ltr:text-left rtl:text-right'>
          {tbodyContent}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
