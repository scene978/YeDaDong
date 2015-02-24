$(document).ready(function() {

	$.ajax({
		type : 'get',
		url : '/helloMessage',
		success : function(data) {
			$('#btnHelloMessage').html(data.name+"님");
		}
	});

	$.ajax({
		type : 'get',
		url : '/scrollGroupList',
		success : function(data) {
			
			var htmlString;
			$.each(data, function(index,value){
				htmlString += "<option value=\"" + data[index].groups+"\">"+data[index].groups+"</option>";
			});
			$('#groupList').html(htmlString);
		}
	});

	$("#btnLogout").click(function() {
		$.ajax({
			type : 'get',
			url : '/logout',
			success : function(data) {
				$(location).attr('href', '/');
			}
		});
	});

	$("#btnGotogroup").click(function() {
		$.ajax({
			type : 'get',
			url : '/moveMypage',
			success : function(data) {
				$(location).attr('href', '/mypage');
			}
		});
	});

	$('#btnHome').click(function() {
		$.ajax({
			type : 'get',
			url : '/moveHome',
			success : function(data) {
				$(location).attr('href', '/groupHome');
			}
		});
	});

	$('.freeboard').click(function() {
		$.ajax({
			type : 'get',
			url : '/moveBoard',
			success : function(data) {
				$(location).attr('href', '/groupBoard');
			}
		});
	});

	$("#btnSettingMember").click(function() {
		$.ajax({
			type : 'get',
			url : '/moveSettingMember',
			success : function(data) {
				$(location).attr('href', '/groupSettingMember');
			}
		});
	});

	$("#btnSettingBoard").click(function() {
		$.ajax({
			type : 'get',
			url : '/moveSettingBoard',
			success : function(data) {
				$(location).attr('href', '/groupSettingBoard');
			}
		});
	});
	
	$(".pagination > li").click(function() {
		console.log("pagination click");
		
		$(".pagination > li").removeClass("active");
		$(this).addClass("active");
		
	});
});
