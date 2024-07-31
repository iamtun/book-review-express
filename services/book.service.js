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
      return bookData[id].review;
    } catch (error) {
      return {};
    }
  }

  async addBookReview(id, data) {
    const books = await this.getBooks();

    if (books[id]) {
      const { userId, review } = data;
      books[id].review[userId] = review;
      await writeJsonFile(fileBookPath, books);
    } else {
      throw new Error("Book not found");
    }
  }

  async deleteBookReview(id, userId) {
    const books = await this.getBooks();

    if (books[id]) {
      delete books[id].review[userId];
      await writeJsonFile(fileBookPath, books);
    } else {
      throw new Error("Book not found");
    }
  }
}

const bookService = new BookService();
export default bookService;
