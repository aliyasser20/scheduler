import { useState } from "react";

const useVisualMode = initial => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  return {
    mode,
    transition: (newMode, replace) => {
      setMode(newMode);
      if (replace) {
        setHistory([...history.slice(0, history.length - 1), newMode]);
      } else {
        setHistory([...history, newMode]);
      }
    },
    back: () => {
      if (history.length > 1) {
        setMode(history[history.length - 2]);
        setHistory([...history].slice(0, history.length - 1));
      }
    }
  };
};

export default useVisualMode;
