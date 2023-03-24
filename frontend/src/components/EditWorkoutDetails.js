import React from "react";

const EditWorkoutDetails = ({ newWorkout, setNewWorkout }) => {
  return (
    <>
      <h4>
        Title:
        <input
          value={newWorkout.title}
          onChange={(e) => {
            setNewWorkout({ ...newWorkout, title: e.target.value });
          }}
        />
      </h4>
      <p>
        <strong>Load (kg):</strong>{" "}
        <input
          value={newWorkout.load}
          onChange={(e) => {
            setNewWorkout({ ...newWorkout, load: e.target.value });
          }}
        />
      </p>
      <p>
        <strong>Reps:</strong>{" "}
        <input
          value={newWorkout.reps}
          onChange={(e) => {
            setNewWorkout({ ...newWorkout, reps: e.target.value });
          }}
        />
      </p>
    </>
  );
};

export default EditWorkoutDetails;
