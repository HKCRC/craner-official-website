import React, { createContext, useContext } from "react";
import type { ProductListItem } from "@/lib/api/public-read";

const ProductsContext = createContext<ProductListItem[] | null>(null);

export function ProductsProvider({
  value,
  children,
}: {
  value: ProductListItem[] | null;
  children: React.ReactNode;
}) {
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts(): ProductListItem[] | null {
  return useContext(ProductsContext);
}

