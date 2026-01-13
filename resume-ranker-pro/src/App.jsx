import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Upload from "./pages/Upload.jsx";
import Results from "./pages/Results.jsx";
import JobDescription from "./pages/JobDescription.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME PAGE */}
        <Route path="/" element={<Home />} />

        {/* UPLOAD PAGE */}
        <Route path="/upload" element={<Upload />} />

        {/* RESULTS PAGE */}
        <Route path="/results" element={<Results />} />

        {/* JOB DESCRIPTION PAGE */}
        <Route path="/job-description" element={<JobDescription />} />

      </Routes>
    </BrowserRouter>
  );
}
