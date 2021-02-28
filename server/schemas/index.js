const mongoose=require('mongoose');

module.exports=()=>{
    const connect=()=>{
            
        mongoose.connect(process.env.MONGO_URI,{
            dbName:'haru',
            useNewUrlParser:true,
            useUnifiedTopology:true
        },(err)=>{
            if(err) console.log('mongodb connection error',err);
            else console.log('mongodb connection success');
        });
    };

    connect();
    mongoose.connection.on('error',err=>{
        console.log('mongodb connection error',err);
    });

    mongoose.connection.on('disconnected',()=>{
        console.log('mongodb disconnected');
    });
}