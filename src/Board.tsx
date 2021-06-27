import React, { MouseEvent, useEffect, useState } from "react";
import { isWin, isTheGameOver, createBoard, TicTac } from "./helpers";

export const Board = () => {
  const [board, setBoard] = useState(createBoard(3));
  const [clickCounter, setClickCounter] = useState(0);

  const [player, setPlayer] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const [role, setRole] = useState<TicTac>("X");
  const [boardSize, setBoardSize] = useState("3");
  const [isWinner, setisWinner] = useState(false);

  const [playerName, setPlayerName] = useState({
    X: {
      name: "player 1",
    },
    O: {
      name: "player 2",
    },
  });

  const countDown = () => {
    setTimeout(() => {
      setPlayer(!player);
      setRole((role) => (player === false ? (role = "X") : (role = "O")));
    }, 30000);
  };

  useEffect(() => {
    if(clickCounter >= parseInt(boardSize) - 1) {
       if (isWin(role, board)) {
      setIsGameOver(true);
      setisWinner(true);
    }
    }
    if (isTheGameOver(board)) {
      setIsGameOver(true);
    }
  }, [board]);

  useEffect(() => {
    if (!isGameOver) {
      countDown();
    }
  }, [player]);

  const resetBoard = () => {
    setBoard(createBoard(parseInt(boardSize)));
    setisWinner(false);
    setIsGameOver(false);
    setPlayer(false);
    setRole("X");
    setClickCounter(0);
  };

  const handleCellClick = (e: MouseEvent<HTMLButtonElement>) => {
    const currentTarget = e.target as HTMLButtonElement
    const [idx, tsx] = currentTarget.value.split(".");

    setBoard((prevState) => {
      const newArr = prevState.slice();
      newArr[parseInt(idx)][parseInt(tsx)] = player === false ? "X" : "O";
      setRole((role) => (player === false ? (role = "X") : (role = "O")));
      return newArr;
    });
    setPlayer((prevState) => !prevState);
    setClickCounter((counter) => counter + 1);
  };

  const handleChangeName1 = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.target as HTMLInputElement;
    setPlayerName((player) => ({
      ...player,
      X: {
        name: value.value,
      },
    }));
  };

  const handleChangeName2 = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.target as HTMLInputElement ;
    setPlayerName((player) => ({
      ...player,
      O: {
        name: value.value,
      },
    }));
  };

  const handleBoardSize = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setBoardSize(target.value);
  };

  return (
    <div className="board-container">
      <button onClick={resetBoard} className="reset-button">
        New Game
      </button>
      <div className="board-size">
        <p>Board Size: </p>
        <div className='counter'>
          <input type="number" value={boardSize} onChange={handleBoardSize} />
        </div>
      </div>
      <div className='player-inputs'>
        <input
          type="text"
          value={playerName["X"].name}
          onChange={handleChangeName1}
        />
        <input
          type="text"
          value={playerName["O"].name}
          onChange={handleChangeName2}
        />
      </div>
      <div className='player-name'>
        {player === false
          ? `${playerName["X"].name}'s turn`
          : `${playerName["O"].name}'s turn`}
      </div>
      {board.map((subArr, idx) => {
        return (
          <div className="cells" key={`key ${idx}`}>
            {subArr.map((arr, tsx) => (
              <button
              key={`cell ${tsx} ${idx}`}
                className="single-cell"
                value={`${idx}.${tsx}`}
                onClick={handleCellClick}
                disabled={isGameOver}
                data-testid={`cell-click ${tsx} ${idx}`}
              >
                {board[idx][tsx]}
              </button>
            ))}
          </div>
        );
      })}
      {isGameOver && <p>Game Over!</p>}
      {isWinner && <p>Winner is : {playerName[role].name}</p>}
    </div>
  );
};
