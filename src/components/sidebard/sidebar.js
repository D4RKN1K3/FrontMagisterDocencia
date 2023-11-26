import React, { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

import logo from '../../img/uta.png'
import { getSession, deleteSession } from '../../utils/sessionHelpers';

const Sidebar = ({ navigationUser, navigation }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (navigate) {
      const sesion = getSession();
      if (sesion === false) {
        navigate("/");
      }
    }
  }, [navigate]);

  const closeSession = (e) => {
    e.preventDefault();
    deleteSession();
    navigate("/")
  };

  return (
    <div
      className="fixed top-0 left-0 flex h-screen w-16 flex-col justify-between bg-zinc-900 z-50"
    >
      <div>
        <div className="inline-flex h-16 w-16 items-center justify-center">
          <span className="grid h-10 w-10 place-content-center rounded-lg text-xs text-gray-300">
            <img src={logo} alt="Logo de la Uta" className="w-6 h-9" />
          </span>
        </div>

        <div className="border-t border-yellow-100">
          <div className="px-2">
            <div className="space-y-1 py-4">

              {navigationUser.map((item) => (
                <Link
                  key={item.id}
                  to={item.url}
                  className="t group relative flex justify-center rounded px-2 py-1.5 text-orange-400 hover:bg-orange-600 hover:text-white"
                >
                  {item.icon}

                  <span
                    style={{ pointerEvents: 'none' }}
                    className="ms-4 absolute top-1/2 ml-6 w-24 -translate-y-1/2 translate-x-3/4 rounded bg-gray-900 py-1.5 text-center text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            <ul className="space-y-1 border-t border-yellow-100 pt-4">
              {navigation.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.url}
                    className="group relative flex justify-center rounded px-2 py-1.5 text-orange-400 hover:bg-orange-600 hover:text-white"
                  >
                    {item.icon}
                    <span
                      style={{ pointerEvents: 'none' }}
                      className="ms-4 absolute top-1/2 ml-6 w-24 -translate-y-1/2 translate-x-3/4 rounded bg-gray-900 py-1.5 text-center text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-yellow-100 p-2">
        <form onSubmit={closeSession}>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-orange-500 hover:bg-orange-600 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>

            <span
              style={{ pointerEvents: 'none' }}
              className="ms-4 absolute top-1/2 ml-6 w-24 -translate-y-1/2 translate-x-3/4 rounded bg-gray-900 py-1.5 text-center text-xs font-medium text-white opacity-0 group-hover:opacity-100"
            >
              Cerrar Sesión
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;