"use client";
import React, { createContext, useContext, useEffect, useState } from "react";


interface Movement {
  id: number;
  create_date: string;
  movements: string;
  who_round: string;
  game_id: number;
}
interface game {
  id: number;
  create_date: Date;
  winner: string;
  movements:Movement[]
}

interface MovementContextType {
  games: game[];
  fetchData: () => Promise<void>;
}

const MovementContext = createContext<MovementContextType | undefined>(undefined);

export const useMovementContext = () => {
  const context = useContext(MovementContext);
  if (!context) {
    throw new Error("useMovementContext must be used within a MovementProvider");
  }
  return context;
};

export default function MovementProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [games, setGames] = useState<game[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/games");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data: game[] = await res.json();
      setGames(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // console.log(games);
  },[]); // Ensure fetchData is called only once on mount

  const value = {
    games,
    fetchData,
  };

  return (
    <MovementContext.Provider value={value}>
      {children}
    </MovementContext.Provider>
  );
}
