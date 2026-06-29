"use server"

import { getTokenServer } from "../getTokenServer";

const getBaseURI = () => process.env.NEXT_PUBLIC_SERVER_URL || "https://biblio-server-a10.vercel.app";

export const getLibrarianBooks = async (page = 1) => {
    const baseURI = getBaseURI();
    const token = await getTokenServer();
    const res = await fetch(`${baseURI}/librarian/books?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        }
    });
    const data = await res.json();
    return data;
};

export const getAllBooks = async (search = "", page = 1) => {
    const baseURI = getBaseURI();
    
    const cleanSearch = search && search !== "undefined" ? search.toString().trim() : "";

    const res = await fetch(`${baseURI}/books?search=${cleanSearch}&page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store" /
    });
    const data = await res.json();
    return data;
};

export const getBooksById = async (id) => {
    const baseURI = getBaseURI();
    const res = await fetch(`${baseURI}/books/${id}`);
    const data = await res.json();
    return data;
};

export const editBooksId = async (id, updatedData) => {
    const baseURI = getBaseURI();
    try {
        const token = await getTokenServer(); 
        
        const res = await fetch(`${baseURI}/books/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(updatedData) 
        });
        
        if (!res.ok) {
            throw new Error(`Failed to update book. Status: ${res.status}`);
        }
        
        const data = await res.json(); 
        return data;
    } catch (error) {
        console.error("API Error in editBooksId:", error);
        throw error;
    }
};

export const deleteBook = async (id) => {
    const baseURI = getBaseURI();
    try {
        const token = await getTokenServer(); 
        
        const res = await fetch(`${baseURI}/books/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}` 
            }
        });

        if (!res.ok) {
            throw new Error(`Failed to delete book. Status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("API Error in deleteBook:", error);
        throw error;
    }
};