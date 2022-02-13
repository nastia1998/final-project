const express = require("express");
const bodyParser = require("body-parser");
const db = require("./queries");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

app.get("/categories", db.getCategories);
app.post("/categories", db.createCategory);
app.patch("/categories/:id", db.updateCategory);
app.delete("/categories/:id", db.deleteCategory);

app.get("/operations", db.getOperations);
app.post("/operations", db.createOperation);
app.patch("/operations/:id", db.updateOperation);
app.delete("/operations/:id", db.deleteOperation);

app.listen(port, () => console.log(`App listening on port ${port}`));
