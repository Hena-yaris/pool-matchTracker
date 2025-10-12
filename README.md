# 🎱 RackUp: Pool Match Tracker

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB.svg)](https://reactjs.org/)
[![Styled with Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-06B6D4.svg)](https://tailwindcss.com/)
[![Animated with Framer Motion](https://img.shields.io/badge/Animated%20with-Framer%20Motion-FF0099.svg)](https://www.framer.com/motion/)

A stylish, responsive, and persistent score-tracking application designed specifically for competitive pool and billiards matches. Easily manage multiple players, track live totals, and resolve tiebreakers, ensuring a fair and fun game every time.

---

## ✨ Key Features

RackUp is built to handle the entire lifecycle of a pool match, from setup to history logging.

### 1. 🎯 Live Match Tracking
* **Player Setup:** Quickly enter and manage all players before the game starts.
* **Live High Scores:** See real-time totals and leaderboard positions updated immediately after every score entry.
* **In-Game Stats:** Visual cards display the current **Leader** and the **Lowest** scoring player at all times.

### 2. 🏆 Automated Tiebreaker Resolution
* **Intelligent Routing:** If multiple players share the **highest** or **lowest** score upon finishing, the app automatically routes to a dedicated tiebreaker screen.
* **Clear Results:** After tiebreakers, the final results are displayed in **descending order** (highest score first) for a clear winner announcement.

### 3. 💾 Data Persistence & History
* **Automatic Saving (PWA):** Built as a Progressive Web App (PWA) with **`localStorage`** persistence. You can refresh the page, close the app, or lose connection, and your current match data will be instantly recovered.
* **Game History:** All completed matches, including final scores, dates, and the winner, are permanently logged.
* **Clear History:** Easily view and **permanently delete** all past game history with a dedicated "Clear History" button.

---

## 💻 Tech Stack

| Technology | Description |
| :--- | :--- |
| **React** | Core library for building the user interface. |
| **Tailwind CSS** | Utility-first CSS framework for rapid and stylish component development. |
| **Framer Motion** | Used for smooth, engaging transitions and animations, giving the app a premium feel. |
| **React Router** | For clean navigation between the Home, Setup, Game, Tiebreak, Results, and History screens. |
| **PWA / localStorage** | Ensures data persistence for active games and history logs, making the app reliable on mobile devices. |

---

## 🚀 Getting Started

Follow these steps to get a local copy of the project up and running.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPO_URL]
    cd pool-match-tracker
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Run the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```


---

## 📸 Screenshots

<img width="874" height="585" alt="image" src="https://github.com/user-attachments/assets/96bd4111-c407-4a12-9272-9dc34537af18" />

<img width="839" height="577" alt="image" src="https://github.com/user-attachments/assets/18a1ab5b-61a7-4d28-a482-7c1cb3e434ff" />

<img width="763" height="614" alt="image" src="https://github.com/user-attachments/assets/35a2816f-0685-42b1-b846-531a94941248" />

<img width="713" height="601" alt="image" src="https://github.com/user-attachments/assets/7778dd37-c00f-4a52-9d9f-f461448c2c27" />

<img width="855" height="546" alt="image" src="https://github.com/user-attachments/assets/f8e22a05-f21c-4b6c-a1d8-37f7190ffc54" />

<img width="923" height="603" alt="image" src="https://github.com/user-attachments/assets/d02be2f6-08f4-4446-a078-73f5eb2707e3" />




---

## 🤝 Contributing

We welcome contributions! If you have a suggestion, find a bug, or want to improve the UI, please feel free to:

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---



## 👤 Contact

Henok | Project Link: [https://github.com/Hena-yaris/pool-matchTracker.git]
