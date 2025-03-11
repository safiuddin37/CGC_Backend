// // console.log("welcome to backend");
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
const http = require("http");
// console.log(http)
const server = http.createServer((req, res) => {
  if (req.url.includes("welcome")) {
    res.statusCode = 200;
    res.write("Welcome to the server");
  } else if (req.url.includes("books")) {
    res.statusCode = 200;
    b = req.url.split("/");
    bookid = parseInt(b[b.length - 1]);
    if (req.url.includes(bookid)) {
      let selectedbook = books.filter((val) => {
        if (val.id === bookid) {
          return val;
        }
      });
      if (selectedbook.length > 0) {
        res.write(JSON.stringify(selectedbook));
      } else {
        res.write("book not found!");
        res.statusCode = 404;
      }
    }
  } else {
    res.statusCode = 404;
    res.write("Not Found");
  }
  res.end();
});
server.listen(5000, () => {
  console.log("server is UP!!!");
});
// let str="bat"
// if(str.includes("b")){
//     if(str.includes("a")){
//         console.log("a found")
//     }
// }
// console.log(selectedbook);
