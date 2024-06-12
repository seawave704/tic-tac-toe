"use client"
import { AppShell, Group, Burger, Skeleton } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import Navbar from "./navbar";
import Sidebar from "./sidebar";
export default function Layout({children}:{children:React.ReactNode}) {
    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"
      >
        <Navbar opened={opened} toggle={toggle}/>
        <Sidebar/>
        <AppShell.Main className="w-full h-screen bg-slate-200">
        <div className="p-5 w-full h-full min-h-20 rounded-lg bg-white">
            {children}
            </div>
            </AppShell.Main>
      </AppShell>
    )
}