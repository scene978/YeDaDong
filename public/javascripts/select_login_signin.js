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

/*
<a href="#" onclick="login_open('login_form','signin_form'); return false;"><button id="btn1">LOG IN</button></a>
<a href="#" onclick="signin_open('signin_form','login_form'); return false;"><button id="btn2">SIGN IN</button></a>*/