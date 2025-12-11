import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import axios from "@/api/axios";

export default function Import() {
  const [data, setData] = useState({ excel_file: null });
  const [excelData, setExcelData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [localError, setLocalError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData({ excel_file: file });
    setLocalError("");

    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

        setExcelData(jsonData);
        setShowData(false);
      };
      reader.readAsBinaryString(file);
    } else {
      setExcelData([]);
    }
  };

  // Upload file to backend
  const saveFile = async (e) => {
    e.preventDefault();

    if (!data.excel_file) {
      setLocalError("Please select an Excel file before saving.");
      return;
    }

    setLocalError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("excel_file", data.excel_file);

      await axios.post("/api/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("File uploaded successfully!");

      // CLEAR EVERYTHING AFTER SAVE
      setData({ excel_file: null });
      setExcelData([]);
      setShowData(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error(error);
      setLocalError("Failed to upload file.");
    } finally {
      setLoading(false);
    }
  };

  // Remove selected file
  const removeFile = () => {
    setData({ excel_file: null });
    setExcelData([]);
    setShowData(false);
    setLocalError("");

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Button style from testing version
  const customButtonStyle = {
    padding: "0.45rem 1.2rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#fff",
    background: "linear-gradient(to bottom, #4a2f26, #2f1c14)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.3s",
    boxShadow: "0 3px 5px rgba(0,0,0,0.25)",
    minWidth: "100px",
  };

  const handleHover = (e) => {
    if (!loading) {
      e.currentTarget.style.background =
        "linear-gradient(to bottom, #3e2b1c, #2e1c0f)";
    }
  };

  const handleLeave = (e) => {
    if (!loading) {
      e.currentTarget.style.background =
        "linear-gradient(to bottom, #4a2f26, #2f1c14)";
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* File input + Save + Preview row */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        {/* File Input + Remove Button */}
        <div className="relative" style={{ minWidth: "200px" }}>
          <input
            ref={fileInputRef}
            type="file"
            name="excel_file"
            accept=".xlsx"
            onChange={handleFileChange}
            style={{ width: "100%", color: "#424242ff" }}
          />

          {data.excel_file && (
            <button
              type="button"
              onClick={removeFile}
              className="absolute right-[-20px] top-1/2 -translate-y-1/2 text-red-600 hover:text-red-800 font-bold"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              X
            </button>
          )}
        </div>

        {/* Save Button */}
        <button
          type="button"
          style={{
            ...customButtonStyle,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
          onClick={saveFile}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>

        {/* Preview Button */}
        {excelData.length > 0 && (
          <button
            type="button"
            style={customButtonStyle}
            onClick={() => setShowData((prev) => !prev)}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            {showData ? "Hide Preview" : "Preview"}
          </button>
        )}
      </div>

      {/* Error Message */}
      {localError && (
        <div
          style={{
            color: "red",
            fontSize: "0.75rem",
            marginTop: "0.25rem",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          {localError}
        </div>
      )}

      {/* Preview Table */}
      {showData && excelData.length > 0 && (
        <div
          style={{
            marginTop: "2rem",
            overflow: "auto",
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "0.5rem",
            maxHeight: "400px",
          }}
        >
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <tbody>
              {excelData.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="border px-3 py-1 text-sm text-gray-700"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
