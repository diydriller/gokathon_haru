const mongoose=require('mongoose');

const {Schema}=mongoose;
const {Types:{ObjectId}}=Schema;

const userSchema=new Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:false
    },
    displayName:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        required:false,
        default:'https://storage.googleapis.com/evenshunshine/default.png'
    },
    followingPeople:[{
        type:ObjectId,
        ref:'User'
    }],
    followedPeople:[{
        type:ObjectId,
        ref:'User'
    }],
    position:{
        type:[Number],
    }
});

module.exports=mongoose.model('User',userSchema);