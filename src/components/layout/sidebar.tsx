"use client";

import { useMovementContext } from "@/context/movement-provider";
import {
  AppShell,
  Button,
  Menu,
  NavLink,
  Skeleton,
  rem,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  Home,
  ChevronRight,
  User,
  Settings,
  ChevronDown,
} from "tabler-icons-react";

export default function Sidebar() {
  const { games, fetchData } = useMovementContext();
  const [collapsed, setCollapsed] = useState<{ [key: number]: boolean }>({});

  const toggleCollapse = (gameId: number) => {
    setCollapsed({
      ...collapsed,
      [gameId]: !collapsed[gameId],
    });
  };

  useEffect(() => {
    console.log(collapsed);
  });
  return (
    <AppShell.Navbar className="h-screen overflow-auto" p="md">
      <div className="w-full text-center font-mono text-2xl text-black my-2">Replay</div>
      {/* <div>
        <Button onClick={fetchData}>fetch</Button>
      </div> */}

      {games.length === 0
        ? Array(15)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} height={28} mt="sm" animate={false} />
            ))
        : games.map((game) => {
            return (
              <div className="w-full text-black my-1 hover:cursor-pointer bg-gray-100 rounded-lg" key={game.id}>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <div
                      className="flex justify-between w-full m-2 py-2"
                      onClick={() => toggleCollapse(game.id)}
                    >
                      Winner: {game.winner}
                      <div className="mx-4"> <ChevronRight
                        className={collapsed[game.id] ? "rotate-90" : ""}
                      /></div>
                     
                    </div>
                  </Menu.Target>

                  {collapsed[game.id] &&
                    game.movements.map((movement, index) => {
                      const move: string[] = JSON.parse(movement.movements);
                      console.log(move);
                      return (
                        <div
                          key={index}
                          className="bg-gray-300 p-2 m-2 rounded-lg"
                        >
                          <Text size="xs">round : {movement.who_round}</Text>
                          <div className="grid grid-cols-3 gap-1 aspect-square w-full">
                            {move.map((mov, index) => {
                              return (
                                <div
                                  key={index}
                                  className=" aspect-square flex items-center content-center justify-center border-2 border-black"
                                  onClick={() => {}}
                                >
                                  {mov}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                </Menu>
              </div>
            );
          })}
    </AppShell.Navbar>
  );
}
