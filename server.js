const express = require("express");
const { sequelize, Lists, Cards } = require("./models");

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

// @router  POST api/cards
// @desc    Create a card
// @access  Public

app.post("/api/cards", async (req, res) => {
  const { listUuid, description } = req.body;

  try {
    const list = await Lists.findOne({ where: { uuid: listUuid } });

    const card = await Cards.create({ description, listId: list.id });
    card.order = card.id;
    await card.save();
    return res.json(card);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// @router  GET api/cards
// @desc    Get cards
// @access  Public

app.get("/api/cards/:listId", async (req, res) => {
  const listId = req.params.listId;
  try {
    const cards = await Cards.findAll({ where: { listId } });
    // console.log(cards);
    return res.json(cards);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// @router  PUT api/cards
// @desc    Update a card
// @access  Public

app.put("/api/cards/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;
  try {
    const card = await Cards.findOne({ where: { uuid: id } });
    card.description = description;
    await card.save();
    return res.json(card);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// @router  PUT api/cards
// @desc    Update a card
// @access  Public

app.put("/api/cards/", async (req, res) => {
  const {
    // source, destination, listId,
    cardData,
  } = req.body;
  try {
    // const cards = await Cards.findAll({ where: { listId } });

    // const card1 = await Cards.findOne({ where: { id: source } });
    // const card2 = await Cards.findOne({ where: { id: destination } });

    // let temp = card1.order;
    // card1.order = card2.order;
    // card2.order = temp;

    // await card1.save();
    // await card2.save();

    // await Cards.update({ order: card1.order }, { where: { id: destination } });

    // await Cards.update({ order: card2.order }, { where: { id: source } });

    // const cards = await Cards.findAll({ where: { listId } });

    // let oldIndex, newIndex;
    // for (let i = 0; i < cardData.length; i++) {
    //   if (cardData[i]["id"] === source) oldIndex = i;
    //   if (cardData[i]["id"] === destination) newIndex = i;
    // }
    // const item = cardData.splice(oldIndex, 1);
    // cardData.splice(newIndex, 0, ...item);

    const IDS = [];
    for (let i of cardData) {
      IDS.push(i["id"]);
    }
    const destroyed = await Cards.destroy({ where: { id: IDS } });
    if (destroyed) {
      for (let i of cardData) {
        await Cards.create({
          description: i["description"],
          listId: i["listId"],
          order: i["order"],
        });
      }
    }

    return res.json(cardData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server is live on PORT http://localhost:${PORT}`);
  //Create databse tables
  await sequelize.authenticate();
  console.log("DB connected");
});
