const express = require("express");
const UsersController = require("../controllers/Userscontroller");
const AuthentificationController = require("../controllers/AuthentificationController");
const { authenticateToken } = require("../middlewares/Auth");
const router = express.Router();

router.get("/users", UsersController.index); //GET /users
router.post("/users", UsersController.store); //POST /users
router.post("/login", AuthentificationController.login);
router.get(
  "/getMyProfile",
  authenticateToken,
  AuthentificationController.getMyProfile
);

module.exports = router;
