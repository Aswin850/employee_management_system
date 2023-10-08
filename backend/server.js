const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middle-wares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Iceu@1999",
  database: "employee",
});

app.get("/api/get", (err, res) => {
  const sqlGet = "Select * from employee.employeeTable";
  db.query(sqlGet, (err, result) => {
    if (err) {
      console.log("error", err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/post", (req, res) => {
  const { fname, lname, city } = req.body;
  const sqlInsert =
    "INSERT INTO employee.employeeTable (First_Name,Last_Name,City) VALUES (?,?,?)";
  db.query(sqlInsert, [fname, lname, city], (err, result) => {
    if (err) {
      console.log("error", err);
    }
  });
});

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM employee.employeeTable WHERE id = ?";
  db.query(sqlRemove, id, (err, result) => {
    if (err) {
      console.log("error", err);
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "select * from employee.employeeTable WHERE id = ?";
  db.query(sqlGet, id, (err, result) => {
    if (err) {
      console.log("error", err);
    } else {
      res.send(result);
    }
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { fname, lname, city } = req.body;
  const sqlUpdate =
    "UPDATE employee.employeeTable SET First_Name=?,Last_Name=?,City=? WHERE id = ?";
  db.query(sqlUpdate, [fname, lname, city, id], (err, result) => {
    if (err) {
      console.log("error", err);
    }
  });
});

app.post("/employee", (req, res) => {
  const sqlInsert =
    "INSERT INTO employee.employeeTable (First_Name,Last_Name,City) VALUES ('Ashok','Sennippan','BHR')";
  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log("error", err);
    } else {
      console.log("result", result);
      res.json({
        result: result,
      });
    }
  });
});

app.get("*", (req, res) => {
  res.json({
    message: "Invalid request",
  });
});

app.listen(8888, () => {
  console.log("Listening....");
});
