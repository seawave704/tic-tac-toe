import { useDisclosure, useCounter } from "@mantine/hooks";
import { Modal, Button, Group, Text, Badge } from "@mantine/core";
import { useEffect } from "react";
import { useMovementContext } from "@/context/movement-provider";

export default function Modals({
  setopen,
  setClose,
}: {
  setopen: () => void;
  setClose: () => void;
}) {
  const { games, fetchData } = useMovementContext();
  const [opened, { close, open }] = useDisclosure(true);
  const newGame = async () => {
    const res = await fetch("/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        winner: "-",
      }),
    });
    fetchData();
    setClose();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={setClose}
        size="lg"
        title="Tic Tac Toe or XO"
      >
        <Text size="md">
          The game is played on a grid that&apos;s 3 squares by 3 squares.
        </Text>
        <Text size="md">
          You are X ,Bot is O . Players take turns putting their marks in empty
          squares.
        </Text>
        <Text size="md">
          Players take turns putting their marks in empty squares.
        </Text>
        <Text size="md">
          The first player to get 3 of her marks in a row (up, down, across, or
          diagonally) is the winner.
        </Text>
        <Group mt="xl">
          <Button onClick={newGame}>Start</Button>
        </Group>
      </Modal>
    </>
  );
}
