import express from "express";
import session from "express-session";
import { createClient } from "redis";
import RedisStore from "connect-redis";
import axios from "axios";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;

const redisClient = createClient({ url: "redis://localhost:6379" });
redisClient.connect().catch(console.error);
const redisStore = new RedisStore({
  client: redisClient,
});

app.use(express.json());
app.use(
  session({
    session: redisStore,
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24, secure: false },
  })
);

app.get("/", (req, res) => {
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

    if (user === undefined) {
      return res.send("This user does not exist");
    } else if (user.password !== password) {
      return res.send("Wrong password");
    } else {
      return res.send("Login is successfull");
    }
  } catch {
    console.log("There was an error");
    return res.send("Error");
  }
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  let response = await axios.get(`http://localhost:8080/users?email=${email}`);
  let user = response.data[0];
  if (user !== undefined) {
    return res.send("This user already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const data = {
    email: email,
    password: hashedPassword,
  };
  response = await axios.post(`http://localhost:8080/users`, data);
  console.log(response.data);
  res.send("register");
});

app.listen(port, () => {
  console.log(`App is listening port ${port}`);
});
