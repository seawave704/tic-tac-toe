import { AppShell, Burger, Group, Text } from "@mantine/core";
import Image from "next/image";
export default function Navbar({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  return (
    <AppShell.Header>
      <Group h="100%" px="md">
        <div className="flex h-full w-full justify-center items-center">
          <Burger  opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div className="flex font-bold h-full w-full justify-center items-center">
            <Text className="m-4 text-2xl justify-center items-center">
              Tic-Tac-Toe
            </Text>
          </div>
        </div>
      </Group>
    </AppShell.Header>
  );
}
