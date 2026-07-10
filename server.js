import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/explain", (req, res) => {
  const { title } = req.body;

  res.json({
    text: `🤖 Simple Explanation:
    Ye news "${title}" ke baare me hai.
    Isko simple me samjho toh ye ek important current event hai jo students ke liye useful hai.`,
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));