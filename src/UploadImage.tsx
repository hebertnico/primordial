import { useState } from "react";

function UploadImage() {
  const [file, setFile] = useState<File | null>(null);

  async function uploadImage() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dxpili9cr/image/upload",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();
    console.log(data.secure_url);
  }

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
}

export default UploadImage;
