"use client";

import { createContext, useState } from "react";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [appData, setData] = useState();

  return (
    <AppContext.Provider value={{ appData, setData }}>
      {children}
    </AppContext.Provider>
  );
}


export {AppContext, AppContextProvider}