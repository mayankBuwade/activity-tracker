require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const workoutRoutes = require("./routes/workouts.js");
const userRoutes = require("./routes/user.js");

//express app
const app = express();

//global middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    console.log("database connected");
    app.listen(process.env.PORT, () => {
      console.log("listening on port ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
