import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../../button/customButton';
import FormButtons from '../../button/form/formButtons';

const SpecializationSection = ({ items, selectedItems, handleEdit, children, updateId, itemName, handleSubmit, closeModal }) => {

    return (
        <section className="bg-white text-orange-400">
            <div className="container mx-auto flex flex-col">
                <div className="divide-y divide-orange-500">
                    {(!updateId) && (
                        <div className="relative grid justify-center grid-cols-5 py-2 sm:py-4 mx-auto sm:space-y-4 sm:space-y-0">
                            <div className="flex items-center justify-center sm:col-span-1 col-span-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 sm:w-28 h-32 sm:h-28">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                </svg>

                            </div>
                            <div className="flex flex-col justify-center max-w-3xl text-center col-span-full sm:col-span-4 sm:text-left">
                                <div className='my-2 space-y-2'>
                                    {children}
                                </div>
                                <div className="flex-1 w-full">
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
                                        {!updateId && (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )}

                                        {updateId && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-6 w-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                />
                                            </svg>
                                        )}
                                        {updateId ? `Actualizar ${itemName}` : `Seleccionar ${itemName}`}
                                    </CustomButton>
                                </div>
                            </div>
                        </div>
                    )}
                    {items.map((item) => (
                        <div key={item.specializationHasUserID}
                            className={`${(updateId && updateId === item.specializationHasUserID) || (selectedItems.length !== 0 && selectedItems[0].specializationHasUserID === item.specializationHasUserID) ? ' mb-1 sm:mb-2' : 'mb-12 sm:mb-2'} relative grid justify-center grid-cols-5 py-2 sm:py-4 mx-auto sm:space-y-4 sm:space-y-0`}>
                            <div className="flex items-center justify-center sm:col-span-1 col-span-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 sm:w-28 h-32 sm:h-28">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                </svg>
                            </div>
                            <div className="flex flex-col justify-center max-w-3xl text-center col-span-full sm:col-span-4 sm:text-left">
                                <span className="text-xs sm:text-sm text-orange-400">
                                    {item.entrySemester.year} - {item.entrySemester.semesterNumber === 1 ? 'Primer' : 'Segundo'} Semestre

                                    {item.completionSemester ? (
                                        <>
                                        {' '} a {item.completionSemester.year} - {item.completionSemester.semesterNumber === 1 ? 'Primer' : 'Segundo'} Semestre
                                        </>
                                    ) : null}
                                </span>

                                <span className={`${(updateId && updateId === item.specializationHasUserID) ? 'hidden' : 'flex justify-center sm:justify-start'} text-xl font-bold md:text-2xl`}>{item.specialization.name}</span>
                                {(updateId && updateId === item.specializationHasUserID) && (
                                    <div className='my-2 space-y-2'>
                                        {children}
                                    </div>
                                )}
                                <span className="break-words my-1 text-xs sm:text-sm text-gray-500">
                                    {item.status.name}
                                </span>
                                {(updateId && updateId === item.specializationHasUserID) && (
                                    <FormButtons
                                        handleSubmit={handleSubmit}
                                        closeModal={closeModal}
                                        updateId={updateId}
                                        itemName={itemName}
                                    />
                                )}
                                <div className={`${(updateId && updateId === item.specializationHasUserID) || (selectedItems.length !== 0 && selectedItems[0].specializationHasUserID === item.specializationHasUserID) ? 'hidden' : 'flex'} flex flex-col sm:flex-row gap-1 sm:gap-2 h-10`}>
                                    {(item.statusID === 8) && (
                                        <div className='flex-1'>
                                            <CustomButton onClick={() => handleEdit(item)} type='button' color='orange' padding_x='4' padding_smx='6' padding_mdx='8' padding_y='2' width='full' height='full'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                                Actualizar
                                            </CustomButton>
                                        </div>
                                    )}

                                    <div className='flex-1'>
                                        <Link
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            to={`${item.specializationHasUserID}`}
                                        >
                                            <CustomButton
                                                type="button"
                                                color='orange'
                                                padding_x='4'
                                                padding_smx='6'
                                                padding_mdx='8'
                                                padding_y='2'
                                                width='full'
                                                height='full'
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />                                                </svg>
                                                Empezar
                                            </CustomButton>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SpecializationSection;
