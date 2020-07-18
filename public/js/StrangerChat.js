
$(document).ready(function($) {
	var messagesList = $("#messagesList");
var to;
var socket = new io();
socket.emit('whatsmyid');
socket.emit('findpartner');
socket.on('partner',(message)=>{
	 $("label[for='myalue']").html("Connected");
	to = message.id;
	console.log('friend id = '+to);
});
socket.on('newmsg',(msg)=>{
	console.log(msg.msg);
	messagesList.append($('<li>').text("Stranger : " +msg.msg));

})
socket.on('myid',(msg)=>{
	console.log('my id = '+msg);
})
socket.on('partnerdisconnect',()=>{
	 $("label[for='myalue']").html("Connecting....");
	//alert(' your partner disconnected');
	window.location.reload();
})


$('#sendmsg').click(()=>{

	var text = $('#msg').val().trim();
		console.log(text);
messagesList.append($('<li>').text("me : " +text));
	if(text){
		socket.emit('newmsg',{
			to : to,
			msg : text
		})
	}
	$('#msg').val("");
})

$('#refresh').click(()=>{
	window.location.reload();
});

});

