import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">🎱 Pool Match Tracker</h1>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate("/setup")}
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl text-lg font-semibold "
        >
          Start New Match
        </button>

        <button
          onClick={() => navigate("/history")}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl text-lg font-semibold"
        >
          View History
        </button>
      </div>
    </div>
  );
};

export default Home;
