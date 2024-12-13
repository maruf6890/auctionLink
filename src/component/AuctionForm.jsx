import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import conf from "../config/conf";
import databaseService from "../Apprwite/database";
import AuthContext from "../Apprwite/AuthProvider";

export default function AuctionForm() {
    const [error, setError] = useState("");
    const { user } = useContext(AuthContext); 
    const navigate = useNavigate();

    if (!user) {
        navigate("/login");
    }

    const [auctionData, setAuctionData] = useState({
        auction_name: "",
        auction_detail: "",
        host_name:"",
        host_id: "",
        host_organization: "",
        player_auction_date: "",
        registation_dedline: "",
        team_auction_date: "",
        appllication_done: false,
        team_bidding_done: false,
        player_bidding_done: false,
        closed: false,
        total_player: 0,
        total_team: 0,  
        cover_url: "",
    });

    React.useEffect(() => {
        if (user && user.name) {
            setAuctionData((prevData) => ({
                ...prevData,
                host_name: user.name, 
            }));
        }
    }, [user]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setAuctionData({
                ...auctionData,
                auction_status: {
                    ...auctionData.auction_status,
                    [name]: checked,
                },
            });
        } else {
            setAuctionData({
                ...auctionData,
                [name]: type === "number" ? Number(value) : value,
            });
        }
    };

  
    const handleSubmit = async (e) => {
        console.log(auctionData);
        e.preventDefault();
        setError("");

        if (!auctionData.auction_name ) {
            setError("Auction name and ID are required!");
            return;
        }

        try {
           
            const createdDoc = await databaseService.createDocument(conf.appwriteAuctionId, auctionData);
            console.log("Auction created:", createdDoc);
            alert("Auction created successfully!");
            navigate("/"); 
        } catch (error) {
            console.error("Error creating auction:", error);
            setError("Failed to create auction. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Auction</h2>
                {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="auction_name">
                            Auction Name
                        </label>
                        <input
                            type="text"
                            id="auction_name"
                            name="auction_name"
                            value={auctionData.auction_name}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Enter auction name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="auction_detail">
                            Auction Details
                        </label>
                        <textarea
                            id="auction_detail"
                            name="auction_detail"
                            value={auctionData.auction_detail}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Enter auction details"
                        />
                    </div>

                   

                  
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="host_name">
                            Host Name
                        </label>
                        <input
                            type="text"
                            id="host_name"
                            name="host_name"
                            value={auctionData.host_name}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Host name"
                            disabled
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="host_organization">
                            Host Organization
                        </label>
                        <input
                            type="text"
                            id="host_organization"
                            name="host_organization"
                            value={auctionData.host_organization}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Host organization"
                        />
                    </div>

                    {/* Auction Dates and Times */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="player_auction_date">
                            Player Auction Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            id="player_auction_date"
                            name="player_auction_date"
                            value={auctionData.player_auction_date}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="registation_dedline">
                            Registration Deadline
                        </label>
                        <input
                            type="date"
                            id="registation_dedline"
                            name="registation_dedline"
                            value={auctionData.registation_dedline}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="team_auction_date">
                            Team Auction Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            id="team_auction_date"
                            name="team_auction_date"
                            value={auctionData.team_auction_date}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Cover URL */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cover_url">
                            Cover URL
                        </label>
                        <input
                            type="url"
                            id="cover_url"
                            name="cover_url"
                            value={auctionData.cover_url}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Enter cover URL"
                        />
                    </div>

                    {/* Total Teams */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="total_team">
                            Total Teams
                        </label>
                        <input
                            type="number"
                            id="total_team"
                            name="total_team"
                            value={auctionData.total_team}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Enter total number of teams"
                            min="1" // Optional: Set a minimum value
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                        Create Auction
                    </button>
                </form>
            </div>
        </div>
    );
}
