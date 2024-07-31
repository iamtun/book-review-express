import { fileBookPath } from "../data/index.js";
import { getJsonData } from "../utils/func.js";

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
}

const bookService = new BookService();
export default bookService;
