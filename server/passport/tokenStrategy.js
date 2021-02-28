const User=require('../schemas/user');

//token strategy
module.exports=(passport,passportJWT)=>{

    const{Strategy,ExtractJwt}=passportJWT;

    passport.use(new Strategy({
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey:process.env.JWT_SECRET
    },
        async(payload,done)=>{
            console.log(payload);
            try{
                const user=await User.findOne({_id:payload._id});
                if(!user){  
                    done(null,false);
                }
                done(null,user);
            }
            catch(err){
                console.log(err);
                done(err);
            }
        }));
}