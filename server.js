let express = require("express");
let session = require("express-session");

let passport = require("./config/passport");
// Sets up the Express App
// =============================================================
let app = express();
let PORT = process.env.PORT || 5000;

// Set Handlebars.
const exphbs = require("express-handlebars");
var hbs = exphbs.create({});

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Requiring our models for syncing
let db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/admin-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/foodItem-routes.js")(app);
require("./routes/users.js")(app);

hbs.handlebars.registerHelper("setChecked", function (value, currentValue) {
  if (value == currentValue) {
    return "checked";
  } else {
    return "";
  }
});

hbs.handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

hbs.handlebars.registerHelper("uniqueCategories", function (
  varName,
  varValue,
  options,
  foodItem
) {
  options.data.root[varName] = varValue;
});

hbs.handlebars.registerHelper("Setvariable", function (
  varName,
  varValue,
  options,
  foodItem
) {
  options.data.root[varName] = varValue;
});

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
});
