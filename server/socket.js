const SocketIO=require('socket.io');
const {verify}=require('./routes/middlewares');
const Plan=require('./schemas/plan');
const User=require('./schemas/user');
const {calDist}=require('./routes/middlewares');
const mongoose=require('mongoose');


module.exports=(server,app)=>{

    
    const io=SocketIO(server,{path:'/socket.io'});
    app.set('io',io);
    const map=io.of('/map');



    map.on('connection',socket=>{
   
            socket.on('position',async(data)=>{

                try{
                  
                    const userId=mongoose.mongo.ObjectId(data._id);

                    const position=[];
                    position.push(data.latitude);
                    position.push(data.longitude);

                    await User.findOneAndUpdate({_id:userId},
                        {position:position});
                    

                    var users=await User.find({position:{'$near':position}}).limit(10);
                    
                    
                    var posUser=[];
                    for(var _ of users){
                        var ob={};
                        const id=_._id;
                        const plan=await Plan.find({userId:id});
                        ob.displayName=_.displayName;
                        ob.profileImage=_.profileImage;
                        ob.planArray=plan;
                        ob.userId=id;
                        ob.region=_.position;

                        const follow=await User.findOne({
                            _id:userId,
                            followings:{
                                $elemMatch:{$eq:id}
                            }
                        });
                        if(follow) ob.isFollowing=true;
                        else ob.isFollowing=false;
                        posUser.push(ob);
                    }

                    io.of('map').emit('user',posUser);
                }
                catch(err){
                    console.error(err);
                }
                
            });
        
    });
 
}