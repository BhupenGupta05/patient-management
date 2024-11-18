const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const { PatientRouter } = require("./routes/Patient");
const { AppointmentRouter } = require("./routes/Appointment");
const {AdminRouter} = require('./routes/Admin')

require("dotenv").config();

const app = express()

const url = process.env.MONGODB_URL;
// console.log("connecting to", url);
mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Ping")
})

app.use("/api/patient", PatientRouter)
app.use("/api/patient/:patientId", AppointmentRouter)
app.use("/api/admin", AdminRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})