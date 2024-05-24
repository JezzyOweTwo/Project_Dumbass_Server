// const express = require('express');
// const router = express.Router();
// const Video = require('../models/video');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'./videos/');
//     },
//     filename: function(req,file,cb){
//         cb(null,new Date().toISOString()+"-"+file.filename)
//     }
// });
// const upload = multer({ 
//     storage:storage,    
//     //limits:{fileSize:process.env.VIDEO_SIZE_LIMIT_BYTES}
// });

// // returns a JSON file of all vids in the DB. requires admin
// router.get("/",(req,res) => {
//     Video.find()
//     .exec()
//     .then((videos)=>{
//         if (videos.length<=0) {res.status(200).json({message:"aint no damn vids in here buddy."})}
//         else res.status(200).json({
//             message: "succesful",
//             videos: videos
//         });
//     })
//     .catch((error)=>{
//         console.error(error)
//         res.status(500).json({message:error})
//     })

// });

// // gets a video from the DB. If vid is private, requires login or admin
// router.get("/:userID",(req,res) => {
//     res.status(200).json({
//         message:'Here ya go!'
//     });
// });

// // deletes all vids in the DB. Requires admin
// router.delete('/',(req,res) =>  {
//     Video.deleteMany({})
//         .exec()
//         .then((videos)=>{
//             if (videos.deletedCount===0 && videos.acknowledged)
//                 res.status(401).json({succesful:"There was no data to remove, lmfao"});
//             else res.status(200).json({succesful:"All users were sucessfully removed!"})
//         })
//         .catch((error)=>{
//             console.error(error); 
//             res.status(500).json(error);
//         })
// });

// // deletes a specific vid in the DB. Requires admin or login
// router.delete("/:userID",(req,res) =>  {
//     res.send({data:"Fuck you in particular."});
// });

// // adds a vid to the DB.
// router.post("/",upload.single('userVideo'),(req,res) => {
//     console.log(req.file);
//     const video = new Video({
//         title:req.body.title,
//         videoPath:req.file.path,
//         isPrivate:req.body.isPrivate,
//         lastUpdatedDate:new Date(),
//         originalUploadDate:new Date(),
//         uploaderID:new mongoose.Types.ObjectId(),
//         _id: new mongoose.Types.ObjectId()
//     });
//     video.save()
//         .then((result) => {
//             res.status(201).json({
//                 sucessful: "Your vids ain't shit nigga.",
//                 createdProdcut: result
//             })
//         })
//         .catch()
// });

// // edit an existing vid in the DB. Requires login
// router.patch("/:userID",(req,res)=>{
//     res.status(201).json({
//         message:'Bitch ass nigga'
//     });
// })

// module.exports = router; 