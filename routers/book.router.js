import { Router } from "express";
import bookService from "../services/book.service.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  bookService
    .getBooks()
    .then((books) => {
      const book = books[id];

      if (book) {
        return res.json(book);
      }

      return res.status(404).json({ error: "Book not found" });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.get("/:id/review", async (req, res) => {
  const { id } = req.params;
  const bookReview = await bookService.getBookReview(id);
  return res.json(bookReview);
});

router.post("/:id/review", AuthMiddleware, async (req, res) => {
  const { id } = req.params;
  const { review } = req.body;

  if (review) {
    try {
      await bookService.addBookReview(id, {
        userId: req.userId,
        review,
      });
      return res.json({
        message: `The review for the book with ISBN ${id} has been added/updated`,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(404).json({ error: "Review not found" });
  }
});

router.delete("/:id/review", AuthMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await bookService.deleteBookReview(id, req.userId);
    return res.json({
      message: `Reviews for the book with ISBN ${id} posted by the user test deleted`,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
