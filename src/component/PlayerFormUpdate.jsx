import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import databaseService from "../Apprwite/database"; // Your database service (Appwrite or others)
import conf from "../config/conf"; // Configuration for Appwrite or your database

export default function PlayerFormUpdate() {
  const { player_id } = useParams();
  const navigate = useNavigate();

  const [player, setPlayer] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch player data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await databaseService.getDocument(conf.appwritePlayerId, player_id);
        setPlayer(data);
      } catch (error) {
        console.log("Error fetching player data", error);
        setError("Failed to load player data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [player_id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer((prevPlayer) => ({ ...prevPlayer, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!player.name || !player.email || !player.phone || !player.age || !player.position || !player.photo_url) {
      alert("Please fill in all fields.");
      return;
    }
    const obj={
      name:e.target.name.value,
      phone:e.target.email.value,
      email:e.target.phone.value,
      category:e.target.category.value,
      base_price: e.target.min_price.number,
      photo_url: e.target.photo_url.value,
      age: e.target.age.number
      
    }
    

    setLoading(true);
    setError("");

    try {
      await databaseService.updateDocument(conf.appwritePlayerId, player_id, obj);
      alert("Player updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error updating player:", error);
      setError("Failed to update player. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="bg-white h-screen w-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-slate-100 p-10">
      <div className="w-max-full mx-auto my-10 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Player</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

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
              value={player.name || ""}
              onChange={handleChange}
              placeholder="Enter player name"
              className="theme-input"
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
              value={player.email || ""}
              onChange={handleChange}
              placeholder="Enter email address"
              className="theme-input"
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
              value={player.phone || ""}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="theme-input"
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
              value={player.age || ""}
              onChange={handleChange}
              placeholder="Enter player age"
              className="theme-input"
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
              value={player.position || ""}
              onChange={handleChange}
              placeholder="Enter player position"
              className="theme-input"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={player.category || 'Trump'}
              onChange={handleChange}
              placeholder="Enter player category"
              className="theme-input"
              required
            />
          </div>

          {/* Base Price */}
         {/* Base Price */}
<div className="mb-4">
  <label htmlFor="min_price" className="block text-sm font-medium text-gray-700">
    Base Price
  </label>
  <input
    type="number"
    id="min_price"
    name="min_price"
   
    onChange={handleChange}
    placeholder="Enter base price"
    className="theme-input"
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
              value={player.photo_url || ""}
              onChange={handleChange}
              placeholder="Enter photo URL"
              className="theme-input"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit" className="theme-button" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
