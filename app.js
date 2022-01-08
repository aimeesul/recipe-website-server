const express = require("express");
const { initializeSequelize } = require("./src/sequelize")
const app = express();
const port = 3000;
const { configureMiddleware } = require("./src/middleware/configureMiddleware");

initializeSequelize().then(() => {
  configureMiddleware(app);



  app.get("/", (req, res) => res.send("Hello World!"));
  app.get("/products", (req, res) => {
    const products = [
      {
        id: 1,
        name: "hammer",
      },
      {
        id: 2,
        name: "screwdriver",
      },
      ,
      {
        id: 3,
        name: "wrench",
      },
    ];

    res.json(products);
  })

  app.post("/dad", (req, res) => {
    res.send("Hello world");
  })

  app.get("/dad", (req, res) => {
    res.send("Hello world dad");
  })

  app.get("/users/:userID", (req, res) => {
    res.send("user id :" + req.params.userID)
  })

  app.post("/monkey", (req, res) => {
    console.log(req.body);
    res.send("okay");
  })


  app.get("/recipes", (req, res) => {
    const recipes = [{ name: "recipe1" }, { name: "recipe2" }, { name: "recipe3" }];
    res.json(recipes);
  })

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
})





