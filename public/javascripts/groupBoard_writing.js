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
		console.log("good");
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
	
	$("#btnWriteBoard").click(function() {
		var now = new Date();
		var year = now.getFullYear();
		var month = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0' + (now.getMonth()+1);
		var day = now.getDate()>9 ? ''+now.getDate() : '0' + now.getDate();
		
		var today = year + '-' + month + '-' +day;
		var title = $('#titlePosting').val();
		var content = $('#contentPosting').val();
		
		var json = {};
		json["today"] = today;
		json["title"] = title;
		json["content"] = content;
		
		$.ajax({
			type : 'post',
			url : '/groupBoard_writing/writeBoard',
			data: json,
			success : function(data) {
				$(location).attr('href', '/groupBoard');
			}
		});
	});
	
	$("#btnLoadList").click(function() {
		$.ajax({
			type : 'post',
			url : '/groupBoard_writing/loadList',
			data: json,
			success : function(data) {
				$(location).attr('href', '/groupBoard');
			}
		});
	});
});