
import React from "react";
const Footer = () => {
  return (
    <footer className="bg-white shadow-inner mt-10 py-6 text-center text-gray-500">
      
      <p className="font-semibold text-indigo-600">
        🚀 RegAlert
      </p>

      <p className="text-sm mt-2">
        Never Miss Any Opportunity Again.
      </p>

      <p className="text-xs mt-3">
        © {new Date().getFullYear()} RegAlert. Built with ❤️ by Karan
      </p>
      
    </footer>
  );
};

export default Footer;