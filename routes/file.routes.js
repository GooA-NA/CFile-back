const { Router } = require("express");
const { fileControllers } = require("../controllers/file.controllers");
const router = Router();

router.post('', fileControllers.createDir)
router.post('/upload/:id', fileControllers.uploadFile)
router.post('/getFiles', fileControllers.getFiles)

module.exports = router;
