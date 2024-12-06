const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require('mongoose');
const middleware = require('./utils/middleware')
const { PatientRouter } = require("./routes/Patient");
const { AppointmentRouter } = require("./routes/Appointment");
const {AdminRouter} = require('./routes/Admin')

require("dotenv").config();

const app = express()

const PORT = process.env.PORT || 5000
const url = process.env.MONGODB_URL || "mongodb://localhost:27017/myapp";
mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

app.use(helmet());
app.use(cors());
app.use(express.json());
// app.use(middleware.requestLogger)

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use("/api/patient", PatientRouter)
app.use("/api/appointments", AppointmentRouter)
app.use("/api/admin", AdminRouter)

// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})