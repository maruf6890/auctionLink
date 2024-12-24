import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import TeamForm from './component/TeamForm';
import PlayerForm from './component/PlayerForm';
import Home from './component/Home';
import Registration from './Aurh/Registration';
import LoginPage from './Aurh/Login';
import { useState } from 'react';
import { AuthProvider } from './Apprwite/AuthProvider';
import AuctionForm from './component/AuctionForm';
import TeamAddForm from './component/TeamAddForm';

import PlayerAuctionScreen from './PlayerAuctionScreen';
import AboutUs from './component/AboutUs';
import Services from './component/Services';
import Contact from './component/Contact';
import AuctionFormUpdate from './component/AuctionFormUpdate';
import FrontPage from './FrontPage';
import Auction from './Auction';
import AuctionDetails from './AuctionDetails';
import Community from './component/Community';
import Auctions from './component/Auctions';
import SearchAuctions from './component/AuctionsSearch';
import AuctionsCategory from './component/AuctionsCategory';
import PlayerList from './PlayerList';
import PlayerFormUpdate from './component/PlayerFormUpdate';
import ManagerList from './ManagerList';



const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<FrontPage></FrontPage>}>
      </Route>
      <Route path="/community" element={<Community></Community>}>
         <Route index element={<Auctions></Auctions>} />
         <Route path="/community/search/:q" element={<SearchAuctions></SearchAuctions>} />
         <Route path="/community/category/:category_key" element={<AuctionsCategory></AuctionsCategory>} />
      </Route>
       
    
        <Route path="/login" element={<LoginPage></LoginPage>} />
        <Route path="/create_auction" element={<AuctionForm></AuctionForm>} />
        <Route path="/registration" element={<Registration></Registration>} />
        
        
        <Route path="/auction/:auction_id" element={<Auction></Auction>} >
        <Route index element={<AuctionDetails></AuctionDetails>} />
        <Route path="/auction/:auction_id/create_team" element={<TeamAddForm></TeamAddForm>} />
        <Route path="/auction/:auction_id/update_auction" element={<AuctionFormUpdate></AuctionFormUpdate>} />
        <Route path="/auction/:auction_id/player_registration" element={<PlayerForm></PlayerForm>} /> 
        <Route path="/auction/:auction_id/player_list" element={<PlayerList></PlayerList>} />
        <Route path="/auction/:auction_id/manager_list" element={<ManagerList></ManagerList>} />
        <Route path="/auction/:auction_id/player_edit/:player_id" element={<PlayerFormUpdate></PlayerFormUpdate>} /> 
        <Route path="/auction/:auction_id/player_auction_screen/:player_id/:index" element={<PlayerAuctionScreen></PlayerAuctionScreen>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

