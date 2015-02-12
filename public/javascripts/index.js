    $(document).ready(function(){

      $('#signin_submit').click(function(){
            var userID = $('#signin_email').val();
            var userPwd = $('#signin_password').val();
            var userName = $('#signin_name').val();
            var userPwd_confirm = $('#password_confirm').val();



            if ( ((userID == "") || (userPwd == "")) || (userName == "") ) {
                alert("Insert All Information!!!");
            } else {
                if(userPwd == userPwd_confirm) {
                var json = {};
                json["email"]  =  userID;
                json["password"] =  userPwd;
                json["userName"] =  userName;


                $.ajax({
                    type:'post',
                    url:'/signin',
                    data:json,
                    success:function(result) {
                        if ( result.status == "FAIL" ) {
                            alert('This id already used');
                        } else if ( result.status == "SUCCESS" ) {
                            alert('sign in success');
                        }
                    }
                });
              }
              else {
                alert('confirm password not match');
              }
            }
        });


        $('#login_submit').click(function(){

            var userID = $('#login_email').val();
            var userPwd = $('#login_password').val();

            if ( (userID == "") || (userPwd == "") ) {
                alert("Insert Your Information!");
            } else {
                var json = {};
                json["email"]  =  userID;
                json["password"] =  userPwd;
				console.log("submit");
                $.ajax({
                    type:'post',
                    url:'/login',
                    data:json,
                    success:function(result) {
                        if (result.status == "FAIL") {
                            alert('nononononono ㅗ');
                        } else {
                          $(location).attr('href', '/test'); //move page
                        }
                    }
                });
            }
        });
    });

function login_open(idFirDiv,idSecDiv){                                                             //jquery랑 javascript랑 같이 쓰면 안되요!!
	var objDiv = document.getElementById(idFirDiv);
	var objDiv2 = document.getElementById(idSecDiv);

    if(objDiv.style.display=="block")
    	{ objDiv2.style.display = "none"; }
    else{ objDiv.style.display = "block"; objDiv2.style.display = "none"; }
}

function signin_open(idFirDiv,idSecDiv){
	var objDiv = document.getElementById(idFirDiv);
	var objDiv2 = document.getElementById(idSecDiv);

    if(objDiv.style.display=="none")
    	{ objDiv.style.display = "block"; objDiv2.style.display = "none"; }
    else{ objDiv2.style.display = "none"; }
}

