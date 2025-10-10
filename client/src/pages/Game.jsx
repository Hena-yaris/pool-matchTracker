

import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// --- Helper Functions ---
const sumArray = (arr) =>
  arr && arr.length ? arr.reduce((a, b) => a + Number(b), 0) : 0;

const totalForplayer = (player, includeCurrent = true) => {
  const base = sumArray(player.scores);
  const current = Number(player.currentScore) || 0;
  return includeCurrent ? base + current : base;
};

const makeInitialPlayers = (initial = []) =>
  initial.map((p, i) => ({
    id: p.id ?? i,
    name: p.name ?? `Player ${i + 1}`,
    scores: p.scores ?? [],
    currentScore: p.currentScore ?? "",
  }));

const LOCAL_KEY_GAME = "henok-game"; // 🔑 localStorage key
// --- End Helper Functions ---

// --- Component for Stylish Leaderboard Stats ---
const LeaderboardStats = ({ leader, least, totalForplayer }) => {
  const statsContainerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
  };

  const cardMotion = {
    whileHover: { scale: 1.05, boxShadow: "0 10px 15px rgba(0,0,0,0.2)" },
  };

  return (
    <motion.div
      variants={statsContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-row justify-between items-center gap-4 mb-8 w-full max-w-md mx-auto"
    >
      {/* 🥇 LEADER CARD */}
      <motion.div
        {...cardMotion}
        className="flex items-center flex-1 min-w-0 p-4 rounded-xl cursor-pointer
                   bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 
                   shadow-2xl border-b-4 border-yellow-600"
      >
        <span className="text-4xl pr-3">👑</span>
        <div className="flex flex-col truncate">
          <span className="font-extrabold text-xl leading-none">Leader</span>
          <span className="text-sm font-semibold truncate mt-0.5">
            {leader?.name ?? "No Data"}
          </span>
          <span className="text-xs font-bold bg-yellow-600/50 rounded-full px-2 mt-1 w-fit">
            Score: {totalForplayer(leader) || 0}
          </span>
        </div>
      </motion.div>

      {/* 😔 LOWEST CARD */}
      <motion.div
        {...cardMotion}
        className="flex items-center flex-1 min-w-0 p-4 rounded-xl cursor-pointer
                   bg-gradient-to-br from-red-600 to-red-700 text-white 
                   shadow-2xl border-b-4 border-red-800"
      >
        <span className="text-4xl pr-3">💀</span>
        <div className="flex flex-col truncate">
          <span className="font-extrabold text-xl leading-none">Lowest</span>
          <span className="text-sm font-semibold truncate mt-0.5">
            {least?.name ?? "No Data"}
          </span>
          <span className="text-xs font-bold bg-red-900/50 rounded-full px-2 mt-1 w-fit">
            Score: {totalForplayer(least) || 0}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
// --- End Leaderboard Stats Component ---

// --- Main Game Component ---
const Game = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialPlayers = location.state?.players || [];

  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem(LOCAL_KEY_GAME);

    // 🟢 If new players are passed in from navigation, use them (start fresh)
    if (initialPlayers.length > 0) {
      const formatted = makeInitialPlayers(initialPlayers);
      localStorage.setItem(LOCAL_KEY_GAME, JSON.stringify(formatted));
      return formatted;
    }

    // 🟢 Otherwise, continue the saved game if available
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }

    // 🟢 Default: no players
    return [];
  });


  // ✅ Save to localStorage whenever players change
  // useEffect(() => {
  //   localStorage.setItem(LOCAL_KEY_GAME, JSON.stringify(players));
  // }, [players]);

  // ⭐️ Sorting
  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => totalForplayer(b) - totalForplayer(a));
  }, [players]);

  const leader = sortedPlayers[0];
  const least = sortedPlayers[sortedPlayers.length - 1];

  // --- Animations ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  // --- Handlers ---
  const handleChange = (index, value) => {
    setPlayers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, currentScore: value } : p))
    );
  };

  const addScore = (index) => {
    setPlayers((prev) =>
      prev.map((p, i) => {
        if (i !== index) return p;
        const val = Number(p.currentScore) || 0;
        if (val === 0) return { ...p, currentScore: "" };
        return {
          ...p,
          scores: [...p.scores, val],
          currentScore: "",
        };
      })
    );
  };

  const removeScore = (playerIndex, scoreIndex) => {
    setPlayers((prev) =>
      prev.map((p, i) =>
        playerIndex === i
          ? { ...p, scores: p.scores.filter((_, idx) => idx !== scoreIndex) }
          : p
      )
    );
  };

  const finishGame = () => {
    const sorted = sortedPlayers;

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

    // 🧹 Clear saved game after finishing
    localStorage.removeItem(LOCAL_KEY_GAME);

    navigate("/results", { state: { players: sorted } });
  };

  // --- UI ---
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-4xl font-extrabold mb-4 mt-4 text-white/90"
      >
        Game On <span className="text-yellow-400">🎯</span>
      </motion.h2>

      <LeaderboardStats
        leader={leader}
        least={least}
        totalForplayer={totalForplayer}
      />

      <motion.div
        className="flex flex-col gap-4 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {players.map((player, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-gray-800 p-4 rounded-xl w-full shadow-xl hover:bg-gray-700 transition duration-200"
          >
            <h3 className="text-xl font-bold mb-2 text-blue-300">
              {player.name}
            </h3>

            <div className="flex gap-2 mb-3">
              <input
                type="number"
                value={player.currentScore}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addScore(index)}
                placeholder="Enter points"
                className="w-full px-3 py-2 rounded-lg text-black text-center bg-yellow-400 focus:ring-4 focus:ring-yellow-300/50 outline-none transition duration-150"
              />
              <button
                onClick={() => addScore(index)}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold text-white shadow-md transform hover:scale-105 transition"
              >
                ➕
              </button>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-3 mb-3 max-h-24 overflow-y-auto">
              <h4 className="font-semibold mb-1 text-gray-300">Scores Log:</h4>
              {player.scores.length > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {player.scores.map((s, i) => (
                    <motion.li
                      key={i}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium flex items-center"
                    >
                      {s}
                      <button
                        className="cursor-pointer text-red-700 font-extrabold hover:text-red-900 ml-1 text-xs"
                        onClick={() => removeScore(index, i)}
                      >
                        x
                      </button>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm italic">No scores yet</p>
              )}
            </div>

            <div className="text-right font-extrabold text-2xl text-green-400">
              Total: {totalForplayer(player)}
            </div>
          </motion.div>
        ))}

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: players.length * 0.1 + 0.6 }}
          onClick={finishGame}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-xl font-extrabold mt-4 shadow-lg transition duration-200"
        >
          Finish Game
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Game;
