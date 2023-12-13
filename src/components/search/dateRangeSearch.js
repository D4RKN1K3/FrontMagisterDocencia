import React from 'react';
import DateInput from '../input/dateInput';

const DateRangeSearch = ({
  startDate,
  endDate,
  setEndDate,
  setStartDate,
  searchType2,
  setSearchType2,
  options2,
}) => {
  const handleDateChange = (date, type) => {
    if (type === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  return (
    <div className='grid grid-cols-5 items-center gap-1 mt-2'>
      <div className='col-span-full sm:col-span-4 grid grid-cols-2 w-full gap-1'>
        <div className='col-span-full sm:col-span-1 w-full sm:w-auto'>
          <DateInput
            selectId="startDate"
            placeholderText="Ingresar Fecha de inicio..."
            value={startDate}
            onChange={(date) => handleDateChange(date, 'start')}
          />
        </div>

        <div className='col-span-full sm:col-span-1 w-full sm:w-auto'>
          <DateInput
            selectId="endDate"
            placeholderText="Ingresar Fecha de Finalización..."
            value={endDate}
            onChange={(date) => handleDateChange(date, 'end')}
          />
        </div>
      </div>
      <div className='col-span-full sm:col-span-1 w-full sm:w-auto'>
        <select
          id="searchSelect"
          name="searchSelect"
          className="h-10 w-full rounded-lg border-gray-300 text-gray-700 text-sm"
          value={searchType2}
          onChange={(e) => setSearchType2(e.target.value)}
        >
          {options2.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DateRangeSearch;
