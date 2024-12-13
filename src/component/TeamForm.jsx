import React, { useState } from "react";
import databaseService from "../Apprwite/database"; // Your database service (Appwrite or others)
import conf from "../config/conf"; // Configuration for Appwrite or your database
import { useNavigate, useParams } from "react-router";

export default function TeamForm() {
  const params= useParams();
  const [formData, setFormData] = useState({
    name: "",
    auction_id:params.auction_id,
    email: "",
    phone: ""
  });

  const [loading, setLoading] = useState(false); // For loading state during API call
  const [error, setError] = useState(""); // To hold error messages after form submission
  const navigate= useNavigate();
  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone ) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError(""); // Reset error before submission

    try {
      // Call the API to create the team manager
      const createdTeam = await databaseService.createDocument(
        conf.appwriteManagerId,  // Replace with your actual collection ID
        formData
      );
      console.log("Team created successfully:", createdTeam);
      alert("We Receved your response !");
      navigate('/');
    } catch (error) {
      console.error("Error creating team:", error);
      setError("Failed to create team. Please try again.");
    } finally {
      setLoading(false); // Stop the loading state after the API call
    }
  };

  // Example team options (replace this with dynamic data if necessary)
  const teamOptions = ["Team A", "Team B", "Team C"];

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Team Manager Form</h2>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>} {/* Show error message */}

      <form onSubmit={handleSubmit}>
        {/* Manager Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Manager Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.manager_name}
            onChange={handleChange}
            placeholder="Enter manager name"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

      

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Submitting..." : "Submit"} {/* Change button text based on loading state */}
          </button>
        </div>
      </form>
    </div>
  );
}
