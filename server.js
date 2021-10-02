const express = require("express");
const { sequelize, Lists } = require("./models");

const app = express();

//Init Middleware
app.use(express.json());

//Define Routes

// @router  POST api/lists
// @desc    Create or update a list
// @access  Public

app.post("/api/lists", async (req, res) => {
  const { name } = req.body;
  try {
    const list = await Lists.create({ name });
    return res.json(list);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// @router  GET api/lists
// @desc    Get all lists
// @access  Public

app.get("/api/lists", async (req, res) => {
  try {
    const lists = await Lists.findAll();
    return res.json(lists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// @router  PUT api/lists
// @desc    Update a list
// @access  Public

app.put("/api/lists/:id", async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    const list = await Lists.findOne({ where: { id } });

    list.name = name;

    await list.save();

    return res.json(list);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server is live on PORT http://localhost:${PORT}`);
  //Create databse tables
  await sequelize.authenticate();
  console.log("DB connected");
});
