import React, { useEffect, useState } from 'react';
import SectionTitle from './SectionTitle';
import AuctionCard from './AuctionCard';
import databaseService from '../Apprwite/database';
import conf from '../config/conf';
import { Query } from 'appwrite';
import { useParams } from 'react-router';


export default function AuctionsCategory() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const {category_key}= useParams();

  useEffect(() => {
    async function fetchAuctions() {
      try {
       
        const data = await databaseService.getDocuments(conf.appwriteAuctionId,[Query.equal('category',category_key)]);
        setAuctions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching auction data:", error);
        setLoading(false);
      }
    }

    fetchAuctions();
  }, [conf.appwriteAuctionId]);

  return (
    <div>
     
      <div className="auction-container p-10 pr-30">
        {loading ? (
          <p>Loading auctions...</p>
        ) : auctions.length > 0 ? (
          auctions.map((auction) => (
            <AuctionCard auction={auction} key={auction.$id} />
          ))
        ) : (
          <p>No auctions available.</p>
        )}
      </div>
    </div>
  );
}
