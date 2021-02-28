const mongoose=require('mongoose');

const {Schema}=mongoose;
const {Types:{ObjectId}}=Schema;

const cheerSchema=new Schema({
    fromId:{
        type:ObjectId,
        required:true,
        ref:'User'
    },
    toId:{
        type:ObjectId,
        required:true,
        ref:'User'    
    },
    message:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date
    }

});

module.exports=mongoose.model('Cheer',cheerSchema);