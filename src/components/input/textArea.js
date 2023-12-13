import React from 'react';

const TextArea = ({ inputId, value, onChange, placeholder }) => {
  const handleChange = (event) => {
    onChange(event);
  };

  return (
    <div className="relative flex items-center">
      <label htmlFor={inputId} className="sr-only block text-sm font-medium text-gray-700">
        {inputId}
      </label>
      <textarea
        id={inputId}
        name={inputId}
        value={value || ''}
        rows="4"
        onChange={handleChange}
        className="w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextArea;
