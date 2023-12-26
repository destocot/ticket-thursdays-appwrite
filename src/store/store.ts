import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import ticketService from "../appwrite/databases";
import { Models } from "appwrite";
import { TicketInterface } from "../types/tickets";

export const api = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Tickets"],
    endpoints: (build) => ({
        listDocuments: build.query<Models.DocumentList<TicketInterface>, { limit?: number}>({
            queryFn: async ({ limit }) => {
                const tickets = await ticketService.listDocuments(limit);
                return {data: tickets};
            },
            providesTags: [ "Tickets" ]
        }),
        listDocumentsByUserId: build.query<Models.DocumentList<TicketInterface>, { userId: string }>({
            queryFn: async ({ userId }) => {
                const tickets = await ticketService.listDocumentsByUserId(userId);
                return { data: tickets};
            },
            providesTags: [ "Tickets" ]
        }),
        getDocument: build.query<TicketInterface, { documentId: string}>({
            queryFn: async ({ documentId }) => {
                const { data, error } = await ticketService.getDocument(documentId);
                if (error) return { error }
                return { data: data as TicketInterface }
            }
        })
    })
})

export const { useListDocumentsQuery, useListDocumentsByUserIdQuery, useGetDocumentQuery } = api;

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;