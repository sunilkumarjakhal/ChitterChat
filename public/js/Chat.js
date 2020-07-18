
$(document).ready(function($) {
		var to = $('#msgto').val();
	var from = $('#msgfrom').val();
	var messagesList = $('#messagesList')
var to;
var socket = new io();
socket.on('newPmsg',(msg)=>{
	console.log(msg.msg);
	messagesList.append($('<li>').text(to+" : " +msg.msg));
})


socket.emit('isonline',{no : from})
$.get('/chat/history/'+from+'/'+to,function(a,b){
	for(var i in a ){
		if(a[i].from == from){
			messagesList.append($('<li>').text("me : " +a[i].msg));
		}
	 else {
		messagesList.append($('<li>').text(a[i].to+" : " +a[i].msg));
	}}
})


$('#sendmsg').click(()=>{

	var text = $('#msg').val().trim();
/*messagesList.innerHTML = (messagesList.innerHTML+'<li>hello</li>');*/

messagesList.append($('<li>').text("me : " +text));

	if(text){
		socket.emit('newPmsg',{
			to : to,
			from: from,
			msg : text
		})
	}
	$('#msg').val("");
})


});

