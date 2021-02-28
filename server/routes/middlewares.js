const passport=require('passport');


exports.verify=(req,res,next)=>{
    passport.authenticate("jwt",{session:false})(req,res,next);
};


exports.calDist=(lat1,lat2,long1,long2)=>{
    var result=0;
    var lat=111;
    var long=88.8;
    result=Math.sqrt(Math.pow(Math.abs(lat1-lat2),2)
    +Math.pow(Math.abs(long1-long2),2))*1000;
    
    return result.toFixed(2);
}