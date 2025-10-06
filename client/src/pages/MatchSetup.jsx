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
    // Get the last player in the array
    const lastPlayer = players[players.length - 1];

    // Only add a new input if the last one is not empty
    if (lastPlayer.name.trim() !== "") {
      setPlayers([...players, { name: "" }]);
    }
  };

  const removePlayer = (index)=> {
    const updated = [...players];
    updated.splice(index,1);
    setPlayers(updated);
  }

  const startGame = () => {
    const hasEmpty = players.some((p) => p.name.trim() === "");
    if (!hasEmpty) {
      navigate("/game", { state: { players } });
    } 

  };


  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <h2 className="text-3xl font-bold mb-6">Add Players</h2>

        <div className="flex flex-col gap-4 w-full max-w-md">
          {players.map((player, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                placeholder={`Player ${index + 1} Name`}
                value={player.name}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e)=> e.key==="Enter" && addPlayer()}
                className={`px-4 py-2 rounded-xl border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black bg-gray-200`}
              />
              {players.length>1 && (
                <button 
                onClick={()=> removePlayer(index)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-full">
                    X
                </button>
              )}
            </div>
          ))}

          <button
            onClick={addPlayer}
            className={` px-4 py-2 rounded-xl font-semibold ${
              players[players.length - 1].name.trim() === ""
                ? "bg-yellow-300 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            + Add Player
          </button>

          <button
            onClick={startGame}
            className={`px-4 py-2 rounded-xl font-semibold ${
              players[players.length - 1].name.trim() === ""
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            Start Game
          </button>
        </div>
      </div>
    </>
  );
};

export default MatchSetup;
