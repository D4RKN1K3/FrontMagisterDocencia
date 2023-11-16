import React from 'react';
import { Link } from "react-router-dom";

function HomeSection({ navigation }) {
    return (
        <section>
            <div
                className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
            >
                <h2 className="text-3xl font-bold text-center sm:text-4xl text-orange-500">Menu Principal</h2>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div className="lg:py-24 ">
                        <ul className="space-y-1 pt-4">
                            {navigation.map((item) => (
                                <li key={item.id}>
                                    <h2 className="text-3xl font-bold text-center sm:text-4xl text-orange-500 mb-1 "> {item.label} </h2>
                                    <Link
                                        to={item.url}
                                        className="group relative flex justify-center rounded px-2 py-1.5 text-orange-400 hover:bg-orange-600 hover:text-white"
                                    >
                                        {item.icon}  
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeSection;
