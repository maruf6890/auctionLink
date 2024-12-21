import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import conf from "../config/conf";
import databaseService from "../Apprwite/database";
import AuthContext from "../Apprwite/AuthProvider";

export default function TeamAddForm() {
    const [error, setError] = useState("");
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const params = useParams();

    if (!user) {
        navigate("/login");
    }

    const [teamData, setTeamData] = useState({
        auction_id: params.auction_id,
        team_name: "",
        min_price: 0,
        logo_image: "",
        total_player: 0,
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setTeamData({
            ...teamData,
            [name]: type === "number" ? Number(value) : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!teamData.team_name || !teamData.min_price || teamData.total_player <= 0) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            // Create a new team document in the database
            const createdDoc = await databaseService.createDocument(conf.appwriteTeamId, teamData);
            console.log("Team created:", createdDoc);
            alert("Team created successfully!");navigate(`/auction/${params.auction_id}`); // Redirect to the auction page
        } catch (error) {
            console.error("Error creating team:", error);
            setError("Failed to create team. Please try again.");
        }
    };

    return (
        <div className="flex justify-center  px-20 bg-slate-100 items-center min-h-screen ">
            <div className="w-full  p-8 bg-white shadow-md rounded-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Team</h2>
                {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
                <form onSubmit={handleSubmit}>
                    {/* Team Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="team_name">
                            Team Name
                        </label>
                        <input
                            type="text"
                            id="team_name"
                            name="team_name"
                            value={teamData.team_name}
                            onChange={handleChange}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#141B41]"
                            placeholder="Enter team name"
                            required
                        />
                    </div>

                    {/* Minimum Price */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="min_price">
                            Minimum Price
                        </label>
                        <input
                            type="number"
                            id="min_price"
                            name="min_price"
                            value={teamData.min_price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#141B41]"
                            placeholder="Enter minimum price"
                            min="0"
                            required
                        />
                    </div>

                    {/* Logo Image URL */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="logo_image">
                            Team Logo Image URL
                        </label>
                        <input
                            type="url"
                            id="logo_image"
                            name="logo_image"
                            value={teamData.logo_image}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#141B41]"
                            placeholder="Enter logo image URL"
                        />
                    </div>

                    {/* Total Players */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="total_player">
                            Total Players
                        </label>
                        <input
                            type="number"
                            id="total_player"
                            name="total_player"
                            value={teamData.total_player}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#141B41]"
                            placeholder="Enter total number of players"
                            min="1"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="bg-[#141B41] text-white font-medium py-2 px-6 rounded-lg hover:bg-[#0f1736] transition duration-200">
                        Add Team
                    </button>
                </form>
            </div>
        </div>
    );
}



