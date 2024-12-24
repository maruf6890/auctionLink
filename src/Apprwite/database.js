import conf from "../config/conf";
import { Client, Databases, ID } from "appwrite";

class DatabaseService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.databaseId = conf.appwriteDatabaseId;
    }

    // Create a document
    async createDocument(collectionId, data) {
        try {
            const document = await this.databases.createDocument(
                this.databaseId,
                collectionId,
                ID.unique(),
                data
            );
            console.log("Document created:", document);
            return document;
        } catch (error) {
            console.error("Error creating document:", error.message);
            throw error;
        }
    }

    // Get a single document
    async getDocument(collectionId, documentId) {
        try {
            const document = await this.databases.getDocument(
                this.databaseId,
                collectionId,
                documentId
            );
            console.log("Document retrieved:", document);
            return document;
        } catch (error) {
            console.error("Error retrieving document:", error.message);
            throw error;
        }
    }

    // List documents with optional queries
    async getDocuments(collectionId, query = []) {
        try {
            const documents = await this.databases.listDocuments(
                this.databaseId,
                collectionId,
                query
            );
            console.log("Documents retrieved:", documents.documents);
            return documents.documents;
        } catch (error) {
            console.error("Error listing documents:", error.message);
            throw error;
        }
    }

    // Update a document
    async updateDocument(collectionId, documentId, updatedData) {
        try {
            const document = await this.databases.updateDocument(
                this.databaseId,
                collectionId,
                documentId,
                updatedData
            );
            console.log("Document updated:", document);
            return document;
        } catch (error) {
            console.error("Error updating document:", error.message);
            throw error;
        }
    }

    // Delete a document
    async deleteDocument(collectionId, documentId) {
        try {
            await this.databases.deleteDocument(
                this.databaseId,
                collectionId,
                documentId
            );
            console.log("Document deleted successfully");
            console.log("Document deleted successfully");
            return { success: true, message: "Document deleted successfully" };
        } catch (error) {
            console.error("Error deleting document:", error.message);
            throw error;
        }
    }
}

// Export the instance of DatabaseService
const databaseService = new DatabaseService();
export default databaseService;
