const gameBoard = (function () {
  let board = ['', '', '', '', '', '', '', '', ''];
  const getBoard = () => board;

  const resetBoard = () => (board = ['', '', '', '', '', '', '', '', '']);

  return { getBoard, resetBoard };
})();

function playerFactory(name, sign) {
  return { name, sign };
}

let player1 = playerFactory('Ivan', 'X');
let player2 = playerFactory('Cveti', 'O');

const gameController = (function () {
  let currPlayer = player1;

  let gameWon = false;

  let getCurrPlayer = () => currPlayer;
  let getGameState = () => gameWon;
  let switchPlayer = () =>
    (currPlayer = currPlayer === player1 ? player2 : player1);

  function checkWinner(sign) {
    let board = gameBoard.getBoard();
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
      console.log(`${sign} Wins!`);
      gameWon = true;
    }
  }

  return { getCurrPlayer, getGameState, switchPlayer, checkWinner };
})();

const displayController = (function () {
  let boardCells = document.querySelectorAll('.gameCube');
  let restartBtn = document.querySelector('.restartBtn');
  let score = document.querySelector('.scorePara');

  boardCells.forEach((cell) => {
    cell.addEventListener('click', () => {
      if (cell.textContent !== '' || gameController.getGameState()) {
        return;
      }
      const index = event.target.dataset.index;
      const player = gameController.getCurrPlayer();
      const board = gameBoard.getBoard();

      if (player === player1) {
        cell.textContent = 'X';
        board[index] = 'X';
        gameController.checkWinner('X');
      } else {
        cell.textContent = 'O';
        board[index] = 'O';
        gameController.checkWinner('O');
      }

      gameController.switchPlayer();
    });
  });

  restartBtn.addEventListener('click', () => {
    gameBoard.resetBoard();
    boardCells.forEach((cell) => (cell.textContent = ''));
  });
})();
