const mongoose=require('mongoose');

const {Schema}=mongoose;
const {Types:{ObjectId}}=Schema;

const planSchema=new Schema({
    userId:{
        type:ObjectId,
        required:true,
        ref:'User'
    },
    isFinished:{
        type:Boolean,
        required:false,
        default:false
    },
    title:{
        type:String,
        required:false
    },
    isLocked:{
        type:Boolean,
        required:false,
        default:false
    },
    createdAt:{
        type:Date,
        required:true
    },
    likePeople:[{
        type:ObjectId,
        required:false,
        ref:'User'
    }]
});

module.exports=mongoose.model('Plan',planSchema);