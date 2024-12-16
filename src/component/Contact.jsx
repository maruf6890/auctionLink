import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import conf from "../config/conf";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    
    const SERVICE_ID = conf.emailJsServiceKey;
    const TEMPLATE_ID = conf.emailJsTemplateKey;
    const USER_ID = conf.emailJsUserId;

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, USER_ID);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Clear the form
    } catch (error) {
      setStatus("Failed to send the message. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-10 flex -mt-10 justify-center">
      <div className="bg-white shadow-md  rounded-lg p-8  w-full">
        <h1 className="text-2xl font-bold text-[#141B41] text-center mb-6">
          Contact Us
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#141B41]"
              placeholder="Your Name"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#141B41]"
              placeholder="Your Email"
            />
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#141B41]"
              placeholder="Your Message"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="">
            <button
              type="submit"
              className="bg-[#141B41] text-white font-medium py-2 px-6 rounded-lg hover:bg-[#0f1736] transition duration-200"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Status Message */}
        {status && (
          <p
            className={`text-center mt-4 ${
              status.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;

