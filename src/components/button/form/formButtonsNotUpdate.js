import React from 'react';
import CustomButton from '../customButton';

const FormButtonsNotUpdate = ({ handleSubmit, closeModal, customPath, message }) => {
    return (
        <div className="flex flex-col items-center gap-1 sm:flex-row sm:justify-center">
            <div className="flex-1 w-full sm:w-60">
                <CustomButton
                    onClick={handleSubmit}
                    type="submit"
                    color="orange"
                    padding_x="0"
                    padding_smx="0"
                    padding_mdx="0"
                    padding_y="2.5"
                    width="full"
                    height="10"
                >
                    {customPath}
                    {message}
                </CustomButton>
            </div>
            <div className="flex-1 w-full sm:w-60">
                <CustomButton
                    onClick={closeModal}
                    type="button"
                    color="red"
                    padding_x="0"
                    padding_smx="0"
                    padding_mdx="0"
                    padding_y="2.5"
                    width="full"
                    height="10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Cancelar
                </CustomButton>
            </div>
        </div>
    );
};

export default FormButtonsNotUpdate;
