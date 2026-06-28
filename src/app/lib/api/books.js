import { getTokenServer } from "../getTokenServer";

const baseURI=process.env.NEXT_PUBLIC_SERVER_URL;

export const getLibrarianBooks = async (page) =>{
    if(!page){
        page=1;
    }
    const token = await getTokenServer()
    const res = await fetch(`${baseURI}/librarian/books?page=${page}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            authorization:`Bearer ${token}`,

        }
    })
    const data = await res.json()
    return data;
};

export const getAllBooks = async(search)=>{
    const res = await fetch(`${baseURI}/books?search=${search}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify()
    })
    const data = res.json()
    return data;
}