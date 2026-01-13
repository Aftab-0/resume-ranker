import { createContext, useState } from "react";

export const ScoreContext = createContext();

export function ScoreProvider({ children }) {
  const [scoreData, setScoreData] = useState(null);

  return (
    <ScoreContext.Provider value={{ scoreData, setScoreData }}>
      {children}
    </ScoreContext.Provider>
  );
}
