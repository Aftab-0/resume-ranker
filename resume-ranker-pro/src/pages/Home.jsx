export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 text-gray-900">
      <nav className="flex justify-between items-center px-12 py-5 bg-white/70 backdrop-blur-md shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">ResumeRanker</h1>

        <div className="flex gap-10 text-sm font-medium">
          <a className="hover:text-blue-600" href="/">Home</a>
          <a className="hover:text-blue-600" href="/upload">Upload Resume</a>
          <a className="hover:text-blue-600" href="#">About</a>
          <a className="hover:text-blue-600" href="#">Contact</a>
        </div>
      </nav>

      <section className="flex flex-col items-center text-center mt-20 px-6">

        <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
          ResumeRanker
        </h2>

        <p className="text-lg text-gray-600">
          A smart resume analysis tool
        </p>

        <p className="text-gray-500 mt-1 text-sm">
          Get the best match for your job description in seconds
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">
          <div className="w-64 h-40 rounded-xl bg-white shadow-md" />
          <div className="w-64 h-40 rounded-xl bg-white shadow-md" />
          <div class="w-64 h-40 rounded-xl bg-white shadow-md" />
        </div>
      </section>
    </div>
  );
}
