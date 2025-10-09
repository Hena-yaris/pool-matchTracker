

/////////////555555555
import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";


const sumArray = ((arr)=> arr && arr.length ? arr.reduce((a,b)=> a+Number(b),0): 0);
const totalForplayer = (player,includeCurrent= true)=> {
      const base = sumArray(player.scores);
      return includeCurrent? base+ (Number(player.currentScore) || 0): base;
}

const makeInitialPlayers = (initial = []) =>
  initial.map((p, i) => ({
    id: p.id ?? i, // ✅ if p.id exists, use it; else fallback to index
    name: p.name ?? `Player ${i + 1}`, // ✅ if no name, auto-label
    scores: p.scores ?? [], // ✅ ensure we always have an array
    currentScore: p.currentScore ?? "", // ✅ ensure we always have a string
  }));


const Game = () => {
  const navigate = useNavigate();
  const location =useLocation();
  const initialPlayers= location.state?.players||[]
  const [players, setPlayers] = useState(makeInitialPlayers(initialPlayers));

  
  const handleChange = (index, value) => {
    setPlayers((prev)=> prev.map((p,i)=> i===index? {...p,currentScore: value}: p))
  };

  const addScore = (index) => {


     setPlayers((prev) =>
       prev.map((p, i) => {
         if (i !== index) return p;
         const val = Number(p.currentScore);
         if (isNaN(val) || val === 0) return p;
         return {
           ...p,
           scores: [...p.scores, val], // new array
           currentScore: "", // reset
         };
       })
     );
  };

  //remove score
  const removeScore =(playerIndex,scoreIndex)=> {

    setPlayers((prev)=> prev.map((p,i)=> playerIndex===i? {...p, scores: p.scores.filter((_,idx)=> idx!==scoreIndex)}: p ))
  }

  

  const finishGame = () => {
    const sorted = [...players].sort((a, b) => totalForplayer(b) - totalForplayer(a));

    const topScore = totalForplayer(sorted[0]);
    const bottomScore = totalForplayer(sorted[sorted.length - 1]);

    const topTies = sorted.filter((p) => totalForplayer(p) === topScore);
    const bottomTies = sorted.filter((p) => totalForplayer(p) === bottomScore);

    if (topTies.length > 1) {
      navigate("/tiebreak", {
        state: { mode: "top", players: topTies, others: sorted },
      });
      return;
    }

    if (bottomTies.length > 1) {
      navigate("/tiebreak", {
        state: { mode: "bottom", players: bottomTies, others: sorted },
      });
      return;
    }

    navigate("/results", { state: { players: sorted } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-3xl font-bold mb-6">Game On 🎯</h2>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {players.map((player, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-xl w-full">
            <h3 className="text-lg font-semibold mb-2">{player.name}</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="number"
                value={player.currentScore}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addScore(index)}
                placeholder="Enter points"
                className="w-full px-3 py-2 rounded-lg text-black text-center bg-yellow-400"
              />
              <button
                onClick={() => addScore(index)}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold text-white"
              >
                ➕
              </button>
            </div>

            {/** scores list */}
            <div className="bg-gray-700 rounded-lg p-2 mb-2">
              <h4 className="font-semibold mb-1">Scores:</h4>
              {player.scores.length > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {player.scores.map((s, i) => (
                    <li
                      key={i}
                      className="bg-yellow-500 text-black px-3 py-1 rounded-lg"
                    >
                      <span>{s}</span>
                      <button
                        className="cursor-pointer text-red-700 font-bold hover:text-red-900 pl-1"
                        onClick={() => removeScore(index, i)}
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">No scores yet</p>
              )}
            </div>

            <div className="text-right font-bold text-xl text-green-400">
              Total: {totalForplayer(player)}
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






/**
 * Game component
 * - Immutable updates
 * - Live leader display
 * - Confirm before finishing
 * - Save finished games to localStorage ("gameHistory")
 */
