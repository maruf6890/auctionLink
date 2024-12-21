import React, { useState } from "react";
import { FiCopy, FiCheckCircle } from "react-icons/fi"; // Importing icons from React Icons

export default function CopyableText({text}) {
  const [copied, setCopied] = useState(false);

  

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => console.error("Failed to copy text:", err));
  };

  return (
    <div className=" items-start p-2  border border-gray-300 rounded-lg max-full">
      {/* Copyable Text Section */}
      <div className="p-4 relative themeinput flex justify-between items-center">
        <span className="text-gray-800 font-medium">{text}</span>
        <button
          onClick={handleCopy}
          className="ml-4 absolute right-0 top-0 text-blue-500 hover:text-blue-700 transition duration-200"
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <FiCheckCircle className="w-5 h-5" />
          ) : (
            <FiCopy className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Status Message */}
      {copied && (
        <div
          className="text-green-500 flex items-center space-x-2"
          aria-live="polite"
        >
          <FiCheckCircle className="w-4 h-4" />
          <span>Copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}
