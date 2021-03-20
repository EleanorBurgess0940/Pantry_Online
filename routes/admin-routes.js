let db = require("../models");

const isAdmin = require("../config/middleware/isAdmin");

module.exports = (app) => {
  app.get("/admin", isAdmin, (req, res) => {
    res.render("admin", {
      title: "admin Page",
      style: "home.css",
    });
  });

  app.get("/foodManagement", isAdmin, function (req, res) {
    db.foodItem
      .findAll({
        raw: true,
      })
      .then((dbfooditems) => {
        res.render("foodManagement", {
          foodItem: dbfooditems,
          title: "Food Management Page",
          style: "home.css",
        });
      });
  });

  app.get("/api/admin", (req, res) => {
    db.admin
      .findAll({
        include: [db.foodItem],
      })
      .then((dbadmin) => {
        res.json(dbadmin);
      });
  });

  app.get("/api/admin/:id", (req, res) => {
    console.log(req);
    db.admin
      .findOne({
        where: {
          id: req.params.id,
        },
        include: [db.foodItem],
      })
      .then((dbadmin) => {
        res.json(dbadmin);
      });
  });

  app.post("/api/admin", (req, res) => {
    db.admin.create(req.body).then((dbadmin) => {
      res.json(dbadmin);
    });
  });

  app.delete("/api/admin/:id", (req, res) => {
    console.log(req);
    db.admin
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then((dbadmin) => {
        res.json(dbadmin);
      });
  });
};
