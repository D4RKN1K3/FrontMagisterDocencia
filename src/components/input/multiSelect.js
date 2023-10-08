import React from 'react';
import Select from 'react-select';

const MultiSelect = ({ selectId, placeholder, options, selectedRoles, setSelectedRoles }) => {
  const handleRoleChange = (selectedValues) => {
    setSelectedRoles(selectedValues);
  };

  return (
    <div className="relative flex items-center">
      <Select
        id={selectId}
        name={selectId}
        className="w-full h-6 sm:h-8 mb-3 sm:mb-1 rounded-lg border-gray-300 text-gray-700 text-xs sm:text-sm text-start"
        isMulti
        options={options}
        value={selectedRoles}
        onChange={handleRoleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default MultiSelect;