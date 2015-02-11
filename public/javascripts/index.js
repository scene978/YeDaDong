    $(document).ready(function(){

       // $.ajax({
       //    url: '/'
       //    ,type:"get"
       //    ,success: function(data){
       //      console.log("connect");
       //    }
       //    ,error: function(req,state,err){
       //      console.log("err");
       //    }
       //  });


        $('#submit').click(function(){
            var userID = $('#login_email').val();
            var userPwd = $('#login_password').val();

            if ( (userID == "") || (userPwd == "") ) {
                alert("Insert Your Information!");
            } else {

                var json = {};
                json["email"]  =  userID;
                json["password"] =  userPwd;

                $.ajax({
                    type:'post',
                    url:'/login',
                    data:json,
                    success:function(result) {
                      console.log(result.status);
                        if ( result.status == "FAIL" ) {
                            alert('nononononono ㅗ');
                        } else if ( result.status == "SUCCESS" ) {
                          console.log('gooddddddddddd!');
                          //window.location.href="/views/login success.html";
                          //$(location).attr('href', 'views/login success.html'); //move page
                        }
                    }
                });
            }
        });
    });


function login_open(idFirDiv,idSecDiv){
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

