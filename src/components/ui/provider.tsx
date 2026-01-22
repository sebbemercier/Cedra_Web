"use client";

import React from "react";
import { HeroUIProvider } from "@heroui/react";
import { MantineProvider, createTheme } from "@mantine/core";

const mantineTheme = createTheme({
  primaryColor: "red",
});

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={mantineTheme}>
      <HeroUIProvider>
        {children}
      </HeroUIProvider>
    </MantineProvider>
  );
}
