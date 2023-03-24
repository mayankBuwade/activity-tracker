const express = require("express");
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth.js");

const router = express.Router();

// require auth for all workouts
router.use(requireAuth);

// GET all workouts
router.get("/:date", getWorkouts);
// GET single workout
router.get("/:id", getWorkout);
// POST a new workout
router.post("/", createWorkout);
// DELETE a new workout
router.delete("/:id", deleteWorkout);
// UPDATE a new workout
router.patch("/:id", updateWorkout);

module.exports = router;
