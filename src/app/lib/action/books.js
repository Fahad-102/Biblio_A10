"use server"


import { getTokenServer } from "../getTokenServer";

const baseURI=process.env.NEXT_PUBLIC_SERVER_URL;

export  const addBooks = async (books) =>{
    const token = await getTokenServer()
    
    const res = await fetch(`${baseURI}/librarian/books`,{
        method : "POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
            body:JSON.stringify(books)
        });
        const data = await res.json()
        return data;
    };