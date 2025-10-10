



import React,{useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LOCAL_KEY_HISTORY = "henok-gameHistory";


const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const players = state?.players || [];

  // 🕒 Create a readable date/time string
  const timestamp = new Date().toLocaleString(); // e.g. "10/10/2025, 9:42 AM"

  // ✅ Save current game to localStorage
  useEffect(() => {
    if (!players.length) return;

    const alreadySaved = sessionStorage.getItem("savedResult");
    if (alreadySaved) return; // prevent duplicates after refresh

    const history = JSON.parse(localStorage.getItem(LOCAL_KEY_HISTORY) || "[]");
    const newRecord = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      players,
    };

    localStorage.setItem(
      LOCAL_KEY_HISTORY,
      JSON.stringify([...history, newRecord])
    );
    sessionStorage.setItem("savedResult", "true");
  }, [players]);



  // Define Framer Motion variants for the container (stagger effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Slight adjustment for smoother stagger
        delayChildren: 0.3, // Delay the children animations slightly
      },
    },
  };

  // Define Framer Motion variants for the individual list items
  const itemVariants = {
    hidden: { opacity: 0, x: -50 }, // Slide in from the left
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }, // Spring for a nice bounce
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      {/* ⭐️ Enhanced Header Styling */}
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold mb-8 text-blue-400 border-b-2 border-blue-500 pb-1"
      >
        🏆 Game Complete!
      </motion.h2>

      <motion.div
        className="flex flex-col gap-4 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {players.map((p, i) => {
          const total = p.scores.reduce((a, b) => a + b, 0);

          // ⭐️ Dynamic Styling based on Rank
          const rankStyles =
            i === 0
              ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-extrabold text-lg shadow-2xl ring-4 ring-yellow-300/50" // Winner: Gold Gradient, heavy shadow
              : i === 1
              ? "bg-gradient-to-r from-gray-400 to-gray-500 text-gray-900 font-bold shadow-lg" // Second: Silver Gradient
              : i === 2
              ? "bg-gradient-to-r from-amber-800 to-amber-900 text-white shadow-lg" // Third: Bronze Gradient
              : i === players.length - 1
              ? "bg-red-700 text-red-100 italic shadow-md" // Last: Deep Red
              : "bg-gray-800/80 text-white shadow-md"; // Others: Subtle Dark Gray

          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`
                flex justify-between items-center 
                px-5 py-3 rounded-xl transform transition duration-300 ease-in-out 
                ${rankStyles}
              `}
            >
              <span className="flex items-center space-x-2 min-w-0 truncate">
                {/* ⭐️ RANK BADGE */}
                <span
                  className={`
                    w-7 h-7 flex items-center justify-center rounded-full text-sm font-black 
                    ${i === 0 ? "bg-yellow-700 text-white" : "bg-gray-900/20"}
                `}
                >
                  {i + 1}
                </span>

                <span className="truncate">{p.name}</span>

                {i === 0 && (
                  <span className="ml-2 text-sm text-yellow-800 font-extrabold">
                    👑 MVP
                  </span>
                )}
                {i === players.length - 1 && (
                  <span className="ml-2 text-sm text-red-200">😅 Last</span>
                )}
              </span>

              <span
                className={`
                  font-extrabold text-xl ml-4
                  ${i === 0 ? "text-gray-900" : "text-green-400"}
              `}
              >
                {total}
              </span>
            </motion.div>
          );
        })}

        {/* ⭐️ Enhanced Button Styling */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: players.length * 0.1 + 0.5, duration: 0.5 }}
          onClick={() => {
            sessionStorage.removeItem("savedResult"); // 🔥 clear the flag
            navigate("/");
          }}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-extrabold mt-8 text-white shadow-xl transition duration-300 transform hover:scale-[1.02]"
        >
          New Match
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Results;


