import React, { useState } from 'react';

const ConfirmationPage = () => {
  const [email, setEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (email.trim()) {
      setConfirmed(true);
      // You can also call your API here to send confirmation email
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#00a0db] text-center mb-6">
          Confirm Your Email
        </h2>

        {!confirmed ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a0db] mb-4"
            />
            <button
              onClick={handleConfirm}
              className="w-full bg-[#00a0db] hover:bg-[#0088bb] text-white font-semibold py-2 rounded-md transition-all duration-200"
            >
              Confirm
            </button>
          </>
        ) : (
          <p className="text-center text-green-600 font-semibold">
            Confirmation email sent to {email}
          </p>
        )}
      </div>
    </div>
  );
};

export default ConfirmationPage;
