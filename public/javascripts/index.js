$(document).ready(function() {

	$('#submitSignin').click(function() {
		var userID = $('#IDSignin').val();
		var userPwd = $('#pwdSignin').val();
		var userName = $('#nameSignin').val();
		var userPwd_confirm = $('#pwd_confirmSignin').val();

		if (((userID == "") || (userPwd == "")) || (userName == "")) {
			alert("Insert All Information!!!");
		} else {
			if (userPwd == userPwd_confirm) {
				var json = {};
				json["email"] = userID;
				json["password"] = userPwd;
				json["userName"] = userName;

				$.ajax({
					type : 'post',
					url : '/signin',
					data : json,
					success : function(result) {
						if (result.status == "FAIL") {
							alert('This id already used');
						} else if (result.status == "SUCCESS") {
							alert('sign in success');
						}
					}
				});
			} else {
				alert('confirm password not match');
			}
		}
	});

	$('#submitLogin').click(function() {

		var userID = $('#IDLogin').val();
		var userPwd = $('#pwdLogin').val();

		if ((userID == "") || (userPwd == "")) {
			alert("Insert Your Information!");
		} else {
			var json = {};
			json["email"] = userID;
			json["password"] = userPwd;
			console.log("submit");
			$.ajax({
				type : 'post',
				url : '/login',
				data : json,
				success : function(result) {
					if (result.status == "FAIL") {
						alert('nononononono ㅗ');
					} else {
						$(location).attr('href', '/mypage');
						//move page
					}
				}
			});
		}
	});
});
