import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const players = location.state?.players || [];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-3xl font-bold mb-6">🏆 Match Results</h2>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {players.map((player, index) => (
          <div
            key={index}
            className={`flex justify-between items-center px-4 py-2 rounded-xl ${
              index === 0 ? "bg-yellow-500 text-black font-bold" : "bg-gray-800"
            }`}
          >
            <span>
              {index + 1}. {player.name}
            </span>
            <span>Score: {player.score}</span>
          </div>
        ))}

        <button
          onClick={() => navigate("/")}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl font-semibold mt-6"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Results;
