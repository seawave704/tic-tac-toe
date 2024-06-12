import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  MantineColorsTuple,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import "./globals.css";
import Layout from "@/components/layout/layout";
import MovementProvider from "@/context/movement-provider";

const noto = Noto_Sans_Thai({ subsets: ["latin", "thai"] });

export const metadata: Metadata = {
  title: "Tic-Tac-Toe",
  description: "Create For Exam",
};

const myColor: MantineColorsTuple = [
  "#f2f0ff",
  "#e0dff4",
  "#bebde0",
  "#9a98cd",
  "#7c78bc",
  "#6865b2",
  "#5f5baf",
  "#4e4b9a",
  "#45428b",
  "#39387c",
];

const theme = createTheme({
  colors: {
    myColor,
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>tic-tac-toe</title>

        <ColorSchemeScript />
      </head>

      <body className={noto.className}>
        <MantineProvider theme={theme}>
          <MovementProvider>
            <Layout>{children}</Layout>
          </MovementProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
