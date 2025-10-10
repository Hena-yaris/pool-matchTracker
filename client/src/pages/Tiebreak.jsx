import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* ---------- 🔹 Pure Utility Functions ---------- */
const LOCAL_KEY_TIE = "henok-tieGame";

const sumArray = (arr) =>
  arr && arr.length ? arr.reduce((a, b) => a + Number(b), 0) : 0;

const totalForplayer = (player, includeCurrent = true) => {
  const base = sumArray(player.scores);
  return includeCurrent ? base + (Number(player.currentScore) || 0) : base;
};

const Tiebreak = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { mode, players, others } = state;

  // ✅ Proper localStorage + fallback logic
  const [local, setLocal] = useState(() => {
    const saved = localStorage.getItem(LOCAL_KEY_TIE);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error("Failed to parse saved tiebreak data:", error);
      }
    }
    // Fallback if no saved data or parse failed
    return players.map((p) => ({ ...p, scores: [], currentScore: "" }));
  });

  // ✅ Save whenever `local` changes
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY_TIE, JSON.stringify(local));
  }, [local]);

  /* ---------- 🔹 Handlers ---------- */
  const handleChange = (index, val) => {
    setLocal((prev) =>
      prev.map((p, i) => (i === index ? { ...p, currentScore: val } : p))
    );
  };

  const addScore = (index) => {
    setLocal((prev) =>
      prev.map((p, i) => {
        if (i !== index) return p;
        const val = Number(p.currentScore);
        if (isNaN(val) || val === 0) return p;
        return { ...p, scores: [...p.scores, val], currentScore: "" };
      })
    );
  };

  const removeScore = (playerIndex, scoreIndex) => {
    setLocal((prev) =>
      prev.map((p, i) =>
        i === playerIndex
          ? { ...p, scores: p.scores.filter((_, idx) => idx !== scoreIndex) }
          : p
      )
    );
  };

  const finishTiebreak = () => {
    const sortedTies = [...local].sort(
      (a, b) => totalForplayer(b) - totalForplayer(a)
    );
    const rest = others.filter((p) => !players.some((t) => t.name === p.name));

    let finalPlayers;
    if (mode === "top") {
      finalPlayers = [...sortedTies, ...rest];
    } else {
      finalPlayers = [...rest, ...sortedTies];
    }

    // ✅ Clear storage when finished
    localStorage.removeItem(LOCAL_KEY_TIE);

    navigate("/results", { state: { players: finalPlayers } });
  };

  /* ---------- 🔹 Render ---------- */
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-3xl font-bold mb-6">
        {mode === "top" ? "🏆 Tiebreak for Winner" : "😔 Tiebreak for Least"}
      </h2>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {local.map((player, index) => (
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

            <div className="bg-gray-700 p-2 mb-2 rounded-lg">
              <h4 className="font-semibold mb-1">Scores:</h4>
              {player.scores.length > 0 ? (
                <ul className="flex flex-wrap gap-2 mb-2">
                  {player.scores.map((s, i) => (
                    <li
                      key={i}
                      className="bg-yellow-500 text-black px-3 py-1 rounded-lg"
                    >
                      <button
                        className="cursor-pointer"
                        onClick={() => removeScore(index, i)}
                      >
                        {s}
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
          onClick={finishTiebreak}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl font-semibold mt-4"
        >
          Finish Tiebreak
        </button>
      </div>
    </div>
  );
};

export default Tiebreak;
