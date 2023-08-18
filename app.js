const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const port = 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");

const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "questionnaire_db",
});

// cssファイルの取得
app.use(express.static("assets"));

// mysqlからデータを持ってくる
app.get("/", (req, res) => {
  const sql = "select * from results";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render("index", {
      users: result
    });
  });
});

app.post("/message", (req, res) => {
  const sql = "INSERT INTO results SET ?";
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

app.get("/create", (req, res) => {
  res.sendFile(path.join(__dirname, "html/form.html"));
});

app.post("/message", (req, res) => {
  res.sendFile(path.join(__dirname, "html/thanksPage.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
