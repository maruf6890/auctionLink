import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import databaseService from "../Apprwite/database"; // Your database service (Appwrite or others)
import conf from "../config/conf"; // Configuration for Appwrite or your database

export default function PlayerForm() {
  const params = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    auction_id: params.auction_id, // Auction ID from the URL params
    email: "",
    phone: "",
    age: "",
    position: "",
    photo_url: "",
  });

  const [error, setError] = useState(""); // To hold error messages after form submission
  const [loading, setLoading] = useState(false); // For loading state during API call

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Ensure age is always an integer value
    if (name === "age") {
      // Only set the value if it's a valid integer
      const intValue = Number(value);
      if (!Number.isNaN(intValue) && Number.isInteger(intValue)) {
        setFormData({ ...formData, [name]: intValue });
      }
    } else {
      setFormData({ ...formData, [name]: type === "number" ? Number(value) : value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.age || !formData.position || !formData.photo_url) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError(""); // Reset error before submission

    try {
      // Call the API to create a player
      const createdPlayer = await databaseService.createDocument(
        conf.appwritePlayerId, 
        formData
      );
      console.log("Player created successfully:", createdPlayer);
      alert("Player created successfully!");
      navigate(`/`); 
    } catch (error) {
      console.error("Error creating player:", error);
      setError("Failed to create player. Please try again.");
    } finally {
      setLoading(false); // Stop the loading state after the API call
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Player Form</h2>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>} {/* Show error message */}

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter player name"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
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

        {/* Age */}
        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter player age"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Position */}
        <div className="mb-4">
          <label htmlFor="position" className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Enter player position"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Photo URL */}
        <div className="mb-4">
          <label htmlFor="photo_url" className="block text-sm font-medium text-gray-700">
            Photo URL
          </label>
          <input
            type="url"
            id="photo_url"
            name="photo_url"
            value={formData.photo_url}
            onChange={handleChange}
            placeholder="Enter photo URL"
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
