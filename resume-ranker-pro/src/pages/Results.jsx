import React, { useContext } from "react";
import { ScoreContext } from "../ScoreContext";
import { Link } from "react-router-dom";

export default function ResultsPage() {
  const { scoreData } = useContext(ScoreContext);

  if (!scoreData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold mb-4">No results available.</h2>
        <Link
          to="/upload"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Go Upload Resume →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col items-center pt-24 px-4">
      
      {/* Title */}
      <h1 className="text-4xl font-semibold text-gray-800 mb-6">Your Match Score</h1>

      {/* Score Circle */}
      <div className="w-48 h-48 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-blue-600 mb-8 animate-[pulse_2s_ease-in-out_infinite]">
        <p className="text-5xl font-bold text-blue-700">
          {scoreData.match_score}%
        </p>
      </div>

      {/* Message Box */}
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">AI Analysis</h2>

        <p className="text-gray-600 leading-relaxed">
          {scoreData.message}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-10">
        <Link
          to="/upload"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Upload Another Resume
        </Link>

        <Link
          to="/"
          className="px-6 py-3 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
