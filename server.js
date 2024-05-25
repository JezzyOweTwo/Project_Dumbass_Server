require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const db = mongoose.connection;
const port = process.env.PORT||6969;
const server = express();
const categoryRouter = require('./api/routes/categories');
const userRouter = require('./api/routes/users');
const adminsRouter = require('./api/routes/admins');
mongoose.connect(process.env.DATABASE_URL);             // connects to the database

// middleware
server.use(morgan('dev'));                              // logs requests to console
server.use(cors());
server.use(bodyParser.urlencoded({extended:false}));    // allows for simple url body parsing
server.use(bodyParser.json());                          // allows for simple JSON body parsing

// routes
server.use('/categories',categoryRouter);               // routes video requests to corresponding router
server.use('/user',userRouter);                         // routes video requests to corresponding router
server.use('/admins',adminsRouter);                     // routes video requests to corresponding router

// error handling
server.use((req,res,next)=>{
    const error = new Error('That route don exist, fuckin dumbass nigga');
    res.status(404);
    next(error) // calls the generic error handling method 
});

// generic error handling method 
server.use((error,req,res,next)=> {
    res.status(error.status||500).json(error.message);   // defaults to the error code of the other method, and defaults to 500 if none was present. 
    console.error(error);
})

// database error handling
db.on('error',(error)=>{console.error(error)});
db.once('open',()=>{console.log("---------------------------\nServer sucessfully connected to: "+process.env.DATABASE_URL+"\n-----------------------------")});
server.listen(port, () => { console.log("Server is listening on port: "+ port)});