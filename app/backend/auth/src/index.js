import express from "express";
import session from "express-session";
import axios from "axios";
import bcrypt from "bcrypt";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

const mongoString = "mongodb://localhost:27017/test";
mongoose.connect(mongoString);
const db = mongoose.connection;

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 1, secure: false },
    store: MongoStore.create({ mongoUrl: mongoString }),
  })
);

const requireAuth = (req, res, next) => {
  if (req.session.userId) {
    console.log(req.session.userId);
    next();
  } else {
    res.send("Please login");
  }
};

app.get("/", requireAuth, (req, res) => {
  console.log("Hello world");
  res.send("Hello world");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password is required");
  }
  try {
    const response = await axios.get(`http://localhost:8080/users?email=${email}`);
    let user = response.data[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.send("Invalid email or password");
    }
    req.session.userId = user.id;
    return res.json({ sessionId: req.sessionID });
  } catch {
    console.log("There was an error");
    return res.send("Error");
  }
});

app.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).send("Email, name and password are required");
  }

  const nameQuery = `name=${encodeURIComponent(name)}`;
  const emailQuery = `email=${encodeURIComponent(email)}`;

  try {
    const nameResponse = await axios.get(`http://localhost:8080/users?${nameQuery}`);
    const emailResponse = await axios.get(`http://localhost:8080/users?${emailQuery}`);

    if (emailResponse.data) {
      return res.send("This email has been registered");
    }
    if (nameResponse.data[0]) {
      return res.send("This name has been registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email: email,
      name: name,
      password: hashedPassword,
    };
    const createUserResponse = await axios.post(`http://localhost:8080/users`, newUser);
    return res.status(201).send(createUserResponse.data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Unable to log out");
    }
    res.clearCookie("connect.sid");
    return res.send("Logged out successfully");
  });
});

app.listen(port, () => {
  console.log(`App is listening port ${port}`);
});
