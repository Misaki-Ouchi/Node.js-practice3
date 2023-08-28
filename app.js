const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

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
      results: result,
    });
  });
});

app.post("/", (req, res) => {
  console.log(req.params.id);
  con.query(
    "INSERT INTO results(name, furigana, gender, email, address, tel, reasonForVisit, inquiry) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      req.body.name,
      req.body.furigana,
      req.body.gender,
      req.body.email,
      req.body.address,
      req.body.tel,
      req.body.reasonForVisit,
      req.body.inquiry,
    ],
    function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.redirect("/");
    }
  );
});

app.get("/create", (req, res) => {
  res.sendFile(path.join(__dirname, "html/form.html"));
});

app.post("/message", (req, res) => {
  res.sendFile(path.join(__dirname, "html/thanksPage.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
