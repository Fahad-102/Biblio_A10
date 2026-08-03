export const imageUpload = async (image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_KEY;
    if (!apiKey) {
      throw new Error("ImgBB API key is missing");
    }

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error?.message || "Failed to upload image to ImgBB");
    }

    return data.data; // সফল হলে ইমেজ ডিটেইলস রিটার্ন করবে (যেমন: url, display_url ইত্যাদি)
  } catch (error) {
    console.error("Image upload error:", error);
    return null;
  }
};