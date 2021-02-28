const express=require('express');
const User=require('../schemas/user');
const Plan=require('../schemas/plan');
const Cheer=require('../schemas/cheer');
const Comment=require('../schemas/comment');
const router=express.Router();


router.get('/comment',async(req,res)=>{
    const comments=await Comment.find();
    res.render('comment.ejs',{comments});
});


router.get('/plan',async(req,res)=>{
    const plans=await Plan.find();
    res.render('plan.ejs',{plans});
});

router.get('/',async(req,res)=>{

    const users=await User.find();
    res.render('user.ejs',{users});
});

router.get('/cheer',async(req,res)=>{
    const cheers=await Cheer.find();
    res.render('cheer.ejs',{cheers});
});

   


module.exports=router;

