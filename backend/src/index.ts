import { NextFunction, Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import cors from "cors";
import crypto from "crypto";
import express from "express";
import jwt from "jsonwebtoken";

require("dotenv").config();

interface CustomRequest extends Request {
  user?: any;
}

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

//Middleware
const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: true, message: "Unauthorized" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN as string);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(403).json({ error: true, message: "Invalid token" });
  }
};

//User
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "true", message: "Username and password required" });
  }

  try {
    const saltrounds = 10;
    const hashedPass = await bcrypt.hash(password, saltrounds);

    await prisma.user.create({
      data: { username, password: hashedPass },
    });
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send("Oops, something went wrong");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "true", message: "Username and password required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      return res
        .status(400)
        .send({ error: "true", message: "Invalid username!" });
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res
        .status(400)
        .send({ error: "true", message: "Wrong password!" });
    }
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_TOKEN as string,
      { expiresIn: "1h" }
    );
    res.json({ token, user: { userId: user.id, username: user.username } });
  } catch (error) {
    res.status(500).send("Oops, something went wrong");
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("jwt_token");
  res.status(200).send({ message: "User logged out successfully" });
});

app.get("/books", authenticateToken, async (req: CustomRequest, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(400).send({ error: true, message: "User ID not found" });
  }

  try {
    const books = await prisma.book.findMany({
      where: { userId: userId },
    });
    res.json({ error: false, message: "ok", data: books });
  } catch (error) {
    console.error(error);
    res.status(500).send("Oops, something went wrong");
  }
});

app.post("/books", authenticateToken, async (req: CustomRequest, res) => {
  const { title, desc, price, cover } = req.body;
  const userId = req.user.userId;
  if (!title || !desc || !price || !cover) {
    return res
      .status(400)
      .send({ error: "true", message: "All fields required" });
  }
  try {
    await prisma.book.create({
      data: { title, desc, price, cover, userId },
    });
    res.json({ error: "false", message: "ok" });
  } catch (error) {
    res.status(500).send("Oops, something went wrong");
  }
});

app.put("/books", authenticateToken, async (req: CustomRequest, res) => {
  const { title, desc, price, cover, bookId } = req.body;
  const userId = req.user.userId;

  if (!title || !desc || !price || !cover) {
    return res
      .status(400)
      .send({ error: "true", message: "All fields required!" });
  }

  try {
    await prisma.book.update({
      where: {
        id: bookId,
        userId: userId,
      },

      data: { title, desc, price, cover },
    });
    res.json({ error: "false", message: "ok" });
  } catch (error) {
    res.status(500).send("Oops, something went wrong");
  }
});

app.delete("/books", authenticateToken, async (req: CustomRequest, res) => {
  const userId = req.user.userId;
  const { bookId } = req.body;

  try {
    await prisma.book.delete({
      where: {
        id: bookId,
        userId: userId,
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
