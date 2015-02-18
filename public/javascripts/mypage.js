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
	
	$.ajax({
		type : 'post',
		url : '/mypage/getGroupList',
		success : function(data) {
			$("#templates_1").load('template/list.html',function(){
				var template = $("#template1").html();
				var html="";
				 $.each(data, function(index,value){
					html += Mustache.render(template, data[index]);
			 	});
				$('#my_group_list').html(html);
			});
		}
	});
	
	$.ajax({
		type : 'post',
		url : '/mypage/getWaitingList',
		success : function(data) {
			$("#templates_1").load('template/list.html',function(){
				var template = $("#template1").html();
				var html="";
				 $.each(data, function(index,value){
					html += Mustache.render(template, data[index]);
					$('#waitingList').html(html);
			 	});
			});
		}
	});
	
	$("#btnLogout").click(function() {
		console.log("Logout click");
		$.ajax({
			type : 'get',
			url : '/mypage/logout',
			success : function(data) {
				console.log("Logout Success");
				$(location).attr('href', '/');
			}
		});
	});

	$("#create_group_btn").click(function() {
		layer_open('create_group_popup', 'layer');
		return false;
	});

	$("#create_group_ok_btn").click(function() {
		var groupName = $('#groupname_data').val();
		var groupDesc = $('#groupinfo_data').val();
		
		if ((groupName == "") || (groupDesc == "")) {
			alert("Insert All Information!!!");
		} else {
			var json = {};
			json["groupID"] = groupName;
			json["groupDesc"] = groupDesc;
			
			console.log("group information submit");
			$.ajax({
				type : 'post',
				url : '/mypage/createGroup',
				data : json,
				success : function(result) {
					if (result.status == "FAIL") {
						alert('Already used group name!!');
					} else if (result.status == "SUCCESS") {
						console.log("hihi");
					}
				}
			});
		};
		gname_on_congrat_popup();
		layer_open('congrat_create', 'layer');
		return false;
	});

	$("#search_group_btn").click(function() {
		layer_open('search_group_popup', 'layer2');
		return false;
	});

	$(".del_group").click(function() {
		layer_open('group_delete_popup', 'layer3');
		return false;
	});

	$("#delete_group_ok").click(function() {
		$("#my_group_list tr:last").remove();
		return false;
	});
});

var changeState = function(groupID){

		var json = {};
		json["groupID"] = groupID;
		
		console.log(groupID);
		
		$.ajax({
			type : 'post',
			url : '/mypage/changeState',
			data : json,
			success : function(result) {
				if (result.status == "SUCCESS") {
					console.log("yes");
					window.location.reload(true);
				} else {
					console.log("no");
				}
			}
		});
	}

function layer_open(layer_id, higher_layer_class) {

	var popup_layer = $('#' + layer_id);
	var higher_layer_class = $('.' + higher_layer_class);
	var background = popup_layer.prev().hasClass('background');

	if (background) {
		higher_layer_class.fadeIn();
		// 'background' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다.
	} else {
		popup_layer.fadeIn();
	}

	// 화면의 중앙에 레이어를 띄운다.
	if (popup_layer.outerHeight() < $(document).height())
		popup_layer.css('margin-top', '-' + popup_layer.outerHeight() / 2 + 'px');
	else
		popup_layer.css('top', '0px');
	if (popup_layer.outerWidth() < $(document).width())
		popup_layer.css('margin-left', '-' + popup_layer.outerWidth() / 2 + 'px');
	else
		popup_layer.css('left', '0px');

	popup_layer.find('a.cbtn').click(function(e) {
		if (background) {
			higher_layer_class.fadeOut();
			// 'background' 클래스가 존재하면 레이어를 사라지게
			// 한다.
		} else {
			popup_layer.fadeOut();
		}
		e.preventDefault();

		window.location.reload(true);
		// close버튼을 누르면 페이지 초기화->나중에 통신할 때 서버로 값 넘겨주고 초기화할때 값 받아오게 하기
	});
}

function gname_on_congrat_popup() {
	var groupname = $('#groupname_data').val();
	var message = "<p>Group name : [" + groupname + "]</p>"

	$("#congrat_create .pop-container .pop-conts p").after(message);
}



