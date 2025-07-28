import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ForgotPasswordReset = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post(import.meta.env.VITE_RESET_PASSWORD_API, {
        token,
        password: newPassword,
      });

      alert("Password has been updated successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-[#00a0db] mb-6">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-black mb-2">New Password</label>
          <input
            type="password"
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00a0db]"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <label className="block text-black mb-2">Confirm Password</label>
          <input
            type="password"
            className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00a0db]"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-[#00a0db] hover:bg-[#008ac0] text-white py-2 rounded transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordReset;
