import React from 'react';
import Select from 'react-select';

const SearchSelect = ({ selectId, placeholder, options, value, onChange }) => {
  const handleSelectChange = (selectedOption) => {
    onChange(selectedOption);
  };

  return (
    <div className="relative flex items-center">
      <Select
        id={selectId}
        name={selectId}
        className="w-full h-6 sm:h-8 mb-3 sm:mb-1 rounded-lg border-gray-300 text-gray-700 text-xs sm:text-sm text-start"
        options={options}
        value={options.find(option => option.value === value)}
        onChange={handleSelectChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchSelect;
