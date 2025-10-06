
////////////////////////////
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Game = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialPlayers = location.state?.players || [];

  const [players, setPlayers] = useState(
    initialPlayers.map((p) => ({
      ...p,
      scores: [],
      currentScore: "",
      animate: false, // controls total pulse
    }))
  );

  const handleChange = (index, value) => {
    const updated = [...players];
    updated[index].currentScore = value;
    setPlayers(updated);
  };

  const addScore = (index) => {
    const updated = [...players];
    const val = Number(updated[index].currentScore);
    if (!isNaN(val) && val !== 0) {
      updated[index].scores.push(val);
      updated[index].currentScore = "";
      updated[index].animate = true; // trigger animation
      setPlayers(updated);

      // reset animation flag after short delay
      setTimeout(() => {
        const reset = [...updated];
        reset[index].animate = false;
        setPlayers(reset);
      }, 500);
    }
  };

  const totalScore = (scores, current) => {
    const sum = scores.reduce((a, b) => a + b, 0);
    const currentVal = Number(current);
    return !isNaN(currentVal) ? sum + currentVal : sum;
  };

  const finishGame = () => {
    const sorted = [...players].sort(
      (a, b) =>
        totalScore(b.scores, b.currentScore) -
        totalScore(a.scores, a.currentScore)
    );
    navigate("/results", { state: { players: sorted } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-3xl font-bold mb-6">Game On 🎱</h2>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {players.map((player, index) => {
          const total = totalScore(player.scores, player.currentScore);
          return (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-xl w-full shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-2">{player.name}</h3>

              {/* Input + Add button */}
              <div className="flex gap-2 mb-3">
                <input
                  type="number"
                  value={player.currentScore}
                  onKeyDown={(e) => e.key === "Enter" && addScore(index)}
                  onChange={(e) => handleChange(index, e.target.value)}
                  placeholder="Enter points"
                  className="w-full px-3 py-2 rounded-lg text-black text-center bg-yellow-400 focus:ring-2 focus:ring-yellow-500 outline-none"
                />
                <button
                  onClick={() => addScore(index)}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold text-white"
                >
                  ➕
                </button>
              </div>

              {/* Display list of scores */}
              <div className="bg-gray-700 rounded-lg p-2 mb-2">
                <h4 className="font-semibold mb-1">Scores:</h4>
                {player.scores.length > 0 ? (
                  <ul className="flex flex-wrap gap-2">
                    {player.scores.map((s, i) => (
                      <li
                        key={i}
                        className="bg-yellow-500 text-black px-3 py-1 rounded-lg"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm">No scores yet</p>
                )}
              </div>

              {/* Total (with animation) */}
              <div
                className={`text-right font-bold text-2xl ${
                  player.animate
                    ? "text-green-400 scale-110 transition-transform duration-200"
                    : "text-green-400 transition-transform duration-200"
                }`}
              >
                Total: {total}
              </div>
            </div>
          );
        })}

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
