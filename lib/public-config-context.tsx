import React, { createContext, useContext } from "react";
import type { Config } from "@/lib/api/public-read";

const PublicConfigContext = createContext<Config | null>(null);

export function PublicConfigProvider({
  value,
  children,
}: {
  value: Config | null;
  children: React.ReactNode;
}) {
  return (
    <PublicConfigContext.Provider value={value}>
      {children}
    </PublicConfigContext.Provider>
  );
}

export function usePublicConfig(): Config | null {
  return useContext(PublicConfigContext);
}

