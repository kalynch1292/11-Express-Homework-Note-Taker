var express = require("express");
const path = require("path")
const fs = require("fs")

var app = express();

var PORT = process.env.PORT ? process.env.PORT : 3000;
// var home = require("../db/db.json")
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//ap.post
//app.get

var notes = [];


app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./notes.html"));
});

app.get("/api/notes", function(req, res) {
  var notes = JSON.parse(fs.readFileSync(".?db/db.json", "utf8"))
  res.json(notes[Number(req.params.id)])
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
}) 


app.post("/api/notes", function (req, res) {
    var notesSaved = JSON.parse(fs.readFileSync(""./db/db.json", "utf8"));
    var noteName= req.body;
    var ID = (notesSaved.length).tostring();
    noteName.id = ID;
    notesSaved.push(noteName);
    fs.writeFileSync("./db/db.json", JSON.stringify(notesSaved));
    res.json(notesSaved)
  }

)
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

// app.post("/api/clear", function (req, res)) {
//     tableData.splice
//     res.json({success})
// }