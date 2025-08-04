import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [userName, setUserName] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('pending');
  const [file, setFile] = useState(null);
  const [id, setId] = useState(''); // You can replace this with a real ObjectId from backend
  const API = import.meta.env.VITE_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !reason || !file || !id) {
      alert("All fields are required including ID!");
      return;
    }

    try {
      const response = await axios.put(`${API}/admin/change-booking-status`, {
        id,
        status,
      });

      console.log("API Response:", response.data);
      alert("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10 border-2 border-black">
      <h2 className="text-2xl font-bold text-center text-black mb-4">User Request Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* ID */}
        <div>
          <label className="block text-black font-semibold mb-1">Booking ID</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter Object ID"
            className="w-full border border-blue-300 p-2 rounded"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-black font-semibold mb-1">User Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter user name"
            className="w-full border border-blue-300 p-2 rounded"
          />
        </div>

        {/* Reason */}
        <div>
          <label className="block text-black font-semibold mb-1">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason"
            className="w-full border border-blue-300 p-2 rounded"
            rows={3}
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-black font-semibold mb-1">Upload File</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
          />
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="block text-black font-semibold mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-blue-300 p-2 rounded bg-white"
          >
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
