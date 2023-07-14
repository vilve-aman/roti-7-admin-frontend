"use client";

import { createContext, useState } from "react";



const RouteContext = createContext()
function RouteContextProvider({ children }) {
    const [routeData, setrouteData] = useState();
  
    return (
      <RouteContext.Provider value={{ routeData, setrouteData }}>
        {children}
      </RouteContext.Provider>
    );
  }

export { RouteContext, RouteContextProvider }