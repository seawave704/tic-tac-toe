"use client";

import { useEffect, useState } from "react";
import Modals from "@/components/modal/modal";
import { useMovementContext } from "@/context/movement-provider";

interface Game {
  id: string;
}

interface MovementContext {
  games: Game[];
  fetchData: () => void;
}

export default function Home() {
  const { games, fetchData } = useMovementContext();
  const [newgame, setNewgame] = useState(true);
  const [mark, setMarked] = useState<Array<string>>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const player: string = "X";
  const bot: string = "O";
  let who_round: string = "X";
  let winner = "DRAW";

  const updateReplay = async (board: string[]) => {
    try {
      const res = await fetch("/api/movements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movements: JSON.stringify(board),
          who_round: who_round,
          game_id: games[0].id,
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      // console.log(data);
    } catch (error) {
      console.error("Error updating replay:", error);
    }
  };

  const updateGame = async () => {
    try {
      const res = await fetch("/api/games", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: games[0].id,
          winner: winner,
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      // console.log(data);
      fetchData();
    } catch (error) {
      console.error("Error updating replay:", error);
    }
  };

  const minimax = (
    newBoard: string[],
    currentPlayer: string
  ): { index?: number; score: number } => {
    const availSpots = newBoard.reduce<number[]>((acc, val, idx) => {
      if (val !== "X" && val !== "O") acc.push(idx);
      return acc;
    }, []);

    if (checkWin(newBoard, player)) {
      return { score: -10 };
    } else if (checkWin(newBoard, bot)) {
      return { score: 10 };
    } else if (availSpots.length === 0) {
      return { score: 0 };
    }

    const moves: { index: number; score: number }[] = [];
    for (let i = 0; i < availSpots.length; i++) {
      const move: { index: number; score: number } = {
        index: availSpots[i],
        score: 0,
      };

      newBoard[availSpots[i]] = currentPlayer;

      if (currentPlayer === bot) {
        const result = minimax(newBoard, player);
        move.score = result.score;
      } else {
        const result = minimax(newBoard, bot);
        move.score = result.score;
      }

      newBoard[availSpots[i]] = "";

      moves.push(move);
    }

    let bestMove: number = 0;
    if (currentPlayer === bot) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  };

  const checkWin = (board: string[], player: string): boolean => {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i];
      if (board[a] === player && board[b] === player && board[c] === player) {
        return true;
      }
    }
    return false;
  };

  const botMove = (data: string[]) => {
    const newMark = data;
    who_round = bot;
    const bestSpot = minimax(newMark, bot).index;
    if (bestSpot !== undefined) {
      newMark[bestSpot] = bot;
      setMarked(newMark);
      updateReplay(newMark);
    }
  };

  const handleClick = (e: number) => {
    fetchData();
    who_round = player;
    const data = [...mark];
    if (data[e] === "") {
      data[e] = player;
      setMarked(data);
      updateReplay(data);
      botMove(data);
      fetchData();
    }
  };

  const addGame = () => {
    setNewgame(true);    
    console.log("add game");
  };

  const outOfGame = () => {
    let out = false;
    mark.map((obj) => {
      if (obj === "") {
        out = true;
      }
    });
    return out;
  };

  const setclose=()=>{
    setNewgame(false);
    setMarked(["", "", "", "", "", "", "", "", ""]);
  }

  const setopen=()=>{
    setNewgame(true);
  }

  useEffect(() => {
    if (checkWin(mark, player)) {
      winner = player;
      updateGame();
      addGame();
      console.log("player win");
    } else if (checkWin(mark, bot)) {
      winner = bot;
      updateGame();
      addGame();
      console.log("bot win");
    } else {
      if (!outOfGame()) {
        winner = "DRAW";
        addGame();
        updateGame(); 
      }
    }
  }, [mark]);

  return (
    <div className="p-5 w-full h-full flex justify-center items-center content-center">
      { newgame && <Modals setClose={setclose} setopen={setopen}/>}
      <div className="grid grid-cols-3 gap-3 h-full aspect-square">
        {mark.map((obj, index) => (
          <div
            key={index}
            className="font-extrabold aspect-square text-3xl w-full h-full flex items-center content-center justify-center border-2 border-black"
            onClick={() => {
              handleClick(index);
            }}
          >
            {obj}
          </div>
        ))}
      </div>
    </div>
  );
}
