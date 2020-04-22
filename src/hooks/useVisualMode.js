import { useState } from "react";

// Custom hook that manages different modes of an appointment
const useVisualMode = initial => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  return {
    mode,
    // Transition method that transitions to new mode passed with an option of replacing the previous mode in the saved history
    transition: (newMode, replace) => {
      // Set the new mode passed
      setMode(newMode);
      // If replace is needed replace the new mode with the previous one else add the new mode to history
      if (replace) {
        setHistory([...history.slice(0, history.length - 1), newMode]);
      } else {
        setHistory([...history, newMode]);
      }
    },
    // Back method that transitions back to the previous mode deleting the current mode from history as well
    back: () => {
      // Set previous mode if there is a previous mode
      if (history.length > 1) {
        setMode(history[history.length - 2]);
        // Update history
        setHistory([...history].slice(0, history.length - 1));
      }
    }
  };
};

export default useVisualMode;
