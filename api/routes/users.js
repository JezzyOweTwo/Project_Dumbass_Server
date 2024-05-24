// returns an object of containing all categories in the DB.
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const gh = require("../genericHandler.js");

router.get("/",gh.getHandler(User));

router.get("/:ID",gh.getHandler(User));

router.post("/", gh.postHandler(User));

router.delete("/",gh.deleteHandler(User));

router.delete("/:ID",gh.deleteHandler(User));

router.patch("/:ID",gh.patchHandler(User));

module.exports = router; 