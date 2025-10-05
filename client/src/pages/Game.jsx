import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Game = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialPlayers = location.state?.players || [];

  // Add a score field to each player
  const [players, setPlayers] = useState(
    initialPlayers.map((p) => ({ ...p, score: 0 }))
  );

  const changeScore = (index, delta) => {
    const updated = [...players];
    updated[index].score += delta;
    setPlayers(updated);
  };

  const finishGame = () => {
    // Sort players by score descending
    const sorted = [...players].sort((a, b) => b.score - a.score);
    navigate("/results", { state: { players: sorted } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-3xl font-bold mb-6">Game On 🎱</h2>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {players.map((player, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-800 px-4 py-2 rounded-xl"
          >
            <span className="text-lg font-semibold">{player.name}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => changeScore(index, -1)}
                className="bg-red-500 px-3 py-1 rounded"
              >
                -1
              </button>
              <span className="text-lg">{player.score}</span>
              <button
                onClick={() => changeScore(index, 1)}
                className="bg-green-500 px-3 py-1 rounded"
              >
                +1
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={finishGame}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl font-semibold mt-4"
        >
          Finish Game
        </button>
      </div>
    </div>
  );
};

export default Game;
