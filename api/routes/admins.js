const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const gh = require("../genericHandler.js");
const checkAuth = require('../middleware/check-auth.js');
const jwt = require('jsonwebtoken');

router.post("/", checkAuth,(req,res,next)=>{
    const payload = {
        username: req.body.username,
        password: req.body.password
    }
    req.token = jwt.sign(payload, process.env.JWT_KEY);
    next();
}, gh.postHandler(Admin));

// delete all
router.delete("/",checkAuth,gh.deleteHandler(Admin));

// delete specific ID
router.delete("/:ID",checkAuth,gh.deleteHandler(Admin));

// updates the data of a specific user in the DB
router.patch("/:ID",checkAuth,gh.patchHandler(Admin));

module.exports = router; 