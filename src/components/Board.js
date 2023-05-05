import Square from "./Square";
import axios from "axios";
import { useEffect, useState } from "react";
import WinnerBoard from "./WinnerBoard";

export default function Board({ xIsNext, squares, onPlay }) {
  const winInfo = calculateWinner(squares);
  const winLine = winInfo.line;

  function handleClick(i) {
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    let row = 1 + Math.floor(i / 3);
    let col = 1 + (i % 3);

    let coordinates = {};
    coordinates.row = row;
    coordinates.col = col;

    let obj = {};
    obj.squares = nextSquares;
    obj.coordinates = coordinates;

    onPlay(obj);
  }

  let dateHoy = new Date();
  let dateDia = dateHoy.getDate();
  let dateMes = dateHoy.getMonth() + 1;
  let dateAño = dateHoy.getFullYear();
  let dateHours = dateHoy.getHours();
  let dateMinutes = dateHoy.getMinutes();
  let dateSeconds = dateHoy.getSeconds();
  let dateTime;
  console.log(dateHoy);
  if (dateHours > 12) {
    if (dateHours === 13) {
      dateHours = 1;
    }
    if (dateHours === 14) {
      dateHours = 2;
    }
    if (dateHours === 15) {
      dateHours = 3;
    }
    if (dateHours === 16) {
      dateHours = 4;
    }
    if (dateHours === 17) {
      dateHours = 5;
    }
    if (dateHours === 18) {
      dateHours = 6;
    }
    if (dateHours === 19) {
      dateHours = 7;
    }
    if (dateHours === 20) {
      dateHours = 8;
    }
    if (dateHours === 21) {
      dateHours = 9;
    }
    if (dateHours === 22) {
      dateHours = 10;
    }
    if (dateHours === 23) {
      dateHours = 11;
    }
    dateTime = `${dateHours}:${dateMinutes}:${dateSeconds} p. m.`;
  } else {
    if (dateHours === 0) {
      dateHours = 12;
    }
    dateTime = `${dateHours}:${dateMinutes}:${dateSeconds} a. m.`;
  }
  let dateHoyModified = `${dateDia}/${dateMes}/${dateAño}`;
  let fechaActualModified = `${dateHoyModified} a las ${dateTime}`;

  const winner = calculateWinner(squares).winner;
  let status;
  console.log(winner);
  if (winner) {
    status = "Ganador: " + winner;
    const url = "https://64399062bd3623f1b9a3051a.mockapi.io/winners";
    const data = {
      fecha: fechaActualModified,
      ganador: winner,
    };
    axios.post(url, data);
  } else {
    if (winInfo.isDraw) {
      status = "Empate";
    } else {
      status = "Siguiente Jugador: " + (xIsNext ? "X" : "O");
    }
  }

  const [winners, setWinners] = useState([]);
  useEffect(() => {
    const getWinners = async () => {
      const url = "https://64399062bd3623f1b9a3051a.mockapi.io/winners";
      const result = await axios.get(url);
      setWinners(result.data);
    };
    getWinners();
  }, []);

  let board = [];
  for (let index = 0; index < 3; index++) {
    let cols = [];
    for (let j = 0; j < 3; j++) {
      let pos = index * 3 + j;
      cols.push(
        <Square
          value={squares[pos]}
          onSquareClick={() => handleClick(pos)}
          key={pos}
          highlight={winLine && winLine.includes(pos)}
        />
      );
    }
    board.push(
      <div key={index} className="board-row">
        {cols}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {board}
      <p className="aviso-historial">
        Para ver y Actualizar el historial de ganadores, recargue la página.
      </p>
      <WinnerBoard winners={winners} />
    </>
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
      return { winner: squares[a], line: lines[i] };
    }
  }

  let isDraw = true;
  for (let j = 0; j < squares.length; j++) {
    if (squares[j] === null) {
      isDraw = false;
      break;
    }
  }

  return { winner: null, line: null, isDraw: isDraw };
}
