const express = require("express");
const mongoose = require("mongoose");
const TodoTask = require("./models/todoModel");
const app = express();

mongoose
  .connect(
    "mongodb+srv://faheeem123:faheeem123@todocluster.yung6.mongodb.net/Todolistdatabase",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connection succeccful"))
  .catch((err) => console.log(err));

app.use(express.json());

app.post("/save", async (req, res) => {
  var newTask = await TodoTask.create(req.body);
  console.log(req.body);
  res.send(newTask);
});

app.get("/findall", async function (req, res) {
  const newResult = await TodoTask.find();
  res.send(newResult);
});

app.get("/:id", async (req, res) => {
  try {
    const result = await TodoTask.findById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Bad request" });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const product = await TodoTask.findByIdAndDelete(req.params.id);

    if (!product) res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Bad request" });
  }
});
app.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const updatetask = await TodoTask.findByIdAndUpdate(id, {
    content: req.body.content,
  });
  console.log(updatetask);
  res.json(updatetask);
});

// app.put("/:id", async function (req, res) {
//   const updateResult = await TodoTask.findByIdAndUpdate(req.params.id);
//   console.log(updateResult);
//   res.json(updateResult);
// });

app.get("/", (req, res) => {
  return res.json("api is running");
});

app.listen(3000, () => console.log("Server Up and running"));
