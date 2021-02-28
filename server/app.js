const express=require('express');

const cookieParser=require('cookie-parser');
const path=require('path');
const passport=require('passport');
const passportJWT=require('passport-jwt');
const cors=require('cors');
require('dotenv').config();

const socketIO=require('./socket.js'); 
const connect=require('./schemas');
const passportConfig=require('./passport');
const auth=require('./routes/auth');
const admin=require('./routes');
const mate=require('./routes/mate');
const plan=require('./routes/plan');
const mypage=require('./routes/mypage');

const app=express();

//mongodb 연결
connect();

//view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//cors
app.use(cors());

//static
app.use(express.static(path.join(__dirname,'public')));

//body data 해석
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//cookie 해석
app.use(cookieParser());

//passport 초기화
passportConfig(passport,passportJWT);
app.use(passport.initialize());

//router
app.use('/admin',admin);
app.use('/auth',auth);
app.use('/mate',mate);
app.use('/plan',plan);
app.use('/mypage',mypage);

app.use((err,req,res,next)=>{
   if(err) console.log(err);
   if(!err.status){
      res.json({success:false,message:'server error'});
   }
});

const server=app.listen(process.env.PORT||8000,()=>{
   console.log('server is listening'); 
});
// socket 연결
socketIO(server,app);








