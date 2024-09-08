import express from "express";
import session from "express-session";
import { createClient } from "redis";
import RedisStore from "connect-redis";

const app = express();
const port = 3000;

const redisClient = createClient({ url: "redis://localhost:31000" });
redisClient.connect().catch(console.error);
const redisStore = new RedisStore({
  client: redisClient,
});

app.use(bodyParser.urlencoded({ extended: false }));
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

app.listen(port, () => {
  console.log(`App is listening port ${port}`);
});
