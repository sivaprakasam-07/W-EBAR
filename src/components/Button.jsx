import React from "react";

const Button = ({ children, className = "", ...props }) => {
    return (
        <button
            className={`w-full sm:w-auto px-6 py-3 sm:px-4 sm:py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all text-center ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
