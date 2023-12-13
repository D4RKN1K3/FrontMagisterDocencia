import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({ selectId, placeholderText, value, onChange }) => {
    const handleDateChange = (date) => {
        onChange(date);
    };

    return (
        <div className="relative flex items-center">
            <label htmlFor={selectId} className="sr-only">
                {selectId}
            </label>
            <DatePicker
                wrapperClassName="w-full"
                id={selectId}
                name={selectId}
                className="w-full h-8 sm:h-10  rounded-lg border-gray-200 p-4 pl-10 shadow-sm text-xs sm:text-sm text-start relative"
                selected={value ? new Date(value) : null}
                onChange={handleDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="dd/MM/yyyy HH:mm"
                timeCaption="Hora"
                placeholderText={placeholderText}
                popperPlacement="top"
            />
            <span className="absolute inset-y-0 left-3 flex items-center pr-6">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </span>
        </div>
    );
};

export default DateInput;
