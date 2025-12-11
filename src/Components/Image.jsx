import React, { useState } from "react";

const Image = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file first!");
    setLoading(true);

    try {
      // Step 1: Get signed parameters from Laravel backend
      const res = await fetch("/api/sign-upload");
      const { signature, timestamp, api_key, cloud_name } = await res.json();

      // Step 2: Prepare FormData
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("api_key", api_key);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);

      // Step 3: Upload to Cloudinary
      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
        { method: "POST", body: formData }
      );
      const data = await uploadRes.json();

      setUploadedUrl(data.secure_url);
      setSelectedFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Image</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {uploadedUrl && (
        <div className="mt-4">
          <h3 className="font-semibold">Uploaded Image:</h3>
          <img
            src={uploadedUrl}
            alt="Uploaded"
            className="mt-2 border rounded max-w-full"
          />
        </div>
      )}
    </div>
  );
};

export default Image;
