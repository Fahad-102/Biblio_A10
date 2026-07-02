"use server";
import { revalidatePath } from "next/cache"; 
import { getTokenServer } from "../getTokenServer";

const baseURI = process.env.NEXT_PUBLIC_SERVER_URL;

export const addBooks = async (books) => {
    const token = await getTokenServer();
    
    const res = await fetch(`${baseURI}/api/books`, { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(books)
    });

    const data = await res.json();
    
    revalidatePath("/librarian/books"); 
    
    return data;
};