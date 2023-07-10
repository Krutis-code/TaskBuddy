require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const taskRoute = require("./routes/tasks");
const cors = require("cors");

// express app
const app = express();

// cors

app.use(cors());

// middleware
app.use(express.json());

app.use((req, res, next) => {
  next();
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/tasks", taskRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
