const express = require("express");
const router = express.Router();


const InController = require("../../controllers/v1/in-controller");


router.post("/", InController.create);
router.get("/", InController.read);
router.patch("/:id", InController.update);
router.get("/:id", InController.find);
router.delete("/:id", InController.delete);

module.exports = router;