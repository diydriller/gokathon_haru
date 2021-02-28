const local=require('./localStrategy');
const token=require('./tokenStrategy');



module.exports=(passport,passportJWT)=>{
    local(passport);
    token(passport,passportJWT);
}