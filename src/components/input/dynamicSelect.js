import React from 'react';

const DynamicSelect = ({ selectId, label, options, value, onChange }) => {
    return (
        <select
            id={selectId}
            name={selectId}
            className="w-full h-8 sm:h-9 rounded-lg border-gray-300 text-gray-700 text-xs sm:text-sm text-start"
            value={value}
            onChange={onChange}
        >
            <option value="">{label}</option>
            {options.map((status, index) => (
                <option key={index} value={status}>
                    {status}
                </option>
            ))}
        </select>
    );
};

export default DynamicSelect;
