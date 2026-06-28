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

export const getAllBooks = async(search ,page = 1)=>{
    const res = await fetch(`${baseURI}/books?search=${search}&page=${page}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
        },
       cache: "no-store"
    })
    const data = await res.json()
    return data;
}

export const getBooksById = async (id) =>{
    const res = await fetch(`${baseURI}/books/${id}`)
    const data = await res.json()
    return data;
};