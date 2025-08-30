const gameBoard = (function () {
  let board = ['', '', '', '', '', '', '', '', ''];
  const getBoard = () => board;

  const resetBoard = () => (board = ['', '', '', '', '', '', '', '', '']);

  return { getBoard, resetBoard };
})();

function playerFactory(name, sign) {
  let score = 0;

  let increaseScore = () => {
    score++;
  };

  let getScore = () => score;

  return { name, sign, increaseScore, getScore };
}

const gameController = (function () {
  let gameWon = false;
  const getCurrPlayer = () => currPlayer;
  const getGameState = () => gameWon;
  const boardCells = document.querySelectorAll('.gameCube');
  const playerModal = document.getElementById('playerModal');
  const startBtn = document.querySelector('.startGameBtn');
  let player1;
  let player2;
  let currPlayer;

  startBtn.addEventListener('click', () => {
    playerModal.style.display = 'none';
    const playerName =
      document.getElementById('playerName').value || 'Player 1';
    const playerSign = document.getElementById('playerSign').value;
    player1 = playerFactory(playerName, playerSign);
    player2 = playerFactory('Player 2', playerSign === 'X' ? 'O' : 'X');
    currPlayer = player1.sign === 'X' ? player1 : player2;
  });

  function showWinnerOverlay(name) {
    const overlay = document.getElementById('winnerOverlay');
    overlay.textContent = `${name} Wins!`;
    overlay.classList.add('show');
    setTimeout(() => overlay.classList.remove('show'), 3000);
    setTimeout(() => {
      resetGame();
    }, 3000);
  }

  const resetGame = () => {
    gameBoard.resetBoard();
    gameWon = false;
    currPlayer = player1;
    boardCells.forEach((cell) => (cell.textContent = ''));
  };

  let switchPlayer = () =>
    (currPlayer = currPlayer === player1 ? player2 : player1);

  function checkWinner(sign, name) {
    let board = gameBoard.getBoard();
    let winningPlayer = getCurrPlayer();
    let score = document.querySelector('.scorePara');
    if (
      (board[0] === sign && board[4] === sign && board[8] === sign) ||
      (board[2] === sign && board[4] === sign && board[6] === sign) ||
      (board[0] === sign && board[1] === sign && board[2] === sign) ||
      (board[3] === sign && board[4] === sign && board[5] === sign) ||
      (board[6] === sign && board[7] === sign && board[8] === sign) ||
      (board[0] === sign && board[3] === sign && board[6] === sign) ||
      (board[1] === sign && board[4] === sign && board[7] === sign) ||
      (board[2] === sign && board[5] === sign && board[8] === sign)
    ) {
      gameWon = true;
      showWinnerOverlay(name);
      winningPlayer.increaseScore();
      score.textContent = `Score: ${player1.getScore()} - ${player2.getScore()}`;
      console.log(winningPlayer.getScore());
    }
  }

  return {
    getCurrPlayer,
    getGameState,
    switchPlayer,
    checkWinner,
    resetGame,
  };
})();

const displayController = (function () {
  let boardCells = document.querySelectorAll('.gameCube');
  let restartBtn = document.querySelector('.restartBtn');

  boardCells.forEach((cell) => {
    cell.addEventListener('click', (event) => {
      if (cell.textContent !== '' || gameController.getGameState()) {
        return;
      }
      const index = event.target.dataset.index;
      const player = gameController.getCurrPlayer();
      const board = gameBoard.getBoard();

      if (player.sign === 'X') {
        cell.textContent = 'X';
        board[index] = 'X';
        gameController.checkWinner('X', player.name, player);
      } else {
        cell.textContent = 'O';
        board[index] = 'O';
        gameController.checkWinner('O', player.name, player);
      }

      gameController.switchPlayer();
    });
  });

  restartBtn.addEventListener('click', () => {
    gameController.resetGame();
  });
})();
