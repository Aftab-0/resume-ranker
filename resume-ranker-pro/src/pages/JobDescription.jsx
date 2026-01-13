import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ScoreContext } from "../ScoreContext";
import jdTemplates from "../data/jdTemplates";


export default function JobDescription() {
  const [jdText, setJdText] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");


  const location = useLocation();
  const navigate = useNavigate();
  const { setScoreData } = useContext(ScoreContext);

  const resume = location.state?.resume || null;

  const handleTemplateSelect = (e) => {
  const role = e.target.value;
  setSelectedRole(role);

  if (role && jdTemplates[role]) {
    setJdText(jdTemplates[role]);   // Auto-fill description
  }
};


  const analyzeResume = async () => {
    if (!resume) {
      alert("Resume is missing! Please upload again.");
      navigate("/upload");
      return;
    }

    if (!jdText.trim()) return alert("Enter job description");
    if (!email.includes("@")) return alert("Enter valid email");

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jdText);
    formData.append("email", email);

    setLoading(true);

    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setScoreData(data);
    navigate("/results");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 px-4 pt-24 flex flex-col items-center">
      <h1 className="text-4xl font-semibold text-gray-800 mb-2">Job Description</h1>

      {/* Template Dropdown */}
<select
  value={selectedRole}
  onChange={handleTemplateSelect}
  className="w-full max-w-2xl p-3 mb-6 border rounded-xl bg-white shadow"
>
  <option value="">Choose a Job Template...</option>

  {Object.keys(jdTemplates).map((role) => (
    <option key={role} value={role}>
      {role}
    </option>
  ))}
</select>



      <textarea
        value={jdText}
        onChange={(e) => setJdText(e.target.value)}
        placeholder="Paste job description here..."
        className="w-full max-w-2xl h-64 p-5 rounded-xl border shadow-md bg-white"
      />

      <div className="w-full max-w-2xl mt-4">
        <label className="block font-semibold mb-2">Your Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-3 border rounded-xl"
        />
      </div>

      <button
        onClick={analyzeResume}
        disabled={loading}
        className="mt-10 px-10 py-3 bg-blue-600 text-white rounded-lg"
      >
        {loading ? "Analyzing..." : "Analyze Resume →"}
      </button>
    </div>
  );
}
