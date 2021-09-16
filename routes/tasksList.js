const express = require("express");

const tasksList = require("../controllers/tasksList");

const router = express.Router();

router.get("/:name", tasksList.getList);
router.get("/", tasksList.getLists);
router.post("/", tasksList.postList);
router.put("/", tasksList.putList);
router.delete("/:id", tasksList.deleteList);
router.use((request, response) => response.status(404).end());

module.exports = router;
