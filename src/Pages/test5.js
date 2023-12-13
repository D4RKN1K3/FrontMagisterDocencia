import HandleRubricCRUD from "../components/crud/handleRubric/handleRubricCRUD";

const EncryptPdf = () => {
  const myUrls = [
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/handleRubric/rubric/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/handleRubric/rubric/rubricHasQuestionHasEvaluate',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/handleRubric/rubricHasQuestion/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/handleRubric/question/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/handleRubric/question/defaultQuestion',
];


return (
    <HandleRubricCRUD name={'Rubrica'} urls={myUrls} title={`Bienvenido a gestión de rubricas`} subtitle={'CRUD de Rubricas'} />
)
};

export default EncryptPdf;
