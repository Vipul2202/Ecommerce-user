import React from "react";

const OpeningHours = ({ className = "" }) => {
  return (
    <div className={`text-sm leading-tight ${className}`}>
      <p className="font-bold">Mon–Fri: 7:00AM–5:00PM</p>
      <p className="font-bold">Sat: 8:00AM–2:00PM</p>
      <p className="font-bold">Sun: Appointment Only</p>
    </div>
  );
};

export default OpeningHours;