const express = require("express");
let books = [
  {
    id: 1,
    name: "css&html",
    price: 400,
  },
  {
    id: 2,
    name: "java",
    price: 800,
  },
  {
    id: 3,
    name: "python",
    price: 1000,
  },
];
const app = express();
app.listen(5000, () => {
  console.log("server is UP and running!!!");
});
app.use(express.json());
//routing
app.get("/books", (req, res) => {
  res.status(200);
  res.json(books);
});
app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.status(200).json(book);
});
app.get((req, res) => {
  res.status(404).json("URl incorrect");
});
app.post("/books/add", (req, res) => {
  newid = books[books.length - 1].id + 1;
  req.body.id = newid;
  const book = req.body;
  books.push(book);
  res.status(200).json(books);
});
app.put("/books/update", (req, res) => {
  let bookId = req.body.id;
  newbooks = books.map((book) => {
    if (book.id === bookId) {
      book.name = req.body.name;
      book.price = req.body.price;
    }
    return book;
  });
  books = newbooks;
  res.status(200).json(books);
});
app.patch("/books/update", (req, res) => {
  let bookId = req.body.id;
  newbooks = books.map((book) => {
    if (book.id === bookId) {
      book = { ...book, ...req.body };
    }
    return book;
  });
  books = newbooks;
  res.status(200).json(books);
});
app.delete("/books/delete/:id", (req, res) => {
  let { id } = req.params;
  newbook = books.filter((book) => book.id !== parseInt(id));
  books = newbook;
  res.status(200).json(books);
});