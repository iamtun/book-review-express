import { fileBookPath } from "../data/index.js";
import { getJsonData, writeJsonFile } from "../utils/func.js";

class BookService {
  constructor() {}

  async getBooks() {
    try {
      const bookData = await getJsonData(fileBookPath);
      return bookData;
    } catch (error) {
      return [];
    }
  }

  async convertBookObjectToArray() {
    const books = await this.getBooks();
    const bookToArray = Object.entries(books).map(([key, value]) => {
      return {
        isbn: key,
        ...value,
      };
    });

    return bookToArray;
  }

  async getBookByAuthor(author) {
    const books = await this.convertBookObjectToArray();
    return books.filter((book) => book.author === author);
  }

  async getBookByTitle(title) {
    const books = await this.convertBookObjectToArray();
    return books.filter((book) => book.title === title);
  }

  async getBookReview(id) {
    try {
      const bookData = await getJsonData(fileBookPath);
      return bookData[id].reviews;
    } catch (error) {
      return {};
    }
  }

  async addBookReview(id, data) {
    const books = await this.getBooks();

    if (books[id]) {
      const { userId, review } = data;
      const reviews = books[id].reviews;

      const idx = reviews.findIndex((review) => review.userId === userId);
      if (idx > -1) {
        reviews[idx].review = review;
      } else {
        reviews.push(data);
      }
      books[id].reviews = reviews;
      await writeJsonFile(fileBookPath, books);
    } else {
      throw new Error("Book not found");
    }
  }

  async deleteBookReview(id, userId) {
    const books = await this.getBooks();

    if (books[id]) {
      const reviews = books[id].reviews;
      books[id].reviews = reviews.filter((review) => review.userId !== userId);
      await writeJsonFile(fileBookPath, books);
    } else {
      throw new Error("Book not found");
    }
  }
}

const bookService = new BookService();
export default bookService;
