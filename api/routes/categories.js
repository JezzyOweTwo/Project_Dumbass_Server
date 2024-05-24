const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const gh = require("../genericHandler.js");
const checkAuth = require('../middleware/check-auth.js');

// returns an object of containing all categories in the DB.
router.get("/",gh.getHandler(Category));

// returns an object of containing all categories in the DB.
router.get("/:ID",gh.getHandler(Category));

// adds a category to the DB.
router.post("/", checkAuth, gh.postHandler(Category));

// delete all
router.delete("/",checkAuth,gh.deleteHandler(Category));

// delete specific ID
router.delete("/:ID",checkAuth,gh.deleteHandler(Category));

// updates the data of a specific user in the DB
router.patch("/:ID",checkAuth,gh.patchHandler(Category));

module.exports = router; 