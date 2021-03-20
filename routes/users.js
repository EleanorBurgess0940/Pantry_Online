let db = require("../models");
let passport = require("../config/passport.js");

const isAuthenticated = require("../config/middleware/isAuthenticated");
const isAdmin = require("../config/middleware/isAdmin");

module.exports = (app) => {
  app.get("/api/user", (req, res) => {
    db.user
      .findAll({
        include: [db.foodItem],
      })
      .then((dbuser) => {
        res.json(dbuser);
      });
  });
  app.post("/api/user/login", passport.authenticate("local"), function (
    req,
    res
  ) {
    res.json(req.user);
  });

  app.get("/api/user/:id", (req, res) => {
    db.user
      .findOne({
        where: {
          id: req.params.id,
        },
        include: [db.foodItem],
      })
      .then((dbuser) => {
        res.json(dbuser);
      });
    db.user
      .findAll({
        include: [db.foodItem],
      })
      .then((dbuser) => {
        res.json(dbuser);
      });
  });

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  app.put("/api/user/claimfoodItem", isAuthenticated, (req, res) => {
    let claimID = req.body.id;
    let user = req.user;
    console.log(claimID);
    console.log(user);
    db.foodItem
      .update(
        {
          claimed: true,
          claimedBy: user.id,
        },
        {
          where: {
            id: claimID,
          },
        }
      )
      .then(function (data) {
        console.log(data);
        res.json(data);
      })
      .catch(function (err) {
        console.log("error", err);
      });
  });

  app.get("/api/user/:id", (req, res) => {
    db.user
      .findOne({
        where: {
          id: req.params.id,
        },
        include: [db.foodItem],
      })
      .then((dbuser) => {
        res.json(dbuser);
      });
  });

  app.post("/api/user", (req, res) => {
    db.user.create(req.body).then((dbuser) => {
      res.json(dbuser);
    });
  });

  app.post("/api/deleteuser/:id", (req, res) => {
    db.user
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then((dbuser) => {
        res.json(dbuser);
      });
  });

  app.post("/api/editusername/:id", (req, res) => {
    db.user
      .update(
        {
          name: req.body.editId.name,
        },
        {
          where: {
            id: req.body.editId.editId,
          },
        }
      )
      .then((dbuser) => {
        res.json(dbuser);
      });
  });

  app.post("/api/edituseremail/:id", (req, res) => {
    console.log(req.body.editId);
    db.user
      .update(
        {
          email: req.body.editId.email,
        },
        {
          where: {
            id: req.body.editId.editId,
          },
        }
      )
      .then((dbuser) => {
        res.json(dbuser);
      });
  });

  app.post("/api/edituserphone/:id", (req, res) => {
    console.log(req.body.editId);
    db.user
      .update(
        {
          phoneNumber: req.body.editId.phoneNumber,
        },
        {
          where: {
            id: req.body.editId.editId,
          },
        }
      )
      .then((dbuser) => {
        res.json(dbuser);
      });
  });

  app.post("/api/edituseraddress/:id", (req, res) => {
    console.log(req.body.editId);
    db.user
      .update(
        {
          address: req.body.editId.address,
        },
        {
          where: {
            id: req.body.editId.editId,
          },
        }
      )
      .then((dbuser) => {
        res.json(dbuser);
      });
  });

  app.post("/api/edituserpermission/:id", (req, res) => {
    console.log(req.body.editId);
    db.user
      .update(
        {
          permissionlevel: req.body.editId.permissionlevel,
        },
        {
          where: {
            id: req.body.editId.editId,
          },
        }
      )
      .then((dbuser) => {
        res.json(dbuser);
      });
  });

  app.get("/api/user", isAuthenticated, (req, res) => {
    console.log("this is the user", req.user);
    var query = {};
    if (req.query.admin_id) {
      query.adminId = req.query.admin_id;
    }

    db.user
      .findAll({
        raw: true,
      })
      .then((dbuser) => {
        res.render("foodItem", {
          opportunities: dbuser,
          title: "Customer Page",
          style: "home.css",
        });
      });
  });

  app.get("/userManagement", isAdmin, function (req, res) {
    console.log("This is the user management");

    db.user
      .findAll({
        raw: true,
      })
      .then((dbuser) => {
        res.render("userManagement", {
          user: dbuser,
          title: "User Management Page",
          style: "home.css",
        });
      });
  });

  app.get("/userEdit/", isAdmin, function (req, res) {
    console.log(req.query.id);

    db.user
      .findOne({
        where: {
          id: req.query.id,
        },
      })
      .then((dbuser) => {
        console.log(dbuser.dataValues, "Hello!");
        res.render("userEdit", {
          user: dbuser.dataValues,
          title: "User Edit Page",
          style: "home.css",
        });
      });
  });
};
