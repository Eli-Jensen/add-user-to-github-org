// app/invite/page.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';

const Invite = () => {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/invite', { input });
      setMessage('Invitation sent successfully!');
    } catch (error) {
      setMessage('Failed to send invitation.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <Head>
        <title>Invite User</title>
      </Head>
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800">Invite User to GitHub Organization</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter email or GitHub username"
            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Invite
          </button>
        </form>
      </div>
    </div>
  );
};

export default Invite;
