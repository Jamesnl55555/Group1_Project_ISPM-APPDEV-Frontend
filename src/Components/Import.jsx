import * as XLSX from "xlsx";
import { useState, useRef } from "react";
import axios from "@/api/axios"; 

export default function Import() {
    const [data, setData] = useState({ excel_file: null });
    const [excelData, setExcelData] = useState([]);
    const [showData, setShowData] = useState(false);
    const [localError, setLocalError] = useState("");
    const fileInputRef = useRef(null);

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

    // Save file (upload to backend)
    const saveFile = async (e) => {
        e.preventDefault();

        if (!data.excel_file) {
            setLocalError("Please select an Excel file before saving.");
            return;
        }

        setLocalError("");
        try {
            const formData = new FormData();
            formData.append("excel_file", data.excel_file);

            await axios.post("/api/import", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("File uploaded successfully!");
        } catch (error) {
            console.error(error);
            setLocalError("Failed to upload file.");
        }
    };

    // Remove file and reset input completely
    const removeFile = () => {
        setData({ excel_file: null });
        setExcelData([]);
        setShowData(false);
        setLocalError("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const brownButton =
        "bg-[#4b2e17] text-white font-semibold px-6 py-2 rounded-xl hover:bg-[#3a2312] transition-colors";

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex items-center space-x-3">
                    <div className="relative flex-1">
                        <input
                            ref={fileInputRef} 
                            type="file"
                            name="excel_file"
                            accept=".xlsx, .xls, .csv"
                            onChange={handleFileChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                        />

                        {/* Delete Icon */}
                        {data.excel_file && (
                            <button
                                type="button"
                                onClick={removeFile}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-red-600 hover:text-red-800 font-bold text-lg"
                                title="Remove file"
                            >
                                X
                            </button>
                        )}
                    </div>

                    {/* Save Button */}
                    <button type="button" className={brownButton} onClick={saveFile}>
                        Save
                    </button>

                    {/* Preview Toggle */}
                    {excelData.length > 0 && (
                        <button
                            type="button"
                            className={`${brownButton} bg-gray-700 hover:bg-gray-800`}
                            onClick={() => setShowData((prev) => !prev)}
                        >
                            {showData ? "Hide Preview" : "Preview"}
                        </button>
                    )}
                </div>

                {/* Error Messages */}
                {localError && (
                    <div className="text-red-500 text-sm mt-1">
                        {localError}
                    </div>
                )}
            </div>

            {/* Excel Preview */}
            {showData && excelData.length > 0 && (
                <div className="mt-4 overflow-auto border p-4 rounded-lg shadow-sm max-h-96">
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
