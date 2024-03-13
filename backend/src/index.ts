import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get("/books", async (req, res) => {
  const books = await prisma.books.findMany();
  res.json({ error: "false", message: "ok", data: books });
});

app.post("/books", async (req, res) => {
  const { title, desc, price, cover } = req.body;
  if (!title || !desc || !price || !cover) {
    return res
      .status(400)
      .send({ error: "true", message: "All fields required" });
  }
  try {
    await prisma.books.create({
      data: { title, desc, price, cover },
    });
    res.json({ error: "false", message: "ok" });
  } catch (error) {
    res.status(500).send("Oops, something went wrong");
  }
});

app.put("/books/:id", async (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, desc, price, cover } = req.body;

  if (!title || !desc || !price || !cover) {
    return res
      .status(400)
      .send({ error: "true", message: "All fields required!" });
  }

  try {
    await prisma.books.update({
      where: {
        id: bookId,
      },
      data: { title, desc, price, cover },
    });
    res.json({ error: "false", message: "ok" });
  } catch (error) {
    res.status(500).send("Oops, something went wrong");
  }
});

app.delete("/books/:id", async (req, res) => {
  const bookId = parseInt(req.params.id);

  try {
    await prisma.books.delete({
      where: {
        id: bookId,
      },
    });
    res.status(204).send({ error: "false", message: "ok" });
  } catch (error) {
    res.status(500).send("Oops, something went wrong");
  }
});

app.listen(5000, () => {
  console.log("Server running on localhost:5000");
});
