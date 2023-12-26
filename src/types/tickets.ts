import { Models } from "appwrite";

export interface TicketInterface extends Models.Document {
    artist:        string;
    venue:         string;
    location:      string;
    date:          string;
    userId:        string;
    image:         string;
}