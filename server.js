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
//routing
app.get("/books", (req, res) => {
  res.status(200);
  res.json(books);
});
// app.use("/books/2",(req, res) => {
//   res.status(200);
//   res.send(books[1]);
// });
// app.use("/books/1",(req, res) => {
//     res.status(200);
//     res.send(books[0]);
//   });
//   app.use("/books/3",(req, res) => {
//     res.status(200);
//     res.send(books[2]);
//   });
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
