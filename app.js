const path = require("path");
require("dotenv").config();
const cors = require("cors");

const express = require("express");
const bodyParser = require("body-parser");

const formRoutes = require("./routes/forms");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://nupium-1.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/", formRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
