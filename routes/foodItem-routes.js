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
    //
    db.user
      .findOne({
        where: {
          id: req.user.id,
        },
      })
      .then((dbuser) => {
        try {
          var cart = dbuser.dataValues.shoppingcart;
          if (cart == null) {
            var cart = req.body.id;
          } else {
            cart.split(",").forEach(function (item) {
              if (item == req.body.id) {
                throw "Item already in cart";
              }
              cart = cart + "," + req.body.id;
            });
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

  app.post("/api/shoppingCartDelete/:id", (req, res) => {
    console.log(req.user.id);
    //

    db.user
      .findOne({
        where: {
          id: req.user.id,
        },
      })
      .then((dbuser) => {
        try {
          var cart = dbuser.dataValues.shoppingcart;
          console.log(cart);
          if (cart == null) {
            throw "Cart Empty";
          } else {
            console.log("cart not empty");
            var cartupdate = null;
            cart.split(",").forEach(function (item) {
              if (item == req.body.id) {
                console.log("remove this item");
              } else {
                if (cartupdate == null) {
                  cartupdate = item;
                } else {
                  cartupdate = "," + item;
                }
              }
            });
            console.log("cartupdate " + cartupdate);
            db.user.update(
              {
                shoppingcart: cartupdate,
              },
              {
                where: {
                  id: req.user.id,
                },
              }
            );
          }
        } catch (err) {
          //TODO Make error pop up if item already in cart
        }
      });
  });
};
