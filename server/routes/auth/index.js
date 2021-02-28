const express=require('express');
const passport=require('passport');
const bcrpyt=require('bcrypt');
const jwt=require('jsonwebtoken');

const router=express.Router();
var User=require('../../schemas/user');





// 이메일 중복확인
router.post('/isJoined',async(req,res,next)=>{

    const{email}=req.body;

    try{
        const user=await User.findOne({email:email});
        if(!user){
            res.json({success:true});
        }
        else{
            res.json({success:false,message:'already user exist'});
        }

    }
    catch(err){
        console.error(err);
        next(err);
    }
})


//회원가입
router.post('/join',async(req,res)=>{
    const {email,displayName,password}=req.body;

    const user=await User.findOne({email:email});
    if(user) return res.json({success:false,message:'user already exist'});
    else{
        const hashPassword=await bcrpyt.hash(password,12);
        await User.create({
            email:email,
            displayName:displayName,
            password:hashPassword
        });
        return res.json({success:true,message:'join success'});
    }
  
});

//로그인
router.post('/login',(req,res,next)=>{
   
    passport.authenticate('local',{session:false},(err,user)=>{
        if(err){
            console.log(err);
            next(err);
        }       
        if(!user){
            return res.json({success:false,message:'user not found'});
        }
        return req.login(user,{session:false},(err)=>{
            if(err){
                console.log(err);
                return next(err);
            }
            const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);
           
            return res.json({token:token,success:true});
            
        });
    })(req,res,next);
});



module.exports=router;