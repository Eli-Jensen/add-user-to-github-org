// app/invite/page.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image'

const Invite = () => {
  const [input, setInput] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
  const [animate, setAnimate] = useState(false);
  
  // Get the passphrase from the environment variable
  const secretPassphrase = process.env.NEXT_PUBLIC_PASSPHRASE;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the passphrase
    if (passphrase !== secretPassphrase) {
      setMessage({ text: 'Invalid passphrase.', type: 'error' });
      triggerAnimations();
      return;
    }

    try {
      const response = await axios.post('/api/invite', { input });
      setMessage({ text: 'Invitation sent successfully!', type: 'success' });
      triggerAnimations();
    } catch (error) {
      setMessage({ text: 'Failed to send invitation.', type: 'error' });
      triggerAnimations();
    }
  };

  const triggerAnimations = () => {
    setAnimate(true);
    // Reset animation state after animation duration
    setTimeout(() => setAnimate(false), 1000); // Duration should match animation time
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex items-center justify-center flex-1 p-8">
        <div className="flex max-w-5xl bg-white rounded shadow-md">
          {/* Image Container */}
          <div className="relative w-1/2 p-6">
            <Image
              src="/static/ga_tech_coursework.png" // Path to the image in the public/static directory
              width={800}
              height={800}
              alt="Description of the image"
              className="w-full h-auto object-cover rounded"
            />
            {/* Caption Below the Image */}
            <div className="text-center mt-2">
              <h3 className="text-lg font-semibold text-gray-800">
                Preview of GitHub Organization
              </h3>
            </div>
          </div>
          {/* Form Container */}
          <div className="flex-1 p-8">
            <h2 className="text-xl text-justify font-semibold text-gray-800 mb-4">
              To view my private GitHub repositories containing completed Georgia Tech Master of Science in Computer Science course work, enter your GitHub username or email address along with the specific passphrase I have shared with you. You should then receive an email invitation to join &quot;Eli-Jensen-Org.&quot;
            </h2>
            <h2 className="text-base text-justify font-semibold text-gray-800 mb-8">
              Do not request access if you are a current student or intend to apply to Georgia Tech&apos;s Master of Science in Computer Science program.
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter email or GitHub username"
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="password"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="Enter passphrase"
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Invite
              </button>
            </form>
            {message && (
              <p className={`text-center ${message.type === 'success' ? 'text-green-500' : 'text-red-500'} ${animate ? 'pulse' : ''}`}>
                {message.text}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Add the shake and pulse animation CSS */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        .pulse {
          animation: pulse 0.5s ease-in-out;
        }
      `}</style>

    </div>
  );
};

export default Invite;
