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
import SidebarLess from './SidebarLess';
import PlayerAuctionScreen from './PlayerAuctionScreen';
import AboutUs from './component/AboutUs';
import Services from './component/Services';
import Contact from './component/Contact';
import AuctionFormUpdate from './component/AuctionFormUpdate';



const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/auction/:auction_id/team_auction_screen/:team_id/:index" element={<SidebarLess></SidebarLess>}>
        </Route>
        <Route path="/auction/:auction_id/player_auction_screen/:player_id/:index" element={<PlayerAuctionScreen></PlayerAuctionScreen>}>
        </Route>
        <Route path="/" element={<App></App>}>
          <Route index element={<Home />} />
          <Route path="/create_auction" element={<AuctionForm></AuctionForm>} />
          <Route path="/auction/:auction_id/update_auction" element={<AuctionFormUpdate></AuctionFormUpdate>} />
          <Route path="/auction/:auction_id/team_application" element={<TeamForm></TeamForm>} />
          <Route path="/auction/:auction_id/create_team" element={<TeamAddForm></TeamAddForm>} />
          <Route path="/auction/:auction_id/player_application" element={<PlayerForm></PlayerForm>} />
          <Route path="/registration" element={<Registration></Registration>} />
          <Route path="/about_us" element={<AboutUs></AboutUs>} />
          <Route path="/services" element={<Services></Services>} />
          <Route path="/contact" element={<Contact></Contact>} />
          <Route path="/login" element={<LoginPage></LoginPage>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

