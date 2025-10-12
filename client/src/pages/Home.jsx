// // import React from "react";
// // import { useNavigate } from "react-router-dom";

// // const Home = () => {
// //   const navigate = useNavigate();

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
// //       <h1 className="text-4xl font-bold mb-8">🎱 Pool Match Tracker</h1>

// //       <div className="flex flex-col gap-4">
// //         <button
// //           onClick={() => navigate("/setup")}
// //           className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl text-lg font-semibold "
// //         >
// //           Start New Match
// //         </button>

// //         <button
// //           onClick={() => navigate("/history")}
// //           className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl text-lg font-semibold"
// //         >
// //           View History
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;



// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import { motion } from "framer-motion"; // ⭐️ Import motion

// // const Home = () => {
// //   const navigate = useNavigate();

// //   // Framer Motion Variants for Staggered Entrance
// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.2,
// //         delayChildren: 0.3,
// //       },
// //     },
// //   };

// //   const itemVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: {
// //       opacity: 1,
// //       y: 0,
// //       transition: { type: "spring", stiffness: 100 },
// //     },
// //   };

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
// //       {/* ⭐️ Animated Title */}
// //       <motion.h1
// //         initial={{ opacity: 0, scale: 0.8 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         transition={{ duration: 0.5, type: "spring" }}
// //         className="text-6xl font-extrabold mb-4 text-white/95 tracking-wide text-center"
// //       >
// //         <span className="text-yellow-400">🎱</span> MatchMaster
// //       </motion.h1>

// //       <motion.p
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         transition={{ delay: 0.6, duration: 0.5 }}
// //         className="text-lg text-gray-400 mb-12"
// //       >
// //         Track scores, settle tiebreaks, crown the champion.
// //       </motion.p>

// //       {/* ⭐️ Animated Button Container */}
// //       <motion.div
// //         className="flex flex-col gap-5 w-full max-w-xs"
// //         variants={containerVariants}
// //         initial="hidden"
// //         animate="visible"
// //       >
// //         {/* START NEW MATCH BUTTON */}
// //         <motion.button
// //           variants={itemVariants}
// //           onClick={() => navigate("/setup")}
// //           className="
// //             bg-green-500 hover:bg-green-600 px-6 py-4 rounded-xl text-xl font-bold 
// //             shadow-xl transition duration-300 transform hover:scale-[1.03]
// //           "
// //         >
// //           🚀 Start New Match
// //         </motion.button>

// //         {/* VIEW HISTORY BUTTON */}
// //         <motion.button
// //           variants={itemVariants}
// //           onClick={() => navigate("/history")}
// //           className="
// //             bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-xl text-xl font-bold 
// //             shadow-lg transition duration-300 transform hover:scale-[1.03]
// //           "
// //         >
// //           📜 View History
// //         </motion.button>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default Home;




// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const Home = () => {
//   const navigate = useNavigate();

//   // Framer Motion Variants for Staggered Entrance
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15, // Faster stagger for snappier feel
//         delayChildren: 0.4,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30, scale: 0.95 }, // Start further down and slightly smaller
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         type: "spring",
//         stiffness: 150, // More stiffness for a quicker bounce
//         damping: 15,
//       },
//     },
//   };

//   return (
//     // ⭐️ BACKGROUND: Use a dramatic dark gradient
//     <div
//       className="flex flex-col items-center justify-center min-h-screen text-white p-6 
//                     bg-gradient-to-br from-gray-900 to-gray-800"
//     >
//       {/* ⭐️ Animated Title */}
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, ease: "easeOut" }}
//         className="text-7xl font-extrabold mb-4 text-white tracking-tighter text-center 
//                    drop-shadow-lg"
//       >
//         {/* ⭐️ Title with distinct font style (assuming you have a custom font or want to emphasize the pool ball) */}
//         <span className="text-yellow-400">🎱</span>
//         <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
//           RackUp
//         </span>
//       </motion.h1>

//       <motion.p
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.6, duration: 0.5 }}
//         className="text-xl text-gray-400 mb-16 font-light italic"
//       >
//         Scorekeeping, simplified.
//       </motion.p>

//       {/* ⭐️ Animated Button Container */}
//       <motion.div
//         className="flex flex-col gap-6 w-full max-w-sm"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {/* START NEW MATCH BUTTON - BOLD AND PRIMARY ACTION */}
//         <motion.button
//           variants={itemVariants}
//           onClick={() => navigate("/setup")}
//           className="
//             relative bg-green-500 hover:bg-green-600 active:bg-green-700
//             px-8 py-5 rounded-2xl text-2xl font-black text-white uppercase 
//             shadow-2xl transition duration-200 
//             transform hover:-translate-y-1 hover:shadow-green-500/50 
//             focus:outline-none focus:ring-4 focus:ring-green-400/50
//           "
//         >
//           <span className="relative z-10">🎱 Start New Match</span>
//         </motion.button>

//         {/* VIEW HISTORY BUTTON - SECONDARY ACTION */}
//         <motion.button
//           variants={itemVariants}
//           onClick={() => navigate("/history")}
//           className="
//             relative bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
//             px-8 py-4 rounded-2xl text-xl font-bold text-white 
//             shadow-lg transition duration-200 
//             transform hover:-translate-y-0.5 hover:shadow-blue-500/40
//             focus:outline-none focus:ring-4 focus:ring-blue-400/50
//           "
//         >
//           📜 View History
//         </motion.button>
//       </motion.div>
//       <footer>built by Henok</footer>
//     </div>
//   );
// };

// export default Home;
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  // Helper variable for the current year
  const currentYear = new Date().getFullYear();

  // Framer Motion Variants for Staggered Entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Faster stagger for snappier feel
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 }, // Start further down and slightly smaller
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150, // More stiffness for a quicker bounce
        damping: 15,
      },
    },
  };

  return (
    // ⭐️ NEW CONTAINER: Use flex-col and flex-grow on the main element to push the footer down
    <div
      className="flex flex-col min-h-screen text-white 
                    bg-gradient-to-br from-gray-900 to-gray-800"
    >
      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex flex-col items-center justify-center flex-grow p-6">
        {/* ⭐️ Animated Title */}
        <motion.h1k
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-7xl font-extrabold mb-4 text-white tracking-tighter text-center 
                     drop-shadow-lg"
        >
          <span className="text-yellow-400">🎱</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
            RackUp
          </span>
        </motion.h1k>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-xl text-gray-400 mb-16 font-light italic"
        >
          Scorekeeping, simplified.
        </motion.p>

        {/* ⭐️ Animated Button Container */}
        <motion.div
          className="flex flex-col gap-6 w-full max-w-sm"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* START NEW MATCH BUTTON - BOLD AND PRIMARY ACTION */}
          <motion.button
            variants={itemVariants}
            onClick={() => navigate("/setup")}
            className="
              relative bg-green-500 hover:bg-green-600 active:bg-green-700
              px-8 py-5 rounded-2xl text-2xl font-black text-white uppercase 
              shadow-2xl transition duration-200 
              transform hover:-translate-y-1 hover:shadow-green-500/50 
              focus:outline-none focus:ring-4 focus:ring-green-400/50
            "
          >
            <span className="relative z-10">🎱 Start New Match</span>
          </motion.button>

          {/* VIEW HISTORY BUTTON - SECONDARY ACTION */}
          <motion.button
            variants={itemVariants}
            onClick={() => navigate("/history")}
            className="
              relative bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
              px-8 py-4 rounded-2xl text-xl font-bold text-white 
              shadow-lg transition duration-200 
              transform hover:-translate-y-0.5 hover:shadow-blue-500/40
              focus:outline-none focus:ring-4 focus:ring-blue-400/50
            "
          >
            📜 View History
          </motion.button>
        </motion.div>
      </main>

      {/* ⭐️ AWESOME FOOTER ⭐️ */}
      <motion.footer
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="w-full py-4 text-center border-t border-gray-700/50 bg-gray-900/50 backdrop-blur-sm"
      >
        <p className="text-xs font-mono text-gray-500">
          Built with ⚛️ React & 🚀 Framer Motion | &copy; {currentYear} Henok
        </p>
      </motion.footer>
    </div>
  );
};

export default Home;
