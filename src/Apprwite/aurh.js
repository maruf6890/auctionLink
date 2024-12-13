import conf from "../config/conf";
import { Client, Account, ID } from "appwrite";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Appwrite URL
            .setProject(conf.appwriteProjectId); // Appwrite project ID

        this.account = new Account(this.client); // Initialize Account instance
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password);
            if (name) {
                await this.account.updatePrefs({ name });
            }
            console.log("Account created:", userAccount);
            return userAccount;
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }

    async login(email, password) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("Login successful:", session);
            return session;
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log("Current user:", user);
            return user;
        } catch (error) {
            console.warn("No user logged in:", error);
            return null;
        }
       
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            console.log("Logout successful");
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }
}

// Export the instance of AuthService
const authService = new AuthService();
export default authService;
