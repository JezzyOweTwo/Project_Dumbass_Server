const requiredFields=new Map(); // this holds a hashmap of each required field for each schema.
const mongoose = require('mongoose');

const postHandler = (model) => { return async (req,res) => {
        // if this schema isn't in the requiredFields map already, it will be added.
        if (!(requiredFields.get(model))){
            const schemaPaths = model.schema.paths;
            const keys = Object.keys(schemaPaths).filter(index=>schemaPaths[index].isRequired);
            requiredFields.set(model,keys);
        }
        const rf = requiredFields.get(model);
        // missing field check
        for (index in rf){ if (!Object.keys(req.body).includes(rf[index])) return res.status(400).json({message:rf[index]+" is required!"});}

        try{
            const createdmodel = new model(req.body);
            createdmodel._id = new mongoose.Types.ObjectId();   
            const savedModel = await createdmodel.save();
            let returnMessage = {
                message: "Somehow, this worked.",
                createdProdcut: savedModel
            }
            if (req.token){returnMessage.token = req.token;}
            return res.status(201).json(returnMessage);
        } 
        catch (err){errorLogger(err,res);}
    }
}

const getHandler = (model) => { return async (req,res) => {
        const ID = req.params.ID;
        try{
            const result = (!ID) ? await model.find():await model.findById(ID);
            res.status(200).json({
                message:"Sucessful! Here's your data, lol",
                response: result
            });
        }   catch(err){errorLogger(err,res);}
    }
}

const deleteHandler = (model) => { return async (req,res) => {
        const ID = req.params.ID;
        try{
            const result = (!ID) ? await model.deleteMany():await model.deleteOne({_id: ID });
            if (result.deletedCount===0) {
                return res.status(404).json({message:"There was no data to delete!"});
            }
            else {
                return res.status(200).json({
                    message:"Sucessful! The following were removed from the database:",
                    response: result
                });
            }
        }   catch(err){errorLogger(err,res);}
    }
}

const patchHandler = (model) => { return async (req,res) => {
        const ID = req.params.ID;
        try {
            const result = await model.findByIdAndUpdate(ID,req.body,{new:true});  
            res.status(200).json({message:"Sucessfully updated "+ID+"!"});
        } catch(err){errorLogger(err,res);}
    }
}

function errorLogger(err,res){
    console.log(err);
    if (err.code=== 11000) return res.status(400).json({message:"non-unique field present in body!"});
    return res.status(500).json({message: "TBH, I'M not even sure WTF went wrong."})
}

module.exports = {patchHandler,postHandler,getHandler,deleteHandler};