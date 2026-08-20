const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 5000;

const db = require("./config/db");

const heroRoute = require("./routes/heroRoute");
const projectRoute = require("./routes/projectRoute");
const messageRoute = require("./routes/messageRoute");
const skillRoute = require("./routes/skillRoute");
const certificateRoute = require("./routes/certificateRoutes");
const testimonialRoute = require("./routes/testimonialRoutes");

app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());

app.use(heroRoute);
app.use(projectRoute);
app.use(messageRoute);
app.use(skillRoute);
app.use(certificateRoute);
app.use(testimonialRoute);

app.get("/", (req, res) => {
  res.send("Selamat Datang di Backend Portfolio");
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});