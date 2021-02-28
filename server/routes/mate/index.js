const express=require('express');
const {verify}=require('../middlewares');
var User=require('../../schemas/user');
var Plan=require('../../schemas/plan');
var Cheer=require('../../schemas/cheer');
var mongoose = require('mongoose')
const router=express.Router();




//받은 응원 가져오기
router.get('/getCheer',verify,async(req,res,next)=>{

    var page=Number(req.query.page);

    try{
        var date = new Date(), year = date.getFullYear(), month = date.getMonth(),day=date.getDate();
        const cheers=await Cheer.find({
            toId:req.user._id,
            createdAt:new Date(year,month,day+1)
        }).skip(page*10).limit(10);

        var cheerMate=[];
        for(var _ of cheers){
            var ob={};
            const userId=_.fromId;
            const user=await User.findOne({_id:userId});
            ob.cheer=_.message;
            ob.displayName=user.displayName;
            ob.profileImage=user.profileImage;
            cheerMate.push(ob);
        }

        res.json({success:true,cheerMate:cheerMate,message:'cheer getting success'});

    }
    catch(err){
        console.error(err);
        next(err);
    }
});





//응원 보내기
router.post('/registerCheer',verify,async(req,res,next)=>{
    
    const message=req.body.message;

    const userId=mongoose.mongo.ObjectId(userId);

    

    try{
        var date = new Date(), year = date.getFullYear(), month = date.getMonth(),day=date.getDate();

        
        await Cheer.create({
            fromId:mongoose.mongo.ObjectId(req.user._id),
            toId:userId,message:message,
            createdAt:new Date(year,month,day+1)
        });
        return res.json({success:true,message:'cheear submiting success'});
    }
    catch(err){
        console.error(err);
        next(err);
    }
});


//follow한 사람들의 plan가져오기
router.post('/getMatePlan',verify,async(req,res,next)=>{

    const page=Number(req.query.page);  
    const userId=mongoose.mongo.ObjectId(req.body.userId);

    try{
        var date = new Date(), year = date.getFullYear(), month = date.getMonth(),day=date.getDate();
        
        const plans=await Plan.find({
            userId:userId,
            createdAt:new Date(year,month,day+1)
        }).skip(page*10).limit(10);

        res.json({success:true,mate:plans});
    }
    catch(err){
        console.error(err);
        next(err);
    }
});


//follow한 mate가져오기
router.get('/getMate',verify,async(req,res,next)=>{


    try{
        const follow=await User.findOne({_id:mongoose.mongo.ObjectId(req.user._id)})
        .select('followingPeople');
    
        var mate=[];

        for(var _ of follow.followingPeople){
            const tmp2=await User.findOne({_id:_._id})
            .select('_id displayName profileImage');
            mate.push(tmp2);
        }

        res.json({success:true,mate:mate,message:'mate getting success'});
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

//follow하기
router.post('/follow',verify,async (req,res,next)=>{
    const myId=mongoose.mongo.ObjectId(req.user._id);
    const userId=mongoose.mongo.ObjectID(userId);

    try{
       
        const yourId=userId;
        
        const exist=await User.findOne({_id:yourId});
        if(!exist) res.json({success:false,message:'user not found'});

        
        const me=await User.findOne({_id:myId});
        if(!me.followingPeople.includes(yourId)){
            me.followingPeople.push(yourId);
        }
        me.save();

        const you=await User.findOne({_id:yourId});
        if(!you.followedPeople.includes(myId)){
            you.followedPeople.push(myId);
        }
        you.save();

        res.json({success:true,message:'follow success'});
        
        
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

//unfollow하기
router.post('/unfollow',verify,async (req,res,next)=>{

    const myId=mongoose.mongo.ObjectId(req.user._id);
    const userId=mongoose.mongo.ObjectID(userId);

    const yourId=userId;


    try{
        

        const exist=await User.findOne({_id:yourId});
        if(!exist) res.json({success:false,message:'user not found'});

        const me=await User.findOne({_id:myId});
        const yourIdx=me.followingPeople.indexOf(yourId);
        if(yourIdx!=-1) me.followingPeople.splice(yourIdx,1); 
        me.save();

        const you=await User.findOne({_id:yourId});
        const myIdx=you.followedPeople.indexOf(myId);
        if(myIdx!=-1) you.followedPeople.splice(myIdx,1); 
        you.save();
        
        res.json({success:true,message:'unfollow success'});
    }
    catch(err){
        console.error(err);
        next(err);
    }
});






module.exports=router;