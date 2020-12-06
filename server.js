var express = require("express");
const path = require("path")
const fs = require("fs")
let notesExisting = require("./db/db.json")
var app = express();

var PORT = process.env.PORT ? process.env.PORT : 3000;
// var home = require("../db/db.json")
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//ap.post
//app.get

var notes = [];


app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {

  res.json(notesExisting)
});



app.post("/api/notes", function (req, res) {
  // var notesExisting = JSON.parse(fs.readFileSync("./db/db.json","utf8"));
  var noteName = req.body;
  var ID
  if (notesExisting.length) {
    ID = notesExisting[notesExisting.length - 1].id + 1
  } else {
    ID = 1
  }
  noteName.id = ID;

  notesExisting.push(noteName);

  fs.writeFile("./db/db.json", JSON.stringify(notesExisting), err => {
    if (err) {
      console.log(err)
    }
    console.log("bob ross")
    res.sendStatus(200);
  });
}
)
app.delete("/api/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  notesExisting = notesExisting.filter(note=>note.id !== id)
  fs.writeFile("./db/db.json", JSON.stringify(notesExisting), err => {
    if (err) {
      console.log(err)
    }
    res.sendStatus(200);
  });
})
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
})
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

// app.post("/api/clear", function (req, res)) {
//     tableData.splice
//     res.json({success})
// }