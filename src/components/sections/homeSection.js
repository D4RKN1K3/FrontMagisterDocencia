import React from 'react';
import { Link } from "react-router-dom";

function HomeSection({ navigation }) {
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4   sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center sm:text-4xl text-orange-500">Menu Principal</h2>
                <div className="grid grid-cols-1 gap-8  lg:gap-16">
                    <div className="lg:py-12  ">
                        <div className=" container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                            {navigation.map((item) => (
                                <div key={item.id} className="flex flex-col items-center justify-center">
                                    <h2 className="text-xl font-bold text-center  sm:text-2xl text-orange-500 mb-1 "> {item.label} </h2>
                                    <Link
                                        to={item.url}
                                        className="group h-4/5 relative flex justify-center rounded px-2 py-1.5 text-orange-400 hover:bg-orange-600 hover:text-white"
                                    >
                                        {item.icon}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeSection;