import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-white py-2 px-4 fixed top-0 left-0 w-full z-10">
            <div className="container">
                <div className="ml-16 flex items-center justify-center sm:justify-start">
                    <nav aria-label="Breadcrumb">
                        <ol className="flex items-center gap-1 text-sm text-gray-600">
                            <li>
                                <Link href="#" className="block transition hover:text-gray-700">
                                    <span className="sr-only"> Home </span>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                </Link>
                            </li>

                            <li className="rtl:rotate-180">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </li>

                            <li>
                                <Link href="#" className="block transition hover:text-gray-700"> Shirts </Link>
                            </li>

                            <li className="rtl:rotate-180">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </li>

                            <li>
                                <Link href="#" className="block transition hover:text-gray-700"> Plain Tee </Link>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
