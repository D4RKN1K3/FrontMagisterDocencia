import Sections from "../../../components/sections/sections";

export const Home = () => {

    const sectionsData = [
        {
            title: 'Gestion de Usuarios',
            description: ' En esta sección, tendrás la capacidad de crear, actualizar y eliminar información de los usuarios. Además, podrás realizar tareas como importar y exportar datos de usuarios, modificar sus roles, y cambiar las contraseñas de los usuarios de manera eficiente y sencilla.',
            link: '/Administrative/Mandated/Users',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 opacity-80"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path d="M18 10.5V6l-2.11 1.06A3.999 3.999 0 0112 12a3.999 3.999 0 01-3.89-4.94L5 5.5 12 2l7 3.5v5h-1M12 9l-2-1c0 1.1.9 2 2 2s2-.9 2-2l-2 1m2.75-3.58L12.16 4.1 9.47 5.47l2.6 1.32 2.68-1.37M12 13c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-3 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1z" />
                </svg>
            ),
        },
        {
            title: 'Gestion de Académicos',
            description: ' En esta sección, tendrás la capacidad de crear, actualizar y eliminar información de los académicos. Además, podrás realizar tareas como importar y exportar datos de usuarios de manera eficiente y sencilla.',
            link: '/Administrative/Mandated/Academic',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 opacity-80"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path d="M18 10.5V6l-2.11 1.06A3.999 3.999 0 0112 12a3.999 3.999 0 01-3.89-4.94L5 5.5 12 2l7 3.5v5h-1M12 9l-2-1c0 1.1.9 2 2 2s2-.9 2-2l-2 1m2.75-3.58L12.16 4.1 9.47 5.47l2.6 1.32 2.68-1.37M12 13c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-3 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1z" />
                </svg>
            ),
        },
        {
            title: 'Gestion de Estudiantes',
            description: ' En esta sección, tendrás la capacidad de crear, actualizar y eliminar información de los estudiantes. Además, podrás realizar tareas como importar y exportar datos de usuarios de manera eficiente y sencilla.',
            link: '/Administrative/Mandated/Student',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 opacity-80"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path d="M18 10.5V6l-2.11 1.06A3.999 3.999 0 0112 12a3.999 3.999 0 01-3.89-4.94L5 5.5 12 2l7 3.5v5h-1M12 9l-2-1c0 1.1.9 2 2 2s2-.9 2-2l-2 1m2.75-3.58L12.16 4.1 9.47 5.47l2.6 1.32 2.68-1.37M12 13c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-3 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1z" />
                </svg>
            ),
        },
        {
            title: 'Gestión de Títulos',
            description: 'En esta sección, tendrás la capacidad de crear, actualizar y eliminar información de los títulos de manera eficiente y sencilla.',
            link: '/Administrative/Mandated/Title',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 opacity-80"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                </svg>
            ),
        },
        {
            title: 'Digital Campaigns',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.',
            link: '/services/digital-campaigns',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 opacity-80"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path d="M18 10.5V6l-2.11 1.06A3.999 3.999 0 0112 12a3.999 3.999 0 01-3.89-4.94L5 5.5 12 2l7 3.5v5h-1M12 9l-2-1c0 1.1.9 2 2 2s2-.9 2-2l-2 1m2.75-3.58L12.16 4.1 9.47 5.47l2.6 1.32 2.68-1.37M12 13c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-3 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1z" />
                </svg>
            ),
        },
        {
            title: 'Digital Campaigns',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.',
            link: '/services/digital-campaigns',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 opacity-80"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path d="M18 10.5V6l-2.11 1.06A3.999 3.999 0 0112 12a3.999 3.999 0 01-3.89-4.94L5 5.5 12 2l7 3.5v5h-1M12 9l-2-1c0 1.1.9 2 2 2s2-.9 2-2l-2 1m2.75-3.58L12.16 4.1 9.47 5.47l2.6 1.32 2.68-1.37M12 13c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-3 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1z" />
                </svg>
            ),
        },
        {
            title: 'Digital Campaigns',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.',
            link: '/services/digital-campaigns',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 opacity-80"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path d="M18 10.5V6l-2.11 1.06A3.999 3.999 0 0112 12a3.999 3.999 0 01-3.89-4.94L5 5.5 12 2l7 3.5v5h-1M12 9l-2-1c0 1.1.9 2 2 2s2-.9 2-2l-2 1m2.75-3.58L12.16 4.1 9.47 5.47l2.6 1.32 2.68-1.37M12 13c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-3 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1z" />
                </svg>
            ),
        },
    ];

    return (
        <Sections
            title={'Panel de Administración del Encargado'}
            description={"Bienvenido al Panel de Administración para la gestión de Magíster para la Universidad de Tarapacá, diseñado para facilitar la gestión de recursos. Supervisa y optimiza las operaciones de tu institución educativa con eficacia."}
            sections={sectionsData}
        />
    )
}
