import { Router } from "express";
import bookService from "../services/book.service.js";

const router = Router();

router.get("/", async (req, res) => {
  const { author, title } = req.query;

  if (author) {
    const books = await bookService.getBookByAuthor(author);
    return res.json({ bookByAuthor: books });
  } else if (title) {
    const books = await bookService.getBookByTitle(title);
    return res.json({ bookByTitle: books });
  } else {
    const books = await bookService.getBooks();
    return res.json({ books });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const books = await bookService.getBooks();
  const book = books[id];

  if (book) {
    return res.json(book);
  }

  return res.status(404).json({ error: "Book not found" });
});

router.get("/:id/review", async (req, res) => {
  const { id } = req.params;
  const bookReview = await bookService.getBookReview(id);
  return res.json(bookReview);
});

export default router;
