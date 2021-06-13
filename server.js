const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const tasksListRoutes = require("./routes/tasksList");
const usersRoutes = require("./routes/users");

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.use("/tasks-list", tasksListRoutes);
server.use("/users", usersRoutes);

server.listen(8000, () => console.log("Server for ToDoApp is started..."));
