import React from 'react';

const NumberInput = ({ inputId, value, onChange, placeholder }) => {
  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    onChange(newValue);
  };

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <p className='flex-2 text-gray-600 text-sm'>{placeholder}</p>
      <div className='flex-1'>
        <div className="relative flex items-center">
          <label htmlFor={inputId} className="sr-only">
            {inputId}
          </label>
          <input
            type="number"
            id={inputId}
            name={inputId}
            value={value || 0}
            onChange={handleChange}
            className="h-8 sm:h-9 w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm text-gray-600"
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default NumberInput;
