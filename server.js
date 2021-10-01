const express = require("express");
const { sequelize } = require("./models");

const app = express();

//Init Middleware
app.use(express.json());

//Define Routes
app.get("/", (req, res) => {
  console.log("test");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server is live on PORT http://localhost:${PORT}`);
  //Create databse tables
  await sequelize.authenticate();
  console.log("DB connected");
});
