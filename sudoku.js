const sudokuPuzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

function showSudoku() {
  const captchaContainer = document.getElementById("captcha-container");
  const sudokuContainer = document.getElementById("sudoku-container");

  if (document.getElementById("human-checkbox").checked) {
      captchaContainer.style.display = "none";
      sudokuContainer.style.display = "flex";
      sudokuContainer.style.flexDirection = "column";
      generateSudoku();
  } else {
      alert("Please verify that you are a human.");
  }
}

function generateSudoku() {
  const sudokuContainer = document.getElementById("sudoku");

  for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
          const cell = document.createElement("input");
          cell.setAttribute("type", "text");
          cell.setAttribute("maxlength", "1");
          cell.className = "sudoku-cell";
          cell.dataset.row = i;
          cell.dataset.col = j;

          if (sudokuPuzzle[i][j] !== 0) {
              cell.value = sudokuPuzzle[i][j];
              cell.setAttribute("readonly", "readonly");
              cell.classList.add("given");
          }

          sudokuContainer.appendChild(cell);
      }
  }
}

function verifyCaptcha() {
  const solution = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ];

  const userSolution = getUserSolution();

  if (arraysEqual(solution, userSolution)) {
      alert("Captcha Verified! You are a human.");
  } else {
      alert("Incorrect solution. Please try again.");
  }
}

function getUserSolution() {
  const userSolution = [];

  const cells = document.querySelectorAll(".sudoku-cell");
  for (const cell of cells) {
      const value = parseInt(cell.value) || 0;
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);

      if (!userSolution[row]) {
          userSolution[row] = [];
      }

      userSolution[row][col] = value;
  }

  return userSolution;
}

function arraysEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}