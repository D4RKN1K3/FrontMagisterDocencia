import React, { useState, useEffect } from 'react';
import SearchSelect from '../input/searchSelect';
import Checkbox from '../input/checkbox';
import CustomButton from '../button/customButton';
import ModalCRUD from '../modal/modalCRUD';
import FormContainer from '../forms/body/formContainer';
import FilterPanel from '../search/filterPanel';

const TableRubric = ({ items, defaultRubricHasQuestion, rubricHasQuestion, setRubricHasQuestion, question, defaultQuestion, handleEdit, handleSaveChanges, handleExportPDF }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleCheckboxChangeUpdate = (rowIndex, field, isChecked) => {
        setRubricHasQuestion((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];

            updatedQuestions[rowIndex] = {
                ...updatedQuestions[rowIndex],
                excellent: '-',
                good: '-',
                medium: '-',
                bad: '-',
            };

            if (isChecked) {
                updatedQuestions[rowIndex][field] = 'X';
            }

            return updatedQuestions;
        });
    };

    const handleDeleteSelectedRows = () => {
        setRubricHasQuestion((prevQuestions) =>
            prevQuestions.filter((rubricHasQuestion, rowIndex) => !selectedRows.includes(rowIndex))
        );
        setSelectedRows([]);
    };

    const handleCheckboxChange = (rowIndex, isChecked) => {
        if (isChecked) {
            setSelectedRows((prevSelectedRows) => [...prevSelectedRows, rowIndex]);
        } else {
            setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((row) => row !== rowIndex));
        }
    }

    const handleSelectAllChange = (isChecked) => {
        setSelectAll(isChecked);
        setSelectedRows([]);

        if (isChecked) {
            const selectedRows = rubricHasQuestion
                .map((question, index) => (question.roleHasUserID !== null ? index : null))
                .filter((index) => index !== null);
            setSelectedRows(selectedRows);
        }
    };

    const handleAddQuestion = () => {
        setRubricHasQuestion((prevQuestions) => [
            ...prevQuestions,
            {
                rubricHasQuestionID: Date.now(),
                questionID: newItem.questionID,
                rubricID: rubricHasQuestion[0].rubricID,
                question: newItem.question,
                excellent: '-',
                good: '-',
                medium: '-',
                bad: '-',
                roleHasUserID: Date.now(),
            },
        ]);
        closeModal();
    };

    const [editMode, setEditMode] = useState(null);
    const [newItem, setNewItem] = useState({
        questionID: '',
        question: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editMode !== null) {
            handleSaveEdit();
        } else {
            handleAddQuestion();
        }
    };

    const handleEditQuestion = (rowIndex, item) => {
        setEditMode(rowIndex);
        setNewItem({
            questionID: item.questionID,
            question: item.question,
        });
        openModal();
    };

    const handleSaveEdit = () => {
        setRubricHasQuestion((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[editMode] = {
                ...updatedQuestions[editMode],
                question: newItem.question,
                questionID: newItem.questionID,
            };
            return updatedQuestions;
        });
        setEditMode(null);
        closeModal();
    };

    const clearItem = () => {
        setEditMode(null);
        setNewItem({
            questionID: '',
            question: '',
        });
    };

    const handleResetToDefault = () => {
        if (defaultRubricHasQuestion.length > 0) {
            setRubricHasQuestion([...defaultRubricHasQuestion]);
        }
    };

    useEffect(() => {
        if (rubricHasQuestion.length === 0 && defaultQuestion.length !== 0) {
            const defaultQuestions = defaultQuestion.map((defaultQ) => ({
                rubricHasQuestionID: defaultQ.questionID,
                questionID: defaultQ.questionID,
                rubricID: '',
                question: defaultQ.question,
                excellent: '-',
                good: '-',
                medium: '-',
                bad: '-',
                roleHasUserID: null,
            }));

            setRubricHasQuestion(defaultQuestions);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rubricHasQuestion.length, defaultQuestion.length]);

    const [ModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
        clearItem();
    };

    const [eventType, setEventType] = useState(0);

    const handleSuccess = () => {
        if (eventType === 1) {
            handleSaveChanges();
        } else if (eventType === 2) {
            handleResetToDefault();
        }
        if (showAgain) {
            setDontShowAgain(true);
        }
        closeModalWarning();
    };

    const [ModalOpenWarning, setModalOpenWarning] = useState(false);
    const [showAgain, setShowAgain] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);

    const openModalWarning = (eventType) => {
        setEventType(eventType);
        if (dontShowAgain) {
            handleSuccess();
        }
        else {
            setModalOpenWarning(true);
        }
    };
    const closeModalWarning = () => {
        setModalOpenWarning(false);
    };
    return (
        <>
            <ModalCRUD isOpen={ModalOpen}>
                <FormContainer
                    createMessage={`Agregar Pregunta`}
                    create2Message={`Agregar Pregunta a la Rubrica`}
                    updateMessage={'Actualizar Pregunta'}
                    update2Message={'Actualizar Pregunta de la Rubrica'}
                    updateId={editMode}
                    itemName={'Pregunta'}
                    pText={''}
                    handleSubmit={handleSubmit}
                    closeModal={closeModal}
                >
                    <SearchSelect
                        selectId='questionRubric'
                        placeholder="Seleccionar una Pregunta"
                        options={question}
                        value={newItem.questionID}
                        onChange={(selectedOption) => setNewItem({ ...newItem, questionID: selectedOption.value, question: selectedOption.label })}
                    />
                </FormContainer>
            </ModalCRUD>
            {!dontShowAgain &&
                <ModalCRUD isOpen={ModalOpenWarning}>
                    <div className="flex flex-col max-w-lg gap-2 p-6 rounded-md shadow-md bg-white text-orange-400">
                        <h2 className="text-2xl text-center sm:text-start font-semibold leadi tracki text-orange-400">
                            {eventType === 1
                                ? '¿Estás seguro de que deseas guardar los cambios?'
                                : '¿Estás seguro de que deseas restablecer los cambios a la versión inicial?'}
                        </h2>
                        <p className="flex-1 text-justify sm:text-start text-gray-400">
                            {eventType === 1
                                ? 'Al hacer clic en "Guardar Cambios", se actualizarán y guardarán los cambios realizados. ¿Estás seguro de continuar?'
                                : 'Al hacer clic en "Restablecer Cambios", se volverán a la versión inicial. ¿Estás seguro de que deseas restablecer los cambios?'}
                        </p>
                        <div className="flex flex-col justify-between gap-2 sm:mt-4 sm:flex-row">
                            <div className="flex items-center justify-center gap-2">
                                <Checkbox
                                    id={`showAgain`}
                                    name={`showAgain`}
                                    checked={showAgain}
                                    onChange={(e) => setShowAgain(e.target.checked)}
                                />
                                <label for="showAgain" className="text-sm cursor-pointer text-gray-400">No vuelvas a mostrar este mensaje</label>
                            </div>
                            <div className="flex flex-col gap-1 sm:flex-row">
                                <div className='w-full sm:w-36'>
                                    <CustomButton
                                        onClick={handleSuccess}
                                        type='button'
                                        color='orange'
                                        padding_x='4'
                                        padding_smx='6'
                                        padding_mdx='8'
                                        padding_y='2'
                                        width='full'
                                        height='10'
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Continuar
                                    </CustomButton>
                                </div>
                                <div className='w-full sm:w-36'>
                                    <CustomButton
                                        onClick={closeModalWarning}
                                        type='button'
                                        color='red'
                                        padding_x='4'
                                        padding_smx='6'
                                        padding_mdx='8'
                                        padding_y='2'
                                        width='full'
                                        height='10'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Cancelar
                                    </CustomButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalCRUD >
            }
            <section className="bg-white text-orange-400">
                <div className="container max-w-xl py-2 mx-auto space-y-2 sm:max-w-7xl">
                    <div>
                        <h2 className="text-3xl font-bold tracki text-center sm:text-5xl text-orange-400">Aliquip definiebas ad est</h2>
                        <p className="max-w-3xl mx-auto mt-4 text-xl text-center text-gray-500">Quando cetero his ne, eum admodum sapientem ut.</p>
                    </div>
                    {items.map((item) => (
                        <React.Fragment key={item.rubricID}>
                            <div className="text-center sm:text-start">
                                <h3 className="text-2xl font-bold tracki sm:text-3xl text-orange-400">{item.rubricName}</h3>
                                <p className="mt-2 text-lg text-gray-500">{item.description}</p>
                            </div>
                            <FilterPanel message={'Administrar Preguntas de la Rubrica'}>
                                <div className='flex flex-col items-center p-2 gap-1 sm:flex-row sm:justify-center'>
                                    <div className='flex-1 w-full'>
                                        <CustomButton
                                            onClick={openModal}
                                            type='button'
                                            color='orange'
                                            padding_x='4'
                                            padding_smx='6'
                                            padding_mdx='8'
                                            padding_y='2'
                                            width='full'
                                            height='10'
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Agregar Pregunta
                                        </CustomButton>
                                    </div>
                                    <div className='flex-1 w-full'>
                                        <CustomButton
                                            onClick={() => openModalWarning(1)} type='button'
                                            color='orange'
                                            padding_x='4'
                                            padding_smx='6'
                                            padding_mdx='8'
                                            padding_y='2'
                                            width='full'
                                            height='10'
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                                            </svg>
                                            Guardar Cambios
                                        </CustomButton>
                                    </div>
                                    <div className='flex-1 w-full'>
                                        <CustomButton
                                            onClick={() => openModalWarning(2)} type='button'
                                            color='orange'
                                            padding_x='4'
                                            padding_smx='6'
                                            padding_mdx='8'
                                            padding_y='2'
                                            width='full'
                                            height='10'
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                            </svg>
                                            Restaurar Cambios
                                        </CustomButton>
                                    </div>
                                    <div className='flex-1 w-full'>
                                        <CustomButton
                                            onClick={handleExportPDF} type='button'
                                            color='orange'
                                            padding_x='4'
                                            padding_smx='6'
                                            padding_mdx='8'
                                            padding_y='2'
                                            width='full'
                                            height='10'
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Generar PDF
                                        </CustomButton>
                                    </div>
                                    <div className='flex-1 w-full'>
                                        <CustomButton
                                            onClick={handleDeleteSelectedRows} type='button'
                                            color='red'
                                            padding_x='4'
                                            padding_smx='6'
                                            padding_mdx='8'
                                            padding_y='2'
                                            width='full'
                                            height='10'
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                            Eliminar Preguntas
                                        </CustomButton>
                                    </div>
                                </div>
                            </FilterPanel>
                            <div className="container mx-auto text-gray-500">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm">
                                        <colgroup>
                                            <col className="" />
                                            <col className="w-1/2 sm:w-3/5" />
                                            <col className="" />
                                            <col className="" />
                                            <col className="" />
                                            <col className="" />
                                            <col className="" />
                                        </colgroup>
                                        <thead className="bg-gray-800 text-gray-100 border border-gray-700">
                                            <tr className="text-left">
                                                <th className="p-3 text-center">
                                                    <Checkbox
                                                        id={`selectAll-${item.rubricID}`}
                                                        name={`selectAll-${item.rubricID}`}
                                                        checked={selectAll}
                                                        onChange={(e) => handleSelectAllChange(e.target.checked)}
                                                    />
                                                </th>
                                                <th className="p-3 text-center">Pregunta</th>
                                                <th className="p-3 text-center">Excelente</th>
                                                <th className="p-3 text-center">Bueno</th>
                                                <th className="p-3 text-center">Medio</th>
                                                <th className="p-3 text-center">Malo</th>
                                                <th className="p-3 text-center"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rubricHasQuestion.map((rubricQuestion, rowIndex) => (
                                                <tr key={rubricQuestion.rubricHasQuestionID} className="border border-opacity-20 border-gray-700 bg-white">
                                                    <td className="p-3 text-center border border-opacity-20 border-gray-700">
                                                        {rubricQuestion.roleHasUserID !== null && (
                                                            <Checkbox
                                                                id={`delete-${rubricQuestion.rubricHasQuestionID}`}
                                                                name={`delete-${rubricQuestion.rubricHasQuestionID}`}
                                                                checked={selectedRows.includes(rowIndex)}
                                                                onChange={() => handleCheckboxChange(rowIndex, 'delete', !selectedRows.includes(rowIndex))}
                                                            />
                                                        )}
                                                    </td>
                                                    <td className="p-3 whitespace-nowrap text-center border border-opacity-20 border-gray-700">
                                                        {rubricQuestion.question}
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        <Checkbox
                                                            id={`excellent-${rubricQuestion.rubricHasQuestionID}`}
                                                            name={`excellent-${rubricQuestion.rubricHasQuestionID}`}
                                                            checked={rubricQuestion.excellent === 'X'}
                                                            onChange={(e) => handleCheckboxChangeUpdate(rowIndex, 'excellent', e.target.checked)}
                                                        />
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        <Checkbox
                                                            id={`good-${rubricQuestion.rubricHasQuestionID}`}
                                                            name={`good-${rubricQuestion.rubricHasQuestionID}`}
                                                            checked={rubricQuestion.good === 'X'}
                                                            onChange={(e) => handleCheckboxChangeUpdate(rowIndex, 'good', e.target.checked)}
                                                        />
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        <Checkbox
                                                            id={`medium-${rubricQuestion.rubricHasQuestionID}`}
                                                            name={`medium-${rubricQuestion.rubricHasQuestionID}`}
                                                            checked={rubricQuestion.medium === 'X'}
                                                            onChange={(e) => handleCheckboxChangeUpdate(rowIndex, 'medium', e.target.checked)}
                                                        />
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        <Checkbox
                                                            id={`bad-${rubricQuestion.rubricHasQuestionID}`}
                                                            name={`bad-${rubricQuestion.rubricHasQuestionID}`}
                                                            checked={rubricQuestion.bad === 'X'}
                                                            onChange={(e) => handleCheckboxChangeUpdate(rowIndex, 'bad', e.target.checked)}
                                                        />
                                                    </td>
                                                    <td className="p-2 text-center border border-opacity-20 border-gray-700">
                                                        {rubricQuestion.roleHasUserID !== null && (
                                                            <div className='w-40'>
                                                                <CustomButton
                                                                    onClick={() => handleEditQuestion(rowIndex, rubricQuestion)} type='button'
                                                                    color='orange'
                                                                    padding_x='4'
                                                                    padding_smx='6'
                                                                    padding_mdx='8'
                                                                    padding_y='2'
                                                                    width='full'
                                                                    height='10'
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                    </svg>
                                                                    Actualizar
                                                                </CustomButton>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </section>
        </>
    );
};

export default TableRubric;
