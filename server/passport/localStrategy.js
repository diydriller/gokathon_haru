const LocalStrategy=require('passport-local').Strategy;
const bcrypt=require('bcrypt');
const User=require('../schemas/user');

//login strategy
module.exports=(passport)=>{
    
    passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField:'password'
    },
        async(email,password,done)=>{
            try{
                const user=await User.findOne({email:email});
            
                if(user){
                    const result=await bcrypt.compare(password,user.password);
                    if(result){
                        done(null,user);
                        console.log('로그인 성공')
                    }
                    else{
                        done(null,false);
                        console.log('비밀번호 불일치');
                    }
                }
                else{
                    done(null,false);
                    console.log('회원가입 안되어있음');
                }
            }
            catch(err){
                console.error(err);
                done(err);
            }
        }
    ));
    


}