
$(document).ready(function($) {
	var onlinePersonList = $("#onlinePersonList tbody"); 
	var allPersonList = $("#allPersonList");
	var loginUserName = $("#loginUserName");
	var socket = new io();
	var data1;

  $.get('/mobno',(data)=>{
var mob_no =data;
socket.emit('online',{no : data});
	socket.emit('onlineusers',{});
	
socket.on('onlineusers',(msg)=>{
	 onlinePersonList.html('')
	for (let i in msg){
		
		if(i===mob_no){
			continue;
		}
		
		var tr =$('<tr id="'+i+'">');
							
							
							tr.append($('<td>').text(''));
							
							tr.append($('<td>').text(i));
							
						    tr.append($('<a href="/chat/chat/'+i+'">').append($('<td>').text("Start Chatting")));

		
						   onlinePersonList.append(tr);}

						   for(i=0;i<data1.length;i++){
			try{
							document.getElementById(data1[i].mobile_no).childNodes[0].textContent = 	data1[i].name	;
						
							} catch(e){}

						}
	
})
  
	$.get('/getPersons', function(data)

	{
		var PersonCount=data.length;
		var i;
		 data1= data;
		for(i=0;i<PersonCount;i++){
			try{
							document.getElementById(data[i].mobile_no).childNodes[0].textContent = 	data[i].name	;
							} catch(e){}		
		 
         if(data[i].mobile_no == mob_no){
         	 $("label[for='myalue']").html(data[i].name);
         	continue;
         }
//			console.log(mob_no);
//			console.log(data[i].mobile_no);

			/*var ul =$('<ul>');
							
							
							ul.append($('<a href="/chat/chat/'+data[i].mobile_no+'">').append($('<li>').text(data[i].name+"  :  "+data[i].mobile_no)));
							allPersonList.append(ul);*/


							var tr =$('<tr>');
							
							tr.append($('<td>').text(data[i].name));
							
							tr.append($('<td>').text(data[i].mobile_no));

						    tr.append($('<a href="/chat/chat/'+data[i].mobile_no+'">').append($('<td>').text("Start Chatting")));

						   	allPersonList.append(tr);
							

		}

});
});

});
