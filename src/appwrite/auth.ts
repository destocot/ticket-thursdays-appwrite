import { ID } from "appwrite";
import { account, teams } from "./config";

export class AuthService {
    async getAccount() {
        return account.get()
        .then((data) => {
            return data
        })
        .catch(() => {
            return null;
        })
    };

    async getSession(sessionId?: string) {
        sessionId ??= "current"
    
        return account.getSession(sessionId)
        .then((data) => {
            return data
        })
        .catch((e) => {
            console.log(e.message)
        })
    }

    async createAccount (email: string, password: string) {
        return account.create(ID.unique(), email, password)
        .then((data) => {
            return { data, error: null};
        })
        .catch((e) => {
            return { data: null, error: e.message}
        })
    }

    async createEmailSession (email: string, password: string) {
        return account.createEmailSession(email, password)
        .then(async (data) => {
            return { data, error: null };
        })
        .catch((e) => {
            return { data: null, error: e.message }
        })
    }

    async deleteSession (sessionId: string) {
        return account.deleteSession(sessionId)
        .then((data) => {
            return data
        })
        .catch((e) => {
            console.log(e);
        })
    }

    async listTeams() {
        return teams.list()
        .then((data) => {
            return { data, error: null}
        })
        .catch((e) => {
            return { data: null, error: e.message }
        })
    }
}

const authService = new AuthService();
export default authService;






