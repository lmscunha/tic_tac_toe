import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // const rows1 = [];
  //
  // for (let squareNumber = 0; squareNumber < 3; squareNumber++) {
  //   rows1.push(
  //     <Square
  //       key={squareNumber}
  //       value={squares[squareNumber]}
  //       onSquareClick={() => handleClick(squareNumber)}
  //     />
  //   );
  // }
  //
  // const rows2 = [];
  //
  // for (let squareNumber = 3; squareNumber < 6; squareNumber++) {
  //   rows2.push(
  //     <Square
  //       key={squareNumber}
  //       value={squares[squareNumber]}
  //       onSquareClick={() => handleClick(squareNumber)}
  //     />
  //   );
  // }
  //

  const numberOfRows = 3;
  const rowElements = [];
  const sqaureRow = [];

  for (let rowElement = 0; rowElement < numberOfRows; rowElement++) {
    rowElements.push(
      <div className="board-row">
        <Square
          key={rowElement}
          value={squares[rowElement]}
          onSquareClick={() => handleClick(rowElement)}
        />
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {rowElements.map((rowElement) => {
        return <div className="board-row">{squareRow}</div>;
      })}
      // <div className="board-row">{rows1}</div>
      // <div className="board-row">{rows2}</div>
      // <div className="board-row">{rows3}</div>
    </>
  );
}

export default function Game() {
  const [history, setHIstory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHIstory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move === history.length - 1) {
      description = "You are at move #" + move;
    } else if (move > 0 && move < history.length - 1) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        {move === history.length - 1 ? (
          <p>{description}</p>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
