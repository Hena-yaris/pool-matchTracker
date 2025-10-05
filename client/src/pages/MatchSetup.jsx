import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MatchSetup = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([{ name: "" }]);

  const handleChange = (index, value) => {
    const updated = [...players];
    updated[index].name = value;
    setPlayers(updated);
  };

  const addPlayer = () => {
    setPlayers([...players, { name: "" }]);
  };

  const startGame = () => {
    // Send players to game screen
    navigate("/game", { state: { players } });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <h2 className="text-3xl font-bold mb-6">Add Players</h2>

        <div className="flex flex-col gap-4 w-full max-w-md">
          {players.map((player, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Player ${index + 1} Name`}
              value={player.name}
              onChange={(e) => handleChange(index, e.target.value)}
              className="px-4 py-2 rounded-xl text-black"
            />
          ))}

          <button
            onClick={addPlayer}
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-xl font-semibold"
          >
            + Add Player
          </button>

          <button
            onClick={startGame}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl font-semibold"
          >
            Start Game
          </button>
        </div>
      </div>

    </>
  );
};

export default MatchSetup;
