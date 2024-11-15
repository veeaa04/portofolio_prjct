import React from 'react';
import profile from '../assets/jobe tampan.png.jpeg'
const About = () => {
  return (
    <section className="p-8">
      <div className="flex flex-col items-center">
        <img
          src={profile} // atau gunakan require('../assets/profile.jpg') jika file ada di src/assets
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
        <p className="text-lg font-serif text-pink-800 text-center">
          Hello! I'm a student
        </p>
      </div>
    </section>
  );
};

export default About;
