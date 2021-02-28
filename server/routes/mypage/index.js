const express=require('express');
const {verify}=require('../middlewares');
var User=require('../../schemas/user');
const router=express.Router();
var Comment=require('../../schemas/comment');


const path=require('path');
const Multer=require('multer');
const {Storage:GCS}=require('@google-cloud/storage') ;
const storage=new GCS();
const {format}=require('util');


const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, 
    },
  });

router.get('/getComment',verify,async(req,res,next)=>{

    var page=req.query.page;
    pate=Number(page);

    try{
        const comments=await Comment.find().skip(page*10).limit(10);
        res.json({success:true,comments:comments,message:'getting comment success'});
    }
    catch(err){
        console.error(err);
        next(err);
    }
});


//후기등록
router.post('/registerComment',verify,multer.single('commentImage'),async(req,res)=>{

    const {comment,title}=req.body;
    const user=await User.findOne({_id:req.user._id});


    if(!req.file){
        await Comment.create({
            displayName:user.displayName,
            profileImage:user.profileImage,
            comment:comment,
            title:title
        });
        return res.json({success:true,message:'register comment success'});
    }

    const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
    const blob = bucket.file('comment'+req.user._id+path.extname(req.file.originalname));
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
        next(err);
    });

    blobStream.on("finish", async() => {
        const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);

        await Comment.create({
            displayName:user.displayName,
            profileImage:user.profileImage,
            comment:comment,
            title:title,
            commentImage:publicUrl
        });
        res.json({success:true,message:'register comment success'});
    });
    blobStream.end(req.file.buffer);
});
   
//사진 수정
router.post('/updatePic',verify,multer.single('profileImage'),(req,res)=>{

    const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
    const blob = bucket.file(req.user._id+path.extname(req.file.originalname));
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
        next(err);
    });

    blobStream.on("finish", async() => {
        const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);

        const user=await User.findOne({_id:req.user._id});
        user.profileImage=publicUrl;
        user.save();

        res.json({success:true,message:'update pic success'});
    });
    blobStream.end(req.file.buffer);
 
});














module.exports=router;