const express = require("express");
const { createValidator } = require('express-joi-validation')
const fileController = require('../../controllers/file.controller')
const validators = require('../../validators/file.validation')
const router = express.Router();
const validator = createValidator();

// Get all files
router.get("/", fileController.getAll);

// Route to get a single existing file data
router.get("/:id", fileController.getOne);

router.post("/", validator.body(validators.create), fileController.upload);
module.exports = router;
