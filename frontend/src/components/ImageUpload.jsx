import React, { useState } from "react";
import axios from "axios";

const ImageUpload = ({ onUpload, showToast }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      showToast("error", "Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file); // 👈 key name must match backend

    try {
      const res = await axios.post("https://image-backend-r9o1.onrender.com/api/images/upload", formData);
      showToast("success", res.data.message);
      setFile(null);
      if (onUpload) onUpload();
    } catch (err) {
      showToast("error", "Upload failed! Check backend.");
    }
  };

  return (
    <div className="upload-section">
      <h2>Upload an Image</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUpload;
