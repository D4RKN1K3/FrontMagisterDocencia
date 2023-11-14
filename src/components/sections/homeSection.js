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
                    <div
                        className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full"
                    >
                        <img
                            alt="Party"
                            src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>


                    <div className="lg:py-24">

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
                        

                        <a href='/Administrative/Academic'> 
                        <h2 className="text-3xl font-bold text-center sm:text-4xl text-orange-500 mb-1 ">Academico</h2>
                            <img src="https://images.unsplash.com/photo-1533709475520-a0745bba78bf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Academico" />
                        </a>

                        <p className="mt-4 text-gray-600">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui hic
                            atque tenetur quis eius quos ea neque sunt, accusantium soluta minus
                            veniam tempora deserunt? Molestiae eius quidem quam repellat.
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeSection;
