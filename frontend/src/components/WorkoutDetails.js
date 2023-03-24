import React, { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import EditWorkoutDetails from "./EditWorkoutDetails";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [newWorkout, setNewWorkout] = useState(workout);

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(`api/workouts/${workout._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const jsonData = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: jsonData });
      setNewWorkout(workout);
    }
  };

  const handleOnClickEdit = async () => {
    if (!user) return;
    setIsEditing(!isEditing);
    if (
      Object.entries(workout).toString() ===
      Object.entries(newWorkout).toString()
    )
      return;
    const response = await fetch(`api/workouts/${workout._id}`, {
      method: "PATCH",
      body: JSON.stringify(newWorkout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const jsonData = await response.json();
    if (response.ok) {
      dispatch({ type: "EDIT_WORKOUT", payload: jsonData });
    }
  };

  return (
    <div className="workout-details">
      {isEditing ? (
        <EditWorkoutDetails
          newWorkout={newWorkout}
          setNewWorkout={setNewWorkout}
        />
      ) : (
        <>
          <h4>{workout.title}</h4>
          <p>
            <strong>Load (kg):</strong> {workout.load}
          </p>
          <p>
            <strong>Reps:</strong> {workout.reps}
          </p>
        </>
      )}
      <div className="modify-details">
        <span className="material-symbols-outlined" onClick={handleOnClickEdit}>
          {isEditing ? "save" : "edit"}
        </span>
        <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span>
      </div>
    </div>
  );
};

export default WorkoutDetails;
