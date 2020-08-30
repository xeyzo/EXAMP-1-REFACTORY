const express = require("express");
const router = express.Router();


const UsersController = require("../../controllers/v1/user-controller");


router.post("/", UsersController.create);
router.get("/", UsersController.read);
router.patch("/:id", UsersController.update);
router.get("/:id", UsersController.find);
router.delete("/:id", UsersController.delete);

module.exports = router;