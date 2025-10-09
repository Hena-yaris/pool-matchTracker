
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // 1. Import motion

const Results = () => {
  const { state } = useLocation();
    const navigate = useNavigate();
    const players = state?.players || [];

  // Define Framer Motion variants for the container (to handle staggering)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child animation
      },
    },
  };

  // Define Framer Motion variants for the individual list items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      {/* 2. Animate the header on mount */}
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6"
      >
        🏁 Final Results
      </motion.h2>

      {/* 3. Use motion.div and apply container variants */}
      <motion.div
        className="flex flex-col gap-3 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {players.map((p, i) => {
          // You might want to calculate the total here again or do it once at the top
          // It's calculated once at the top now for correct sorting, but for safety:
          const total = p.scores.reduce((a, b) => a + b, 0);

          return (
            // 4. Use motion.div for each item and apply item variants
            <motion.div
              key={i}
              variants={itemVariants} // Apply the item animation
              className={`flex justify-between items-center px-4 py-3 rounded-xl shadow-lg transition duration-300 ease-in-out ${
                i === 0
                  ? "bg-yellow-400 text-black font-extrabold  ring-4 ring-yellow-300/50" // Extra emphasis for winner
                  : i === players.length - 1
                  ? "bg-red-600 text-white/90"
                  : "bg-gray-800 text-white"
              }`}
            >
              <span className="flex items-center">
                {i + 1}. {p.name}
                {i === 0 && (
                  <span className="ml-2 text-sm text-amber-900">🥇 Winner</span>
                )}
                {i === players.length - 1 && (
                  <span className="ml-2 text-sm text-red-200">😔 Least</span>
                )}
              </span>
              <span className="font-semibold">Score: {total}</span>
            </motion.div>
          );
        })}

        {/* 5. Animate the button separately */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: players.length * 0.1 + 0.2, duration: 0.4 }} // Delay after all results appear
          onClick={() => navigate("/")}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl font-semibold mt-6 transition duration-300"
        >
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Results;