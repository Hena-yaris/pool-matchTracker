
// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion"; // 1. Import motion

// const Results = () => {
//   const { state } = useLocation();
//     const navigate = useNavigate();
//     const players = state?.players || [];

//   // Define Framer Motion variants for the container (to handle staggering)
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2, // Delay between each child animation
//       },
//     },
//   };

//   // Define Framer Motion variants for the individual list items
//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { type: "spring", stiffness: 100 },
//     },
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
//       {/* 2. Animate the header on mount */}
//       <motion.h2
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="text-3xl font-bold mb-6"
//       >
//         🏁 Final Results
//       </motion.h2>

//       {/* 3. Use motion.div and apply container variants */}
//       <motion.div
//         className="flex flex-col gap-3 w-full max-w-md"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {players.map((p, i) => {
//           // You might want to calculate the total here again or do it once at the top
//           // It's calculated once at the top now for correct sorting, but for safety:
//           const total = p.scores.reduce((a, b) => a + b, 0);

//           return (
//             // 4. Use motion.div for each item and apply item variants
//             <motion.div
//               key={i}
//               variants={itemVariants} // Apply the item animation
//               className={`flex justify-between items-center px-4 py-3 rounded-xl shadow-lg transition duration-300 ease-in-out ${
//                 i === 0
//                   ? "bg-yellow-400 text-black font-extrabold  ring-4 ring-yellow-300/50" // Extra emphasis for winner
//                   : i === players.length - 1
//                   ? "bg-red-600 text-white/90"
//                   : "bg-gray-800 text-white"
//               }`}
//             >
//               <span className="flex items-center">
//                 {i + 1}. {p.name}
//                 {i === 0 && (
//                   <span className="ml-2 text-sm text-amber-900">🥇 Winner</span>
//                 )}
//                 {i === players.length - 1 && (
//                   <span className="ml-2 text-sm text-red-200">😔 Least</span>
//                 )}
//               </span>
//               <span className="font-semibold">Score: {total}</span>
//             </motion.div>
//           );
//         })}

//         {/* 5. Animate the button separately */}
//         <motion.button
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: players.length * 0.1 + 0.2, duration: 0.4 }} // Delay after all results appear
//           onClick={() => navigate("/")}
//           className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl font-semibold mt-6 transition duration-300"
//         >
//           Back to Home
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// };

// export default Results;




import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const players = state?.players || [];

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
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-extrabold mt-8 text-white shadow-xl transition duration-300 transform hover:scale-[1.02]"
        >
          New Match
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Results;