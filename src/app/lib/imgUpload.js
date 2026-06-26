export const imageUpload = async(image)=>{

    const formdata = new FormData();
    formdata.append("image",image)
    const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        {
        method:'POST',
        body:formdata
    });
    const data = await res.json();
    console.log(data)
    return data.data;
}