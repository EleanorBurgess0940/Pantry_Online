let db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = (app) => {
  app.get("/foodItem", (req, res) => {
    db.foodItem
      .findAll({
        raw: true,
      })
      .then((dbfooditems) => {
        res.render("foodItem", {
          foodItem: dbfooditems,
          title: "foodItem Page",
          style: "home.css",
        });
      });
  });

  app.get("/foodItem/api:id", (req, res) => {
    db.foodItem
      .findOne({
        where: {
          id: req.params.id,
        },
        include: [db.admin, db.customer],
      })
      .then((dbfoodItem) => {
        res.json(dbfoodItem);
      });
  });

  app.post("/foodItem/api", (req, res) => {
    db.foodItem.create(req.body).then((dbfoodItem) => {
      res.json(dbfoodItem);
    });
  });

  app.post("/api/deletefood/:id", (req, res) => {
    db.foodItem
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then((dbfoodItem) => {
        res.json(dbfoodItem);
      });
  });

  app.put("/foodItem/api", (req, res) => {
    db.foodItem
      .update(req.body, {
        where: {
          id: req.body.id,
        },
      })
      .then((dbfoodItem) => {
        res.json(dbfoodItem);
      });
  });

  app.post("/api/shoppingCartadd/:id", (req, res) => {
    console.log(req.user.id);
    //
    db.user
      .findOne({
        where: {
          id: req.user.id,
        },
      })
      .then((dbuser) => {
        console.log("hello", dbuser.dataValues.shoppingcart);
        try {
          if (dbuser.dataValues.shoppingcart == null) {
            console.log("meow");
            var cart = req.body.id;
          } else {
            dbuser.dataValues.shoppingcart.split(",").forEach(function (item) {
              if ((item = "req.body.id")) throw "Item already in cart";
            });
            console.log("meow1");
            var cart = dbuser.dataValues.shoppingcart + "," + req.body.id;
            console.log(cart);
          }
          db.user.update(
            {
              shoppingcart: cart,
            },
            {
              where: {
                id: req.user.id,
              },
            }
          );
        } catch (err) {
          //TODO Make error pop up if item already in cart
        }
      });
  });

  // app.get("add/:id", (req, res) => {
  //   var foodId = req.params.id;
  //   var cart = new cart(req.session.cart ? req.session.cart : {});
  //   var product = products.filter(function (item) {
  //     return item.id == foodId;
  //   });

  //   cart.add(product[0], foodId);
  //   req.session.cart = cart;
  //   res.redirect("/");
  // });
};
