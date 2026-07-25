# 🧩 Sudoku Solver Game

An interactive Sudoku Solver built using **HTML, CSS, and JavaScript**. The application allows users to select different difficulty levels, enter custom puzzles, validate the board, and automatically solve Sudoku puzzles using a **recursive backtracking algorithm**.

## ✨ Features

* 🎯 Easy, Medium, and Hard difficulty levels
* 🧠 Recursive backtracking Sudoku solver
* ✅ Row, column, and 3×3 box validation
* ⚠️ Detection of conflicting values
* 🔍 Detection of unsolvable puzzles
* ✏️ Support for custom Sudoku puzzles
* 🎨 Interactive and responsive user interface
* 📱 Mobile-friendly design
* 🔄 Clear and reset functionality
* 💫 Animated UI interactions

## 🛠️ Technologies Used

* **HTML5** — Structure
* **CSS3** — Styling, animations, responsive design
* **JavaScript** — Game logic and backtracking algorithm

## 🧠 Algorithm

The solver uses **Backtracking**:

1. Find an empty cell.
2. Try numbers from `1` to `9`.
3. Check whether the number is valid in its row, column, and 3×3 box.
4. Place the number if valid.
5. Recursively solve the remaining puzzle.
6. If the choice leads to a dead end, undo the placement and try another number.
7. Continue until the Sudoku is completely solved.

## 📌 Project Highlights

This project demonstrates practical implementation of:

* Recursion
* Backtracking
* 2D arrays
* Constraint checking
* DOM manipulation
* Event handling
* Input validation
* Responsive UI design

Built as part of my **Software Development Internship** project.
