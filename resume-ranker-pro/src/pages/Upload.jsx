import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadPage() {
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const goToJobDescription = () => {
    if (!resume) {
      alert("Please upload your resume first!");
      return;
    }

    // send resume file to next page
    navigate("/job-description", { state: { resume } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Upload Your Resume
      </h1>

      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md">

        {/* Upload Resume */}
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="w-full p-3 border rounded-lg mb-6"
        />

        <button
          onClick={goToJobDescription}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default UploadPage;
