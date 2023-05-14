const { Router } = require("express");
const router = Router();
const { userControllers } = require("../controllers/user.controllers");

router.get("/user", userControllers.getAllUsers);
router.post("/user", userControllers.addUser);
router.post("/login", userControllers.login);

module.exports = router;
