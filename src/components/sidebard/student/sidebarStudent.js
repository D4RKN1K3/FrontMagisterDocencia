import React from 'react';
import Sidebar from '../sidebar';
import { Outlet } from "react-router-dom";

const navigationUser = [
  {
    id: 1,
    label: 'Inicio',
    url: '/Dashboard',
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
    url: '/Dashboard/Profile',
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
];

function SidebarStudent() {
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

export default SidebarStudent;
