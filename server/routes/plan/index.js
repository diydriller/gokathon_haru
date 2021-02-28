const express=require('express');

const {verify}=require('../middlewares');
var User=require('../../schemas/user');
var Plan=require('../../schemas/plan');
const mongoose=require('mongoose');
const router=express.Router();


// 오픈 된 플렌들 가져오기
router.get('/getOpen',verify,async(req,res,next)=>{

    const page=Number(req.query.page);


    try{
        var date = new Date(), year = date.getFullYear(), month = date.getMonth(),day=date.getDate();
        const plans=await Plan.find({
            isLocked:false,
            createdAt:new Date(year,month,day+1)
        }).skip(page*10).limit(10);
        res.json({success:true,plans:plans,message:'getting open plan success'});

    }
    catch(err){
        console.error(err);
        next(err);
    }
});

//좋아요한 플랜들 가져오기
router.get('/getLike',verify,async(req,res,next)=>{

    const userId=mongoose.mongo.ObjectId(req.user._id);
    try{
        const plans=await Plan.find({
            likePeople:{
                $elemMatch:{$eq:userId}
            }
        });
        res.json({success:true,plans:plans,message:'getting plan success'});
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

//좋아요 하기
router.post('/registerLike',verify,async(req,res,next)=>{

    const planId=mongoose.mongo.ObjectId(req.body.planId);
    const userId=mongoose.mongo.ObjectId(req.user._id);

    try{
        
        const plan=await Plan.findOneAndUpdate(
            {_id:planId},
            {$push:{likePeople:userId}}
        );

        res.json({success:true,message:'like success'});
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

//좋아요 취소하기
router.post('/cancelLike',verify,async(req,res,next)=>{

    const planId=mongoose.mongo.ObjectId(req.body.planId);
    const userId=mongoose.mongo.ObjectId(req.user._id);

    try{
        
        const plan=await Plan.findOneAndUpdate(
            {_id:planId},
            {$pull:{likePeople:userId}}
        );

        res.json({success:true,message:'cacel like success'});
    }
    catch(err){
        console.error(err);
        next(err);
    }
});


//오늘 이룬 플랜 가져오기
router.get('/todayFinished',verify,async(req,res,next)=>{

    const userId=mongoose.mongo.ObjectId(req.user._id);

    try{
        var date = new Date(), y = date.getFullYear(), m = date.getMonth(),d=date.getDate();
        var t=new Date(y,m,d+1);

        const plans=await Plan.find({
            userId:userId,
            createdAt:t,
            isFinished:true
        });

        res.json({success:true,plans:plans,message:'getting today finished plan success'});

    }
    catch(err){
        console.error(err);
        next(err);
    }
});


// 이번 달 플랜 가져오기
router.get('/getThisMonth',verify,async(req,res,next)=>{

    const userId=mongoose.mongo.ObjectId(req.user._id);

    try{
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);

        const plans=await Plan.find({
            userId:userId,
            createdAt:{
                $gte:firstDay,
                $lte:lastDay
            }
        });

        res.json({success:true,plans:plans,message:'getting this month plan success'});

    }
    catch(err){
        console.error(err);
        next(err);
    }
});



// 오늘 플랜가져오기
router.get('/get',verify,async(req,res,next)=>{


    try{
        var date = new Date(), year = date.getFullYear(), month = date.getMonth(),day=date.getDate();
        const plan=await Plan.find({
            userId:req.user._id,
            createdAt:new Date(year,month,day+1)
        });

        res.json({success:true,plans:plan,message:'getting today plan success'});
    }
    catch(err){
        console.error(err);
        next(err);
    }
});


//플랜 인기순으로 플랜과 사람들 가져오기
router.get('/LikeSort',verify,async(req,res,next)=>{


    const userId=mongoose.mongo.ObjectId(req.user._id);
    const page=Number(req.query.page);

    
    
    try{

        var plans=await Plan.aggregate([
            {$unwind:'$likePeople'},
            {$match:{
                userId:{$eq:userId}
            }},
            {$group:{_id:'$_id',nb:{'$sum':1}}},
            {$sort:{nb:-1}},
            {$skip:page*10},
            {$limit:10},
            {$project:{_id:'$_id'}}
        ]);

        


        var likePlans=[];

        for(var _ in plans){
            var likePlan={};
            var plan=await Plan.findOne({userId:userId});
            likePlan.plan=plan;
            
            var like=[];
            for(var __ of plan.likePeople){
                const user=await User.findOne({_id:__});
                like.push(user);
            }
            likePlan.like=like;

            likePlans.push(likePlan);
        }

        res.json({success:true,likePlans:likePlans,message:'getting most liked myplan success'});
    }
    catch(err){
        console.error(err);
        next(err);
    }
});


// 플랜 등록하기
router.post('/register',verify,async(req,res,next)=>{

    const{title}=req.body;
    const userId=mongoose.mongo.ObjectId(req.user._id);

    try{
        if(!title) res.json({success:false,message:'title is empty'});

        const time=new Date();
        const year=time.getFullYear(),month=time.getMonth(),day=time.getDate();

        const plan=await Plan.create({
            userId:userId,
            title:title,
            createdAt:new Date(year,month,day+1),
            likePeople:[]
        });

        res.json({sucess:true,plan:plan});

    }
    catch(err){
        console.error(err);
        next(err);
    }
});

//플랜 완료 수정
router.post('/updateFinish',verify,async(req,res)=>{
    try{
        const{isFinished}=req.body;
        const planId=mongoose.mongo.ObjectId(req.body.planId);

        const plan=await Plan.findOneAndUpdate(
            {_id:planId},
            {isFinished:isFinished}
        );

        res.json({success:true});
    }
    catch(err){
        console.error(err);
        next(err);
    }
});


//플랜 제목 수정
router.post('/updateTitle',verify,async(req,res)=>{
    try{
        const{title}=req.body;
        const planId=mongoose.mongo.ObjectId(req.body.planId);

        await Plan.findOneAndUpdate(
            {_id:planId},
            {title:title}
        );
        res.json({success:true});

    }
    catch(err){
        console.error(err);
        next(err);
    }
});

//플랜 잠금 수정
router.post('/updateLock',verify,async(req,res)=>{
    try{
        const{isLocked}=req.body;
        const planId=mongoose.mongo.ObjectId(req.body.planId);

        await Plan.findOneAndUpdate(
            {_id:planId},
            {isLocked:isLocked}
        );

        res.json({success:true});

    }
    catch(err){
        console.error(err);
        next(err);
    }

});

//플랜 삭제
router.post('/deletePlan',verify,async(req,res,next)=>{
    try{
        const planId=mongoose.mongo.ObjectId(req.body.planId);
        await Plan.deleteOne({_id:planId});
        res.json({success:true});
    }
    catch(err){
        console.error(err);
        next(err);
    }

});



module.exports=router;