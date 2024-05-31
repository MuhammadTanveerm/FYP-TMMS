const experss = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const router = require("./routes/routes");
const MySQLStore = require("express-mysql-session")(session);
const defaults = require("./contants/defaults");
const morgan = require("morgan");

// environment variables configure
require("dotenv").config();

const app = experss();

// passport session configure
app.use(
  session({
    key: process.env.SESSION_COOKIE_NAME,
    secret: process.env.SESSION_COOKIE_SECRET,
    store: new MySQLStore({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      database: process.env.MYSQL_COOKIE_DB,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
// logger
app.use(morgan("short"));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// routes
app.use(defaults.API_VERSION, router);

// debug sessions
app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

// server configure
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server started at: " + port);
});
