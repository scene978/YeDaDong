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
	
	$.ajax({
		type : 'get',
		url : '/groupSettingBoard/getBoardList',
		success : function(data) {
			$("#templates_3").load('template/boardList.html',function(){
			 	var template = $("#boardList").html();
			 	var html="";
				 $.each(data, function(index,value){
					html += Mustache.render(template, data[index]);
			 });
				$('#listBoard').html(html);
			});
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
	
	
});