import Sections from "../../../components/sections/sections";

export const Home = () => {

    const sectionsData = [
        {
            title: 'Académico Guia',
            description: 'En esta sección, en calidad de Académico Guía, tendrás la responsabilidad de evaluar el Anteproyecto presentado por los Estudiantes durante la Primera Etapa de esta evaluación. Asimismo, contarás con la capacidad de desarrollar rubricas que faciliten la evaluación de los estudiantes, asegurando un proceso eficiente y sencillo.',
            link: '/Administrative/Academic/FirstStage',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 opacity-80"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
            ),
        },
        {
            title: 'Primer y Segundo Académico',
            description: 'En esta sección, en calidad de Primer Académico y Segundo Académico, tendrás la responsabilidad de evaluar el Anteproyecto presentado por los Estudiantes durante la Segunda Etapa de esta evaluación. Asimismo, contarás con la capacidad de desarrollar rubricas que faciliten la evaluación de los estudiantes durante la Segunda Etapa, asegurando un proceso eficiente y sencillo.',
            link: '/Administrative/Academic/SecondStage',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 opacity-80"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
            ),
        },
        {
            title: 'Director y Co-Director',
            description: 'En esta sección, en calidad de Director y Co-Director, tendrás la responsabilidad de evaluar la tesis presentada por los Estudiantes. Además, contarás con la capacidad de desarrollar rubricas que faciliten la evaluación de los estudiantes, asegurando un proceso eficiente y sencillo.',
            link: '/Administrative/Academic/Thesis',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 opacity-80"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
            ),
        },
    ];

    return (
        <Sections
            title={'Panel de Administración del Academico'}
            description={"Bienvenido al Panel de Administración para la gestión de Magíster para la Universidad de Tarapacá, diseñado para facilitar la gestión de recursos. Supervisa y optimiza las operaciones de tu institución educativa con eficacia."}
            sections={sectionsData}
        />
    )
}
