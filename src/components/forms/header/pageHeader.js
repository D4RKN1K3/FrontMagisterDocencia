import React from 'react';

const PageHeader = ({ title, subtitle }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracki text-center sm:text-5xl text-orange-400">{title}</h2>
      <p className="max-w-3xl mx-auto mt-4 text-xl text-center text-gray-500">{subtitle}</p>
    </div>
  );
};

export default PageHeader;
