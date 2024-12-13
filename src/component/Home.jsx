import React, { useEffect } from 'react';
import Auctions from './Auctions';
import conf from '../config/conf';
import databaseService from '../Apprwite/database';



export default function Home() {
 

  return (
    <div>
        <Auctions />
    </div>
  );
}

