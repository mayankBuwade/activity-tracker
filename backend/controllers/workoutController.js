const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all workouts
const getWorkouts = async (req, res) => {
  const { date } = req.params;
  console.log("selected date", date);
  const user_id = req.user._id;
  const workouts = await Workout.find({
    user_id,
    date,
  }).sort({
    createdAt: -1,
  });
  console.log(workouts);
  res.status(200).json(workouts);
};

//get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(500).json({
      error: "Not a valid Id",
    });
  const workout = await Workout.findById(id);
  if (!workout) return res.status(404).json({ error: "No such workout" });
  res.status(200).json(workout);
};

//create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps, date } = req.body;
  let emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!reps) emptyFields.push("reps");
  if (!load) emptyFields.push("load");
  console.log(emptyFields);
  if (emptyFields.length > 0)
    return res
      .status(400)
      .json({ error: "please fill all the fields", emptyFields });
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({
      title,
      load,
      reps,
      user_id,
      date,
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(500).json({
      error: "Not a valid Id",
    });
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) return res.status(400).json({ error: "No such workout" });
  res.status(200).json(workout);
};

//update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(500).json({
      error: "Not a valid Id",
    });
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  if (!workout) return res.status(400).json({ error: "No such workout" });
  console.log("updated workout", workout);
  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
};
