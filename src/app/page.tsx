"use client";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [rook, setRook] = useState(["", "", "", "", "", "", "", "", ""]);
  const [side, setSide] = useState("X");
  const [check, setCheck] = useState("");

  const winner = useCallback((board: string[]) => {
    for (let i = 0; i < 9; i += 3) {
      if (board[i] === board[i + 1] && board[i] === board[i + 2]) {
        if (board[i] !== "") return board[i];
      }
    }
    for (let i = 0; i < 3; i++) {
      if (board[i] === board[i + 3] && board[i] === board[i + 6]) {
        if (board[i] !== "") return board[i];
      }
    }
    if (board[0] === board[4] && board[0] === board[8]) {
      if (board[4] !== "") return board[0];
    }
    if (board[2] === board[4] && board[2] === board[6]) {
      if (board[4] !== "") return board[2];
    }
    return null;
  }, []);

  const isMovesLeft = useCallback(() => {
    for (let i = 0; i < 9; i++) {
      if (rook[i] === "") {
        return true;
      }
    }
    return false;
  }, [rook]);

  const handleClick = (e: number) => {
    if (rook[e] === "") {
      let obj = rook.slice();
      obj[e] = side;
      setRook(obj);
      setSide(side === "X" ? "O" : "X");
    }
  };

  const minimax = useCallback(
    (board: string[], depth: number, isMaximizing: boolean) => {
      const currentWinner = winner(board);
      if (currentWinner === "X") return -10 + depth;
      if (currentWinner === "O") return 10 - depth;
      if (!isMovesLeft()) return 0;

      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] === "") {
            board[i] = "O";
            let score = minimax(board, depth + 1, false);
            board[i] = "";
            bestScore = Math.max(score, bestScore);
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] === "") {
            board[i] = "X";
            let score = minimax(board, depth + 1, true);
            board[i] = "";
            bestScore = Math.min(score, bestScore);
          }
        }
        return bestScore;
      }
    },
    [winner, isMovesLeft]
  );

  const findBestMove = useCallback(
    (board: string[]) => {
      let bestMove = -1;
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
          board[i] = "O";
          let score = minimax(board, 0, false);
          board[i] = "";
          if (score > bestScore) {
            bestScore = score;
            bestMove = i;
          }
        }
      }
      return bestMove;
    },
    [minimax]
  );

  useEffect(() => {
    const currentWinner = winner(rook);
    if (currentWinner) {
      setCheck(currentWinner);
    } else if (!isMovesLeft()) {
      setCheck("Tie");
    } else if (side === "O") {
      const bestMove = findBestMove(rook);
      if (bestMove !== -1) {
        let obj = rook.slice();
        obj[bestMove] = "O";
        setRook(obj);
        setSide("X");
      }
    }
  }, [rook, side, winner, isMovesLeft, findBestMove]);

  useEffect(() => {
    if (check) {
      alert(
        check === "Tie"
          ? "Game Over! It's a tie!"
          : "Game Over " + check + " won!"
      );
      setRook(["", "", "", "", "", "", "", "", ""]);
      setCheck("");
      setSide("");
    }
  }, [check]);

  return (
    <div>
      <h1 className="text-center pt-10 text-5xl text-white font-extrabold">Tic-Tac-Toe</h1>
      <div className="flex justify-center top-1/2 translate-y-1/2">
        <div className="items-center grid grid-cols-3 bg-white">
          {check}
          {rook.map((obj, i) => (
            <div className="flex justify-center items-center" key={i}>
              <div
                className="flex w-40 h-40 border-2 border-stone-950 justify-center items-center"
                onClick={() => handleClick(i)}
              >
                <h1 className="text-6xl content-center text-black font-extrabold">
                  {obj}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
