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
app.use("/api/client", require("./routes/clientRoutes"));
app.use("/api/communication", require("./routes/communicationRoutes"));

//----------------------------------------------------------------SERVE FRONTEND
if (process.env.NODE_ENV === "production") {
  console.log(express.static(path.join(__dirname, "../", "./frontend/dist")));
  // E:\DevSpace\Projects\Local\iamfaraz-v3\frontend\dist
  // frontend\dist

  app.use(express.static(path.join(__dirname, "../", "./frontend/dist")));

  console.log(express.static(path.join(__dirname, "../", "./frontend/dist")));
  // E:\DevSpace\Projects\Local\iamfaraz-v3\frontend\dist\index.html
  // frontend\dist\index.html
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "./", "frontend", "dist", "index.html")
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
