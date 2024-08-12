const dotenv = require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const { errorHandler } = require("./middlewares/errorMiddleware");

//----------------------------------------------------------------DATABASE
const connectDB = require("./config/db");
connectDB();

//----------------------------------------------------------------MIDDLEWARE - REQUEST Data Parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

//----------------------------------------------------------------ROUTES
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/info", require("./routes/infoRoutes"));

//----------------------------------------------------------------SERVE FRONTEND
if (process.env.NODE_ENV === "production") {
  console.log(express.static(path.join(__dirname, "../", "./frontend/build")));
  // E:\DevSpace\Projects\GitHub\farazahmad.email\Private\iamfaraz\frontend\build
  // frontend\build

  app.use(express.static(path.join(__dirname, "../", "./frontend/build")));

  console.log(express.static(path.join(__dirname, "../", "./frontend/build")));
  // E:\DevSpace\Projects\GitHub\farazahmad.email\Private\iamfaraz\frontend\build\index.html
  // frontend\build\index.html
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "./", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set NODE_ENV to production"));
}

//----------------------------------------------------------------MIDDLEWARE - Custom Error Handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
