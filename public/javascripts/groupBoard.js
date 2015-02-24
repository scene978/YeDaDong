$(document).ready(function() {

	$.ajax({
		type : 'get',
		url : '/mypage/helloMessage',
		success : function(data) {
			$('#btnHelloMessage').html(data.name);
		}
	});

	$.ajax({
		type : 'post',
		url : '/mypage/scrollGroupList',
		success : function(data) {
			
			var htmlString;
			$.each(data, function(index,value){
				htmlString += "<option value=\"" + data[index].groups+"\">"+data[index].groups+"</option>";
			});
			$('#groupList').html(htmlString);
			
		}
	});

	$("#btnLogout").click(function() {
		console.log("Logout click");
		$.ajax({
			type : 'get',
			url : '/mypage/logout',
			success : function(data) {
				$(location).attr('href', '/');
			}
		});
	});
	
	$(".pagination > li").click(function() {
		console.log("pagination click");
		
		$(".pagination > li").removeClass("active");
		$(this).addClass("active");
		
	});
});
