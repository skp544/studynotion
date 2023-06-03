const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoute");
const profileRoutes = require("./routes/profileRoute");
const paymentRoutes = require("./routes/paymentRoute");
const courseRoutes = require("./routes/courseRoute");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

// Database connect
database.connect();

// Middlewares

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// cloudinary Connection

cloudinaryConnect();

// routes

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

// app.get("/api/v1/auth", (request, response) => {
//   response.send("hello Jee , kaise ho saare...auth route");
// });

// def route

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Server is running...",
  });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
