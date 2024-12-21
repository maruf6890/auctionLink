import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import conf from "../config/conf";
import databaseService from "../Apprwite/database";
import AuthContext from "../Apprwite/AuthProvider";

export default function AuctionFormUpdate() {
    const [auctionData, setAuctionData] = useState(null); // Holds the fetched auction data
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true); // Loading state
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { auction_id } = useParams();

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    // Fetch auction data
    useEffect(() => {
        const fetchAuction = async () => {
            try {
                setLoading(true);
                const data = await databaseService.getDocument(conf.appwriteAuctionId, auction_id);
                setAuctionData(data);
            } catch (err) {
                console.error("Failed to fetch auction:", err);
                setError("Failed to fetch auction data. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchAuction();
    }, [auction_id]);


    //get all category
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/sports-category.json')
            .then((res) => res.json())
            .then((data) => setCategories(data))

    }, []);
    console.log(categories);
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuctionData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!auctionData.auction_name) {
            setError("Auction name is required!");
            return;
        }

        const obj = {
            auction_name: e.target.auction_name.value,
            auction_detail: e.target.auction_detail.value,
            host_organization: e.target.host_organization.value,
            category:e.target.category.value,
            player_auction_date: e.target.player_auction_date.value,
            team_auction_date: e.target.team_auction_date.value,
            registation_dedline: e.target.registation_dedline.value,
            cover_url: e.target.cover_url.value,
        };

        try {
            await databaseService.updateDocument(conf.appwriteAuctionId, auction_id, obj);
            alert("Auction updated successfully!");
        } catch (err) {
            console.error("Error updating auction:", err);
            setError("Failed to update auction. Please try again.");
        }
    };

    // Show loading spinner or message
    if (loading) {
        return <div className="text-center text-gray-700">Loading auction data...</div>;
    }

    return (
        <div className="flex justify-center p-10   items-center min-h-screen ">
            <div className="w-full  p-8  shadow-md rounded-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Update Auction</h2>
                {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="auction_name" className="block text-sm font-medium text-gray-700 mb-2">
                            Auction Name
                        </label>
                        <input
                            type="text"
                            id="auction_name"
                            name="auction_name"
                            value={auctionData.auction_name || ""}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#141B41] focus:outline-none"
                            placeholder="Enter auction name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="auction_detail" className="block text-sm font-medium text-gray-700 mb-2">
                            Auction Details
                        </label>
                        <textarea
                            id="auction_detail"
                            name="auction_detail"
                            value={auctionData.auction_detail || ""}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#141B41] focus:outline-none"
                            placeholder="Enter auction details"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="host_organization" className="block text-sm font-medium text-gray-700 mb-2">
                            Host Organization
                        </label>
                        <input
                            type="text"
                            id="host_organization"
                            name="host_organization"
                            value={auctionData.host_organization || ""}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#141B41] focus:outline-none"
                            placeholder="Enter host organization"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                            Sports Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={auctionData.category || ""}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#141B41] focus:outline-none"
                        >
                            <option value="" disabled>
                                Select a sports category
                            </option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.key}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className="mb-4">
                        <label htmlFor="player_auction_date" className="block text-sm font-medium text-gray-700 mb-2">
                            Player Auction Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            id="player_auction_date"
                            name="player_auction_date"
                            value={auctionData.player_auction_date || ""}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#141B41] focus:outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="team_auction_date" className="block text-sm font-medium text-gray-700 mb-2">
                            Team Auction Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            id="team_auction_date"
                            name="team_auction_date"
                            value={auctionData.team_auction_date || ""}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#141B41] focus:outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="registation_dedline" className="block text-sm font-medium text-gray-700 mb-2">
                            Registration Deadline
                        </label>
                        <input
                            type="date"
                            id="registation_dedline"
                            name="registation_dedline"
                            value={auctionData.registation_dedline || ""}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#141B41] focus:outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="cover_url" className="block text-sm font-medium text-gray-700 mb-2">
                            Cover URL
                        </label>
                        <input
                            type="url"
                            id="cover_url"
                            name="cover_url"
                            value={auctionData.cover_url || ""}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#141B41] focus:outline-none"
                            placeholder="Enter cover URL"
                        />
                    </div>

                    <button
                        type="submit"
                        className=" bg-[#141B41] text-white font-medium py-2 px-6 rounded-lg hover:bg-[#0f1736] transition duration-200"
                    >
                        Update Auction
                    </button>
                </form>
            </div>
        </div>
    );
}
