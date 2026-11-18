"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Currency = "INR" | "USD";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (inr: number, usd: number, billing?: string) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "INR",
  setCurrency: () => {},
  formatPrice: () => "",
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("INR");

  useEffect(() => {
    const saved = localStorage.getItem("nc_currency") as Currency;
    if (saved === "INR" || saved === "USD") {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("nc_currency", c);
  };

  const formatPrice = (inr: number, usd: number, billing?: string): string => {
    const period = billing === "monthly" ? "/mo" : billing === "one-time" ? "/project" : "";
    if (currency === "USD") {
      return `$${usd.toLocaleString()}${period}`;
    }
    return `₹${inr.toLocaleString("en-IN")}${period}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
