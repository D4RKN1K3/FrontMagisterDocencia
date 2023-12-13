import React from 'react';
import CustomButton from '../button/customButton';

const TableStage = ({ items, handleEdit }) => {
    return (
        <div className="bg-white text-gray-100">
            {items.map((item) => (
                <div key={item.evaluateID} className="container max-w px-2 sm:px-6 py-6 mx-auto rounded-lg shadow-sm bg-white">
                    <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-orange-400">Jun 1, 2020</span>
                        <div className="px-2 py-1 font-bold rounded bg-orange-500 text-white">
                            {item.statusID
                                ? `${item.statusID}`
                                : 'Estado aún no asignado'}
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="text-2xl font-bold text-orange-400">Nos creasse pendere crescit angelos etc</div>
                        <p className="mt-2 text-sm sm:text-md text-gray-500">Tamquam ita veritas res equidem. Ea in ad expertus paulatim poterunt. Imo volo aspi novi tur. Ferre hic neque vulgo hae athei spero. Tantumdem naturales excaecant notaverim etc cau perfacile occurrere. Loco visa to du huic at in dixi aër.</p>
                    </div>
                    <div className="grid grid-cols-5 items-center justify-between mt-4 space-y-4 sm:space-y-0">
                        <div className="flex items-center justify-center sm:justify-start max-w-3xl col-span-full sm:col-span-3">
                            <img src="https://source.unsplash.com/50x50/?portrait" alt="avatar" className="object-cover w-10 h-10 mx-4 rounded-full bg-gray-500" />
                            <span className="text-gray-500">Leroy Jenkins</span>
                        </div>
                        <div className='flex flex-col sm:flex-row sm:col-span-2 col-span-full gap-2'>
                            <div className="flex-1">
                                <a href={item.beforeProyect} target="_blank" rel="noopener noreferrer">
                                    <CustomButton
                                        type="button"
                                        color='orange'
                                        padding_x='4'
                                        padding_smx='6'
                                        padding_mdx='8'
                                        padding_y='2'
                                        width='full'
                                        height='10'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                        </svg>
                                        Ver Anteproyecto
                                    </CustomButton>
                                </a>
                            </div>
                            <div className="flex-1">
                                <CustomButton onClick={() => handleEdit(item)} type='button' color='orange' padding_x='4' padding_smx='6' padding_mdx='8' padding_y='2' width='full' height='full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    Actualizar
                                </CustomButton>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TableStage;
