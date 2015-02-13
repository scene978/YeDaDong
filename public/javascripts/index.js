$(document).ready(function() {

	$('#signin_submit').click(function() {
		var userID = $('#signin_email').val();
		var userPwd = $('#signin_password').val();
		var userName = $('#signin_name').val();
		var userPwd_confirm = $('#password_confirm').val();

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
