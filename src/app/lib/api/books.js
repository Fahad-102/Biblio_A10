import { authClient } from "../auth-client";

const baseURI=process.env.NEXT_PUBLIC_SERVER_URL;

export  const addBooks = async (books) =>{
    const {data:token}= await authClient.token()
    console.log(token.token)
    
    const res = await fetch(`${baseURI}/librarian/books`,{
        method : "POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token?.token}`
        },
            body:JSON.stringify(books)
        });
        const data = await res.json()
        return data;
    };