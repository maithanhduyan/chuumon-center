const express = require("express");
const TableController = require("../controllers/table-controller");

const router = express.Router();
const tableController = new TableController();

router.get("/", tableController.getAll);
router.get("/:id", tableController.getById);
router.post("/", tableController.create);
router.put("/:id", tableController.update);
router.delete("/:id", tableController.delete);

module.exports = router;
