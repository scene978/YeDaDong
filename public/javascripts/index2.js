function login_open(idFirDiv,idSecDiv){                                  //jquery랑 javascript랑 같이 쓰면 안되요!!
	var objDiv = document.getElementById(idFirDiv);
	var objDiv2 = document.getElementById(idSecDiv);

    if(objDiv.style.display=="block")
    	{ objDiv2.style.display = "none"; }
    else{ objDiv.style.display = "block"; objDiv2.style.display = "none"; }
}

function signin_open(idFirDiv,idSecDiv){
	var objDiv = document.getElementById(idFirDiv);
	var objDiv2 = document.getElementById(idSecDiv);

    if(objDiv.style.display==="none" || objDiv.style.display==="" )
    	{ console.log(objDiv.style.display);objDiv.style.display = "block"; objDiv2.style.display = "none"; }
    else{ console.log(objDiv.style.display);objDiv.style.display = "none"; objDiv2.style.display = "block"; }
}