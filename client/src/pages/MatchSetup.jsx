

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MatchSetup = () => {
  const navigate = useNavigate();
  // Ensure the initial player has an empty scores array for consistency later
  const [players, setPlayers] = useState([{ name: "", scores: [] }]);

  const handleChange = (index, value) => {
    const updated = [...players];
    updated[index].name = value;
    setPlayers(updated);
  };

  const addPlayer = () => {
    // Get the last player in the array
    const lastPlayer = players[players.length - 1];

    // Only add a new input if the last one is not empty
    if (lastPlayer.name.trim() !== "") {
      setPlayers([...players, { name: "", scores: [] }]); // Add scores: []
    }
  };

  const removePlayer = (index) => {
    const updated = [...players];
    updated.splice(index, 1);
    setPlayers(updated);
  };

  const startGame = () => {
    // Filter out players with empty names
    const activePlayers = players.filter((p) => p.name.trim() !== "");

    // Check if there are at least two active players
    if (activePlayers.length >= 2) {
      // Pass only the active players to the game state
      navigate("/game", { state: { players: activePlayers } });
    }
  };

  // Determine if the start button should be enabled (at least two non-empty players)
  const isStartEnabled =
    players.filter((p) => p.name.trim() !== "").length >= 2;
    
  // Determine if the add button should be enabled (last player must be named)
  const isAddEnabled = players[players.length - 1].name.trim() !== "";

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        {/* Title with improved styling */}
        <h2 className="text-4xl font-extrabold mb-8 text-yellow-400 border-b-2 border-yellow-500 pb-1">
          Match Setup
        </h2>

        <div className="flex flex-col gap-3 w-full max-w-md">
          {players.map((player, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 bg-gray-800 rounded-xl shadow-lg transition duration-200 hover:shadow-xl"
            >
              <span className="text-xl font-bold text-blue-300 w-8 text-center">
                {index + 1}.
              </span>
              <input
                type="text"
                placeholder={`Player Name`}
                value={player.name}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addPlayer()}
                className={`
                  px-4 py-2 rounded-lg w-full text-black bg-white/90 
                  focus:outline-none focus:ring-4 focus:ring-blue-500/50 
                  transition duration-200 border border-transparent 
                  placeholder-gray-500
                `}
              />
              {/* Only show remove button if there are more than 1 player */}
              {players.length > 1 && (
                <button
                  onClick={() => removePlayer(index)}
                  className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full font-bold shadow-md transition duration-200 transform hover:scale-105"
                  aria-label={`Remove Player ${index + 1}`}
                >
                  <span className="text-lg">−</span>
                </button>
              )}
            </div>
          ))}

          {/* ADD PLAYER BUTTON */}
          <button
            onClick={addPlayer}
            disabled={!isAddEnabled}
            className={`
              mt-4 px-4 py-3 rounded-xl font-bold text-white shadow-lg transition duration-200 transform hover:scale-[1.01]
              ${
                isAddEnabled
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            + Add Player
          </button>

          {/* START GAME BUTTON */}
          <button
            onClick={startGame}
            disabled={!isStartEnabled}
            className={`
              mt-2 px-4 py-3 rounded-xl font-extrabold shadow-2xl transition duration-200 transform hover:scale-[1.02]
              ${
                isStartEnabled
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-green-700/50 text-green-300/80 cursor-not-allowed"
              }
            `}
          >
            Start Game ({players.filter((p) => p.name.trim() !== "").length}{" "}
            Active)
          </button>
        </div>
      </div>
    </>
  );
};

export default MatchSetup;