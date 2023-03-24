import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import Calender from "../components/Calender";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const [date, setDate] = useState(dayjs(new Date()));

  useEffect(() => {
    const fetchWorkout = async () => {
      const currDate = date.toISOString().split("T")[0];
      const response = await fetch(`/api/workouts/${currDate}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const jsonData = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: jsonData });
      }
    };
    if (user) {
      fetchWorkout();
    }
  }, [dispatch, user, date]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <div>
        <WorkoutForm date={date.toISOString().split("T")[0]} />
        <Calender setDate={setDate} date={date} />
      </div>
    </div>
  );
};

export default Home;
