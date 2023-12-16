import React from 'react';
import { format } from 'date-fns';
import CustomButton from '../button/customButton';
import { Link } from 'react-router-dom';

const TableStage = ({ items, specializationHasStudent, handleEdit, fetchRubric }) => {
    return (
        <div className="bg-white text-gray-100">
            {items.map((item) => (
                <div key={item.evaluateID} className="container max-w px-2 sm:px-6 py-6 mx-auto rounded-lg shadow-sm bg-white">
                    <div className="flex items-center justify-between">
                        <span className="text-sm sm:text-lg text-orange-400">
                            {specializationHasStudent.year} - {specializationHasStudent.semesterNumber === 1 ? 'Primer' : 'Segundo'} Semestre
                        </span>
                        <div className="px-2 py-1 font-bold rounded bg-orange-500 text-white">
                            {item.stage.stageName}
                        </div>
                    </div>
                    <div className="mb-2">
                        <div className="text-xl text-center sm:text-start font-bold md:text-2xl text-orange-400">{specializationHasStudent.name} - {specializationHasStudent.typeEvaluateName}</div>
                    </div>
                    <div className='flex flex-col sm:flex-row justify-start items-center space-x-2'>
                        <span className="break-words text-xs sm:text-sm text-gray-500">
                            {specializationHasStudent.typeEvaluateName} Subido: {format(new Date(item.createdDate), 'dd/MM/yyyy')} a las {format(new Date(item.createdDate), 'HH:mm')}
                        </span>
                        <span className="break-words text-xs sm:text-sm text-gray-500">
                            Última Actualización del {specializationHasStudent.typeEvaluateName}: {format(new Date(item.updateDate), 'dd/MM/yyyy')} a las {format(new Date(item.updateDate), 'HH:mm')}
                        </span>
                    </div>
                    <div className="grid grid-cols-4 items-center justify-between mt-2 sm:mt-4 space-y-4 sm:space-y-0">
                        <div className='flex flex-col sm:flex-row sm:col-span-2 col-span-full gap-2 justify-start sm:justify-start'>
                            {(item.stageID === 1) && (
                                <>
                                    <div className="flex items-center justify-center sm:justify-start max-w-3xl col-span-full sm:col-span-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="object-cover w-10 h-10 mx-4 rounded-full bg-orange-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                        </svg>
                                        <span className="text-gray-500">
                                            {specializationHasStudent.guideAcademic_fullName
                                                ? specializationHasStudent.guideAcademic_fullName
                                                : 'Académico aún no asignado'
                                            }
                                        </span>
                                    </div>
                                </>
                            )}
                            {(item.stageID === 2) && (
                                <>
                                    <div className="flex items-center justify-center sm:justify-start max-w-3xl col-span-full sm:col-span-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="object-cover w-10 h-10 mx-4 rounded-full bg-orange-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                        </svg>
                                        <span className="text-gray-500">{specializationHasStudent.academicA_fullName}</span>
                                    </div>
                                    <div className="flex items-center justify-center sm:justify-start max-w-3xl col-span-full sm:col-span-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="object-cover w-10 h-10 mx-4 rounded-full bg-orange-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                        </svg>
                                        <span className="text-gray-500">{specializationHasStudent.academicB_fullName}</span>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className='flex flex-col sm:flex-row sm:col-span-2 col-span-full gap-2'>
                            <div className="flex-1">
                                <Link to={item.projectURL} target="_blank" rel="noopener noreferrer">
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
                                        Ver {specializationHasStudent.typeEvaluateName}
                                    </CustomButton>
                                </Link>
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
                    <div className='flex flex-col sm:flex-row sm:col-span-2 col-span-full gap-2 my-2'>
                        {(item.stageID === 1) && (
                            <div className="flex-1">
                                <CustomButton onClick={() => fetchRubric(item.evaluateID, specializationHasStudent.guideAcademic_userID)} type='button' color='orange' padding_x='4' padding_smx='6' padding_mdx='8' padding_y='2' width='full' height='full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                    </svg>
                                    Ver Rubrica del Academico Guia
                                </CustomButton>
                            </div>
                        )}
                        {(item.stageID === 2) && (
                            <>
                                <div className="flex-1">
                                    <CustomButton onClick={() => handleEdit(item.evaluateID, specializationHasStudent.academicA_evaluateHasUserID)} type='button' color='orange' padding_x='4' padding_smx='6' padding_mdx='8' padding_y='2' width='full' height='full'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                        </svg>
                                        Ver Rubrica del Academico A
                                    </CustomButton>
                                </div>
                                <div className="flex-1">
                                    <CustomButton onClick={() => handleEdit(item.evaluateID, specializationHasStudent.academicB_evaluateHasUserID)} type='button' color='orange' padding_x='4' padding_smx='6' padding_mdx='8' padding_y='2' width='full' height='full'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                        </svg>
                                        Ver Rubrica del Academico B
                                    </CustomButton>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TableStage;
