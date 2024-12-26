export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_UpLoad_preset as string
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_Cloud_Name}/image/upload`,
    { method: "POST", body: formData }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "Image upload failed");
  return data?.url;
};
