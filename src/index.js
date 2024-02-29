import "dotenv/config";
import "./db";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import appleRouter from "./routers/appleRouter";
import noticeRouter from "./routers/noticeRouter";

const corsOptions = {
  origin: [
    "http://localhost:5172",
    "http://localhost:5173",
    "http://localhost:3000",
  ],
};
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));

app.get("/", (req, res) => res.send({ name: "kenJo" }));
app.use("/notice", noticeRouter);
app.use("/apple", appleRouter);

app.get("/people", (req, res) => {
  fetch(
    `https://c.q-net.or.kr/openapi/Ncs1info/ncsinfo.do?type=json&pageNo=1&numOfRows=10&ServiceKey=GfEBGZl/WVWZaww3GJjoLpRrE++wLFKbom/Sth6vxaX+A8qKV6FBHeMZe0zjSNjGSizunxh5Ylj4ZNegI83s9w==`
  )
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data from Neople API" });
    });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
