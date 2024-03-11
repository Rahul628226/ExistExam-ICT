require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const AdminRoutes=require("./routes/Admin/Admin");
const Adminauth=require("./routes/Admin/Adminauth");
const LoginAuth=require("./routes/LoginRouter/Login")
const StudentRouter=require("./routes/Student/Students")

const ScoreRouter=require("./routes/Student/Score")
// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/Tutors", userRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/Admin", AdminRoutes);
app.use("/api/Adminauth",Adminauth);
app.use("/api/login",LoginAuth);

app.use("/student",StudentRouter)
app.use("/student",ScoreRouter)
const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
