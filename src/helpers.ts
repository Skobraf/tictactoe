export type TicTac = "X" | "O";

export const createBoard = (n: number) => {
  return [...Array(n)].map((row) => Array(n).fill(""));
};

export const isHorizontalWinner = (currentPlayer: TicTac, board: string[][]) => {
  return board.some((moves) => moves.every((move) => move === currentPlayer));
};

const transposeBoard = (board: string[][]) => {
  return board.map((_, index) => board.map((row) => row[index]));
};
export const isVerticalWinner = (currentPlayer: TicTac, board: string[][]) => {
  return transposeBoard(board).some((moves) =>
    moves.every((move) => move === currentPlayer)
  );
};

const getDiagonalMoves = (board: string[][]) => {
  const diagonalMoves = [];
  const equalBasedDiagonal = [];
  const sumBasedDiagonal = [];

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      if (row === col) {
        equalBasedDiagonal.push(board[row][col]);
      }
    }
  }

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      if (row + col === board.length - 1) {
        sumBasedDiagonal.push(board[row][col]);
      }
    }
  }

  diagonalMoves.push(equalBasedDiagonal, sumBasedDiagonal);
  return diagonalMoves;
};

export const isDiagonalWinner = (currentPlayer: TicTac, board: string[][]) => {
  return getDiagonalMoves(board).some((moves) =>
    moves.every((move) => move === currentPlayer)
  );
};
export const isWin = (currentPlayer: TicTac, board: string[][]) => {
  if (isDiagonalWinner(currentPlayer, board)) {
    console.log(true, "diagonal");
    return true;
  }
  if (isHorizontalWinner(currentPlayer, board)) {
    console.log(true, "horizental");
    return true;
  }
  if (isVerticalWinner(currentPlayer, board)) {
    console.log(true, "vertical");
    return true;
  }
  return false;
};

export const isTheGameOver = (board: string[][]) =>
  board.every((row) => row.every((move) => move !== ""));
