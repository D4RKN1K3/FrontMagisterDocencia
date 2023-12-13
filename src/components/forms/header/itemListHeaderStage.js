import React from 'react';
import CustomButton from '../../button/customButton';

const ItemListHeaderStage = ({
  title,
  subtitle,
  message,
  openModal,
}) => {
  return (
    <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between mb-4">
      <div className="text-center md:text-start">
        <h1 className="text-2xl sm:text-3xl font-semibold leading-relaxed text-gray-900">
          {title}
        </h1>
        <p className="text-md sm:text-sm font-medium text-gray-500">
          {subtitle}
        </p>
      </div>

      <div className="flex flex-col items-center w-full gap-1 md:flex-row md:justify-end">
        <div className='w-full md:w-96'>
          <CustomButton
            onClick={openModal}
            type="button"
            color="orange"
            padding_x="4"
            padding_smx="0"
            padding_mdx="0"
            padding_y="2"
            width="full"
            height="10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {message}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ItemListHeaderStage;
