import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const port = 3001;

app.use(
  "/auth",
  createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
  })
);

app.listen(port, () => {
  console.log(`App is listening port ${port}`);
});
