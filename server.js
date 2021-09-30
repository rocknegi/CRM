const express = require("express");

const app = express();

//Init Middleware
app.use(express.json());

//Define Routes
app.get("/", (req, res) => {
  res.send("hello world");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is live on PORT ${PORT}`));
