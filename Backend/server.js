const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");
const config = require("./index");
const pool = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;

const { auth, requiresAuth } = require("express-openid-connect");
app.use(cors());
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use(bodyParser.json());

app.get("/loginUser", async (req, res, next) => {
  async function handleLogin() {
    if (req.oidc.isAuthenticated()) {
      const user = req.oidc.user;
      console.log("korisnik koji se prijavljuje ", user);
      try {
        const existingUser = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [user.email]
        );
        if (existingUser.rows.length == 0) {
          await pool.query(
            "INSERT INTO users (email, password, name) VALUES ($1, $2, $3)",
            [user.email, user.sub, user.nickname]
          );
          console.log("New user added to db ", user.email);
        } else {
          console.log("User already exists!");
        }
      } catch (error) {
        console.log("Error saving user to db! ", error);
      }
    }
  }

  try {
    await handleLogin();
    res.redirect("/profile");
  } catch (error) {
    console.log("Greska prilikom obrade korisnika ", error);
    res.redirect("/login");
  }
});

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", requiresAuth(), async (req, res) => {
  const user = req.oidc.user;
  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [user.email]
    );
    if (existingUser.rows.length == 0) {
      await pool.query(
        "INSERT INTO users (email, password, name) VALUES ($1, $2, $3)",
        [user.email, user.sub, user.nickname]
      );
      console.log("New user added to db ", user.email);
    } else {
      console.log("User already exists!");
    }
  } catch (error) {
    console.log("Error saving user to db! ", error);
  }
  res.send(JSON.stringify(req.oidc.user));
});

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

const incomeTypesRoutes = require("./routes/incomesTypesRoutes");
app.use("/incomeTypes", incomeTypesRoutes);

const incomeRoutes = require("./routes/incomeRoutes");
app.use("/income", incomeRoutes);

const expenceTypesRoutes = require("./routes/expencesTypesRoutes");
app.use("/expenceTypes", expenceTypesRoutes);

const expenceRoutes = require("./routes/expenceRoutes");
app.use("/expence", expenceRoutes);

app.listen(port, () => {
  console.log("Server starded on port ", port);
});
