const conf = {
    appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
    appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appwriteDatabaseId: import.meta.env.VITE_DATABASE_ID,
    appwriteAuctionId: import.meta.env.VITE_AUCTIONS_ID,
    appwriteTestId: import.meta.env.VITE_TEST_ID,
    appwriteTeamId: import.meta.env.VITE_TEAM_ID,
    appwritePlayerId: import.meta.env.VITE_PLAYER_ID,
    appwriteManagerId: import.meta.env.VITE_MANAGER_ID,
    emailJsServiceKey:import.meta.env.VITE_EMAIL_SERVICE_KEY,
    emailJsTemplateKey: import.meta.env.VITE_EMAIL_TEMP_KEY,
    emailJsUserId: import.meta.VITE_USER_ID
    
  };
  
  export default conf;
  