const Book = require("../models/Book");
const Author = require("../models/Author");

const createAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json({
      success: true,
      message: "Author created successfully",
      data: author,
    });
  } catch (e) {
    console.log("error", e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while creating the author",
    });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, description, author } = req.body;

    const existingAuthor = await Author.findById(author);
    if (!existingAuthor) {
      return res.status(404).json({
        success: false,
        message: "Author not found",
      });
    }

    const book = new Book({ title, description, author });
    await book.save();

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (e) {
    console.log("error", e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while creating the book",
    });
  }
};

const getBookWithAuthor = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author");

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while fetching the book",
    });
  }
};

module.exports = {
  createAuthor,
  createBook,
  getBookWithAuthor,
};
