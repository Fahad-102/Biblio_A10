import { headers } from "next/headers"
import { auth } from "./auth"

export const getTokenServer = async ()=>{
    const {token} = await auth.api.getToken({
        headers: await headers()
    })
    return token || null;
}

// import { getTokenServer } from "@/lib/auth-client"; 

// const token = await getTokenServer(); 

// fetch(`${base}/api/dashboard-stats`, {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${token}` 
//   },
// });