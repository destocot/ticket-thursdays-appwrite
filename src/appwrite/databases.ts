import { ID, Query } from "appwrite";
import { databases, storage } from "./config";

export class TicketService {
    #databaseId;
    #collctionId;
    #bucketId;

    constructor() {
        this.#databaseId = import.meta.env.VITE_APPWRITE_TICKETS_DATABASE_ID
        this.#collctionId = import.meta.env.VITE_APPWRITE_TICKETS_COLLECTION_ID
        this.#bucketId = import.meta.env.VITE_APPWRITE_TICKETS_BUCKET_IMAGES_ID
    }

    async listDocuments(limit?: number) {
        const queries = [ Query.orderDesc("$updatedAt")];
        if (limit) queries.push(Query.limit(limit))

        return databases.listDocuments(this.#databaseId, this.#collctionId, queries)
        .then((data) => {
            return data
        })
        .catch(e => {
            console.log("APPWRITE :: databases :: listDocuments :: error")
            return e.message
        })
    }

    async listDocumentsByUserId(userId: string) {
        return databases.listDocuments(this.#databaseId, this.#collctionId, [
            Query.equal("userId", [userId])
        ])
        .then((data) => {
            return data;
        })
        .catch(e => {
            console.log("APPWRITE :: databases :: listDocumentsByUserId :: error")
            return e.message
        })
    }

    async createDocument({ artist, venue, location, date, image, userId}: {artist: string, venue: string, location: string, date: string, image?: string, userId: string}) {
        return databases.createDocument(this.#databaseId, this.#collctionId, ID.unique(), {
            artist,
            venue,
            location,
            date,
            image,
            userId
        })
        .then((data) => {
            return { data, error: null };
        })
        .catch(e => {
            return { data: null, error: e.message }
        })
    }

    async getDocument(documentId: string) {
        return databases.getDocument(this.#databaseId, this.#collctionId, documentId)
        .then((data) => {
            return { data, error: null}
        })
        .catch(e => {
            return { data: null, error: e.message }
        })
    }

    async updateDocument(documentId: string, { artist, venue, location, date, image}: {artist: string, venue: string, location: string, image?: string, date: string}) {
        return databases.updateDocument(this.#databaseId, this.#collctionId, documentId, {artist, venue, location, image, date})
        .then((data) => {
            return { data, error: null}
        })
        .catch(e => {
            return { data: null, error: e.message }
        })
    }

    async deleteDocument(documentId: string, hasDeletePermission: boolean) {
        if (!hasDeletePermission) return { data: null, error: "Unauthorized"}

        return databases.deleteDocument(this.#databaseId, this.#collctionId, documentId)
        .then((data) => {
            return { data, error: null}
        })
        .catch(e => {
            return { data: null, error: e.message }
        })
    }

    async createFile(file: File) {
        return storage.createFile(this.#bucketId, ID.unique(), file)
        .then((data) => {
            return { data, error: null}
        })
        .catch(e => {
            return { data: null, error: e.message }
        })
    }

    getFilePreview(fileId: string) {
        return storage.getFilePreview(this.#bucketId, fileId).toString()
    }

    async deleteFile(fileId: string) {
        return storage.deleteFile(this.#bucketId, fileId)
        .catch(() => {
            console.log("APPWRITE :: storage :: deleteFile :: error")
        })
    }

}

const ticketService = new TicketService();
export default ticketService;