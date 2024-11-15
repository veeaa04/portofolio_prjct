// src/components/Admin.js

import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '', link: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Authentication
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Fetch Projects
  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      setProjects(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProjects();
  }, [isAdmin]);

  // Add Project
  const handleAddProject = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "projects"), newProject);
    setProjects([...projects, { id: docRef.id, ...newProject }]);
    setNewProject({ name: '', description: '', link: '' });
  };

  // Delete Project
  const handleDeleteProject = async (id) => {
    await deleteDoc(doc(db, "projects", id));
    setProjects(projects.filter(project => project.id !== id));
  };

  // Start Editing Project
  const startEditingProject = (project) => {
    setIsEditing(true);
    setNewProject({ name: project.name, description: project.description, link: project.link });
    setCurrentProjectId(project.id);
  };

  // Update Project
  const handleUpdateProject = async (e) => {
    e.preventDefault();
    const projectRef = doc(db, 'projects', currentProjectId);
    await updateDoc(projectRef, newProject);
    setProjects(projects.map((project) =>
      project.id === currentProjectId ? { id: currentProjectId, ...newProject } : project
    ));
    setIsEditing(false);
    setNewProject({ name: '', description: '', link: '' });
    setCurrentProjectId(null);
  };

  return (
    <div className="p-8">
      <h1 className="flex justify-center m-auto text-3xl text-pink-800 font-semibold font-serif mb-10">Only Admin</h1>
      {isAdmin ? (
        <div>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white font-serif rounded mb-4">Logout</button>
          <form onSubmit={isEditing ? handleUpdateProject : handleAddProject} className="space-y-4">
            <h1 className="text-2xl font-serif font-semibold text-pink-800">Insert Your Projects</h1>
            <input type="text" placeholder="Project Name" value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} className="w-full p-2 border rounded" />
            <input type="text" placeholder="Project Description" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} className="w-full p-2 border rounded" />
            <input type="text" placeholder="Project Link" value={newProject.link} onChange={(e) => setNewProject({ ...newProject, link: e.target.value })} className="w-full p-2 border rounded" />
            <button type="submit" className="px-4 py-2 bg-green-500 font-serif text-white rounded">{isEditing ? "Update Project" : "Add Project"}</button>
            {isEditing && (
              <button type="button" onClick={() => { setIsEditing(false); setNewProject({ name: '', description: '', link: '' }); }} className="px-4 py-2 font-serif bg-gray-500 text-white rounded">Cancel</button>
            )}
          </form>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-pink-800 font-serif mb-4">Projects</h2>
            <ul>
              {projects.map((project) => (
                <li key={project.id} className="flex justify-between items-center border-b py-2">
                  <span>{project.name}</span>
                  <div>
                    <button onClick={() => startEditingProject(project)} className="px-4 py-1 bg-yellow-500 text-white font-serif rounded mr-2">Edit</button>
                    <button onClick={() => handleDeleteProject(project.id)} className="px-4 py-1 bg-red-500 text-white font-serif rounded">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" />
          <button type="submit" className="px-4 py-2 bg-pink-500 font-serif text-white rounded">Login</button>
        </form>
      )}
    </div>
  );
};

export default Admin;
