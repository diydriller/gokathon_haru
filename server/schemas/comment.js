const mongoose=require('mongoose');

const {Schema}=mongoose;
const {Types:{ObjectId}}=Schema;

const commentSchema=new Schema({
    displayName:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    commentImage:{
        type:String
    },
    profileImage:{
        type:String,
        required:false,
        default:'https://storage.googleapis.com/evenshunshine/default.png'
    }

});

module.exports=mongoose.model('Comment',commentSchema);