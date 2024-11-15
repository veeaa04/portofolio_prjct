// src/components/Navbar.js
import React from 'react';
import logo1 from '../assets/Jobe Bellingham (1).jpeg'; // Adjust the path based on your project structure
import logo2 from '../assets/heeeey😍.jpeg';
import logo3 from '../assets/jobe bellingham (2).jpeg';

const Navbar = () => {
    return (
        <nav className="bg-pink-500 font-serif p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                {/* Replace the title with logos */}
                <div className="flex items-center space-x-2">
                    <img src={logo1} alt="Logo 1" className="h-10" /> {/* Adjust height as needed */}
                    <img src={logo2} alt="Logo 2" className="h-6" />
                    <img src={logo3} alt="Logo 3" className="h-8" />
                </div>

                <ul className="flex space-x-4">
                    <li><a href="/about" className="font-serif hover:text-pink-600">About</a></li>
                    <li><a href="/projects" className="font-serif hover:text-pink-600">Projects</a></li>
                    <li><a href="/contact" className="font-serif hover:text-pink-600">Contact</a></li>
                    <li><a href="/admin" className="font-serif hover:text-pink-600">Admin</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
