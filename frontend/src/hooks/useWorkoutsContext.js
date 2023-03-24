import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutContext.js";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutsContext);
  if (!context) {
    throw Error(
      "useWorkoutContext should be used inside a workoutContextProvider"
    );
  }
  return context;
};
