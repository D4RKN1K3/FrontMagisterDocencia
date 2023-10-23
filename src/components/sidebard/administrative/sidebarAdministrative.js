import React from 'react';
import Sidebar from '../sidebar';
import { Outlet } from "react-router-dom";

const navigationUser = [
  {
    id: 1,
    label: 'Inicio',
    url: '/Administrative',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 opacity-75"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    width: 'w-24',
  },
  {
    id: 2,
    label: 'Perfil',
    url: '/Administrative/Profile',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 opacity-75"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    width: 'w-24',
  },
];

const navigation = [
  {
    id: 1,
    label: 'Director',
    url: '/Administrative/Director',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 opacity-75"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
    width: 'w-24',
  },
  {
    id: 2,
    label: 'Encargado',
    url: '/Administrative/Mandated',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 opacity-75"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M18 10.5V6l-2.11 1.06A3.999 3.999 0 0112 12a3.999 3.999 0 01-3.89-4.94L5 5.5 12 2l7 3.5v5h-1M12 9l-2-1c0 1.1.9 2 2 2s2-.9 2-2l-2 1m2.75-3.58L12.16 4.1 9.47 5.47l2.6 1.32 2.68-1.37M12 13c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-3 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1z" />
      </svg>
    ),
    width: 'w-24',
  },
  {
    id: 3,
    label: 'Academico',
    url: '/Administrative/Academic',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 opacity-75"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    width: 'w-24',
  },
];

function SidebarAdministrative() {
  return (
    <>
      <header>
        <Sidebar navigationUser={navigationUser} navigation={navigation} />
      </header>
      <div className="container ml-8">
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default SidebarAdministrative;
