// src/components/Projects.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const querySnapshot = await getDocs(collection(db, 'projects'));
            setProjects(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchProjects();
    }, []);

    return (
        <section id="project" className="p-8 bg-white">
            <div className="container mx-auto">
                <h2 className="text-3xl font-serif text-pink-800 font-semibold mb-4">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <div key={project.id} className="p-4 bg-pink-100 rounded shadow-md">
                            <h3 className="text-xl font-serif t-font-bold">{project.name}</h3>
                            <p className="font-serif text-pink-800">{project.description}</p>
                            <a href={project.link} className="font-serif text-pink-500" target="_blank" rel="noopener noreferrer">
                                View Project
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
