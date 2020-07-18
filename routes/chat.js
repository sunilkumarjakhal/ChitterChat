module.exports = (server) =>{
	var express = require('express');
var router = express.Router();
var db= {};
require('../routes/db')(db,()=>{});



  var io = require('socket.io').listen(server);
  var userarray = [];
  var allUsers = {};
  groups = [] ;
  io.on('connection',(socket)=>{

	//console.log('new user connected');
	
	socket.on('whatsmyid',()=>{
		userarray.push(socket.id);
	//console.log(userarray);
	socket.emit('myid',socket.id);
	})

	socket.on('disconnect', function () {
                    console.log('user disconnect');

                    if(findKey(allUsers,socket.id) !== -1){
delete allUsers[findKey(allUsers,socket.id)]
	  	io.emit('onlineusers',allUsers);
	  	console.log(allUsers);
                    }
	  	
	 
                    var id = removeFromGroup(socket.id) ;
                    console.log(id);
                    if(id === 'no')
                    {
                    	var index = findIndex(userarray,socket.id)
                   		if(index > -1) {
                   			userarray.splice(index,1);
                   		 }
                    	}else {
                    		io.to(id).emit('partnerdisconnect');
                    	}
                    	//console.log(allUsers);


                });

	  socket.on('findpartner',()=>{
	  	if(userarray.length > 1){
	  		userarray.splice(findIndex(userarray,socket.id),1);
	  		var a = userarray.shift();
	  			if(a !== socket.id){
	  		groups.push({
	  			user1 : a,
	  			user2 : socket.id
	  		});
	  		console.log(groups);
	  		socket.emit('partner',{id : a});
	  		io.to(a).emit('partner',{id : socket.id});
	  	}
	  }

	  });

	  socket.on('newmsg',(msg)=>{
	  	console.log(msg.to);
	  	io.to(msg.to).emit('newmsg',msg);
	  }) 
	   socket.on('newPmsg',(msg)=>{
	  	//console.log(allUsers);
	  	db.db.collection('messages').insertOne(msg,function(err){
	  		if(err){
	  			console.log(err);
	  		} else {
	  			if(allUsers[msg.to]){
	  	io.to(allUsers[msg.to]).emit('newPmsg',msg);
	  }
	  		}
	  	});
	  	
	  }) 
	  	 socket.on('online',(msg)=>{
	  	console.log(allUsers);

  		allUsers[msg.no] = socket.id;
  		io.emit('onlineusers',allUsers);
  			  	console.log(allUsers);
  })
  	 socket.on('isonline',(msg)=>{
	  	 	if(!allUsers[msg.no])
  		{allUsers[msg.no] = socket.id;}
  	io.emit('onlineusers',allUsers);
  	console.log(allUsers);
  })
socket.on('onlineusers',()=>{
	socket.emit('onlineusers',allUsers);
})
  })


  router.get('/chat/:with',function(req,res){
  	res.render('Chat',{to : req.params.with , from : req.user.mobile_no});
  })


router.get('/history/:from/:to',function(req,res){
	db.db.collection('messages').find({ $or: [{from : req.params.from, to : req.params.to}, {to : req.params.from, from : req.params.to}]}).toArray((err,msgs)=>{
		if(err){
			res.json([]);
		} else {
			
		res.json(msgs);
		//	console.log(msgs);
		}
	});
});

  return router;
}
function removeFromGroup(id) {
	for (var i = 0; i < groups.length ; i++) {
console.log(i);
		if(groups[i].user1 === id) {
			var a =groups[i].user2;
			groups.splice(i,1);
			return a;
		}
		else if (groups[i].user2 === id) {
			var a =groups[i].user1;
			groups.splice(i,1);
			return a;
		}

	}
	return 'no';
}

function findKey(arr,val){

	for( var i in arr) {
		if(arr[i]===val){
			return i;
		}
	}
	return -1;
}
function findIndex(arr,val){

	for( let i=0;i<arr.length ;i++) {
		if(arr[i]===val){
			return i;
		}
	}
	return -1;
}