// Checkbox.js

import React from 'react';

const Checkbox = ({ id, name, checked, onChange }) => {
  return (
    <>
      <input
        id={id}
        name={name}
        type="checkbox"
        className="form-checkbox h-5 w-5 rounded border-orange-300 text-orange-500 transition duration-150 ease-in-out"
        checked={checked}
        onChange={onChange}
      />
    </>
  );
};

export default Checkbox;
