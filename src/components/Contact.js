// src/components/Contact.js
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'messages'), {
                name,
                email,
                message,
                timestamp: new Date()
            });
            setStatus('Message sent!');
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            setStatus('Failed to send message');
            console.error('Error adding document: ', error);
        }
    };

    return (
        <section id="contact" className="p-8 bg-pink-100">
            <div className="container mx-auto">
                <h2 className="text-3xl font-semibold text-pink-800 font-serif mb-4">Contact Me</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <textarea
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <button type="submit" className="px-4 py-2 bg-pink-400 font-serif text-pink-800 rounded">Send Message</button>
                    {status && <p className="mt-4 font-serif text-pink-600">{status}</p>}
                </form>
            </div>
        </section>
    );
};

export default Contact;
