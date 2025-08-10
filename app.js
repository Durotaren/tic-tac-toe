let boardCells = document.querySelectorAll('.gameCube');
let gameWon = false;

const gameBoard = (function() {
  const board = 
  [
    '', '', '',
    '', '', '',
    '', '', '',
  ];
  const getBoard = () => board;

  return {board, getBoard};
})();

function playerFactory(name, sign) {
  return {name, sign};
}

function checkWinner(sign) {
  if (
        (gameBoard.board[0] === sign && gameBoard.board[4] === sign && gameBoard.board[8] === sign) ||
        (gameBoard.board[2] === sign && gameBoard.board[4] === sign && gameBoard.board[6] === sign) ||
        (gameBoard.board[0] === sign && gameBoard.board[1] === sign && gameBoard.board[2] === sign) ||
        (gameBoard.board[3] === sign && gameBoard.board[4] === sign && gameBoard.board[5] === sign) ||
        (gameBoard.board[6] === sign && gameBoard.board[7] === sign && gameBoard.board[8] === sign) ||
        (gameBoard.board[0] === sign && gameBoard.board[3] === sign && gameBoard.board[6] === sign) ||
        (gameBoard.board[1] === sign && gameBoard.board[4] === sign && gameBoard.board[7] === sign) ||
        (gameBoard.board[2] === sign && gameBoard.board[5] === sign && gameBoard.board[8] === sign)
      ) {
      console.log(`${sign} Wins!`);
    }
}

let player1 = playerFactory('Ivan', 'X');
let player2 = playerFactory('Cveto', 'O');

const gameState = (function() {
  let currPlayer = player1;
  let gameWon = false;

  return {currPlayer, gameWon};
})();

boardCells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (cell.textContent !== '') {
      return;
    };

    const index = event.target.dataset.index;

    if (gameState.currPlayer === player1) {
      cell.textContent = 'X'
      gameBoard.board[index] = 'X'
      checkWinner('X');
    } else {
      cell.textContent = 'O';
      gameBoard.board[index] = 'O';
      checkWinner('O');
    }
    if (gameState.currPlayer === player1) {
      gameState.currPlayer = player2;
    } else {
      gameState.currPlayer = player1;
    }

  })
})