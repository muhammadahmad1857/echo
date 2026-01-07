"use client";

import * as React from "react";
import { Provider } from "jotai"
import { ConvexProvider, ConvexReactClient } from "convex/react";
// import { ThemeProvider as NextThemesProvider } from "next-themes";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // <NextThemesProvider
    //   attribute="class"
    //   defaultTheme="system"
    //   enableSystem
    //   disableTransitionOnChange
    //   enableColorScheme
    // >
    <ConvexProvider client={convex}>
      <Provider>
        {children}
      </Provider>
    </ConvexProvider>
    // </NextThemesProvider>
  );
}
