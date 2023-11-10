import express from "express";
import userRouter from "./routes/user";
import authRouter from "./routes/auth";
import postRouter from "./routes/post";
import commentRouter from "./routes/comment";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3010;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  return res.send("Hello, ExpressTS!");
});

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.use("/post", postRouter);

app.use("/comment", commentRouter);

app.listen(port, () => {
  console.log(`🚀 Server is listening on port: ${port}`);
});
