

import React, { useState, useEffect } from "react"; // ⭐️ Import useState and useEffect
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LOCAL_KEY_HISTORY = "henok-gameHistory";

// Helper to safely parse and format the date from the timestamp
const formatDateTime = (timestamp) => {
  if (!timestamp) return "Unknown Date";
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const History = () => {
  const navigate = useNavigate();
  // ⭐️ Use state to manage and re-render the history
  const [history, setHistory] = useState(() => {
    try {
      const storedHistory = localStorage.getItem(LOCAL_KEY_HISTORY);
      return JSON.parse(storedHistory || "[]").sort((a, b) => b.id - a.id);
    } catch {
      return [];
    }
  });

  // --- Handlers ---
  const clearHistory = () => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete ALL game history? This cannot be undone."
      )
    ) {
      try {
        localStorage.removeItem(LOCAL_KEY_HISTORY);
        setHistory([]); // Clear local state to force re-render
        alert("Game history cleared!");
      } catch (error) {
        console.error("Failed to clear history:", error);
        alert("Failed to clear history. Check console.");
      }
    }
  };

  // --- Framer Motion Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };
  // --- End Framer Motion Variants ---

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center">
      {/* ⭐️ Stylish Header */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold mb-8 mt-4 text-purple-400 border-b-2 border-purple-500 pb-1"
      >
        Game History 📜
      </motion.h2>

      {history.length > 0 && (
        // ⭐️ CLEAR HISTORY BUTTON: Only show if there is history
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={clearHistory}
          className="mb-6 px-4 py-2 text-sm font-semibold rounded-lg text-red-100 bg-red-600 hover:bg-red-700 transition duration-200 shadow-md transform hover:scale-[1.02]"
        >
          🗑️ Clear All History ({history.length} Games)
        </motion.button>
      )}

      {history.length === 0 ? (
        <p className="text-gray-400 text-lg mt-12">
          No past games yet. Start a match!
        </p>
      ) : (
        // ⭐️ Animated Container
        <motion.div
          className="flex flex-col gap-5 w-full max-w-lg"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {history.map((game) => (
            <motion.div
              key={game.id}
              variants={itemVariants}
              className="bg-gray-800 p-5 rounded-xl shadow-2xl border-l-4 border-purple-500 hover:bg-gray-700 transition duration-300"
            >
              <div className="flex justify-between items-start mb-3 border-b border-gray-700 pb-2">
                <h3 className="text-xl font-bold text-yellow-400">
                  {game.winner ? `👑 ${game.winner}'s Win` : "Game Result"}
                </h3>
                <span className="text-sm text-gray-400 font-medium">
                  {formatDateTime(game.id)}
                </span>
              </div>

              <p className="text-gray-300 font-semibold mb-2">Final Scores:</p>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                {game.players.map((p, i) => (
                  <li
                    key={i}
                    className={`
                      px-3 py-1 rounded-full w-full flex justify-between items-center 
                      ${
                        i === 0
                          ? "bg-yellow-500 text-black font-extrabold"
                          : "bg-gray-700 text-white"
                      }
                    `}
                  >
                    <span className="truncate">{p.name}</span>
                    <span className="font-mono ml-4 text-base">
                      {p.totalScore}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* ⭐️ Start New Match Button (Unchanged) */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: history.length * 0.1 + 0.5, duration: 0.4 }}
        onClick={() => navigate("/")}
        className="mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-extrabold shadow-lg transition duration-300 transform hover:scale-[1.02]"
      >
        Start New Match
      </motion.button>
    </div>
  );
};

export default History;