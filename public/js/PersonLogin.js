
$(document).ready(function($) {

    var gender ='male';
         $(document).on("click","#optionFemale", function () {
    gender='female';
   // alert("female is selected");
   // alert(gender);
});

                  $(document).on("click","#optionMale", function () {
    gender='male';
    //alert("male is selected");
   // alert(gender);
});

function prsnDetails(name,mobile_no,password,gender)
{

	this.name=name;
	this.mobile_no=mobile_no;
	this.password=password;
	this.gender=gender;
}

$('#signupform').submit(function(){


        
            var password = $("#password").val();
            var confirm_password = $("#confirm_password").val();
            if (password != confirm_password) {
                alert("Passwords do not match.");
                return false;



            }

           var password_length = $("#password").val().length;
            if (password_length < 8) {
                alert("Password length must be equal or greater than 8 character");
                return false;



            }
           
     




 
    var name=$('#name').val();
    var mobile_no=$('#mobile_no').val();
    var password=$('#password').val();


    //var gender=$('#gender').val();
    var personDetails=new prsnDetails(name,mobile_no,password,gender);
    $.post('/setUsersDetails',personDetails,function (data) {
        console.log(data)
        if(data.msg=="ok")
        {
            alert("person added");
            $('#name').val('');
            $('#mobile_no').val('');
            $('#password').val('');
            $('#confirm_password').val('');
           
        }      
        else
        {
            alert(data.msg);
        }
    });
	return false;});

    $("#form-group .btn-group[role='group'] button").on('click', function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });

/*
$('.btn').click(function () {
    $(this).siblings().removeClass('active'); 
    $(this).addClass('active');
});*/

/*
$(".btn").each(function () {
    $(this).click(function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    });
});*/
$('#loginform').submit(function(){

        var a=new Object();
        a.login_number=$('#login_number').val();
        a.login_password=$('#login_password').val();
                  var mob_no=   $('#login_number').val();
          
           sessionStorage.setItem('mob_no', mob_no);
           
        $.post('/login',a,function (data) {
            console.log(data)
            if(data.msg==='ok')
            {
                window.location.href=data.addr
               
            }
            else{
                alert(data.msg);
            }
});

    });    
});
