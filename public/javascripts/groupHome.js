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
			url : '/groupHome/rvdMessage',
			success : function(data) {
			$("#templates_1").load('template/RvdMessageList.html',function(){
				var template = $("#templateRvdMessage").html();
				var html="";
				 $.each(data, function(index,value){
					html += Mustache.render(template, data[index]);
			 	});
				$('#Received_Message_List').html(html);
				});
			}
		});
		
		$.ajax({
			type : 'get',
			url : '/groupHome/sendMessage',
			success : function(data) {
			$("#templates_1").load('template/SendMessageList.html',function(){
				var template = $("#templateSendMessage").html();
				var html="";

				 $.each(data, function(index,value){
					html += Mustache.render(template, data[index]);
			 	});
				$('#Send_Message_List').html(html);
				});
			}
		});


		$.ajax({
			type : 'get',
			url : '/groupHome/getProfile',
			success : function(data) {
				$('#nameinputProfile').val(data[0].member_name);
				$('#jobinputProfile').val(data[0].job);
				$('#age').val(data[0].age);
				$('#place').val(data[0].location);
				$('#email').val(data[0].email);
				$('#contact').val(data[0].contact);
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
	
	
	$('#btnSaveprofile').click(function() {									// save profile
			var name = $('#nameinputProfile').val();
			var job = $('#jobinputProfile').val();
			var age = $('#age').val();
			var place = $('#place').val();
			var email = $('#email').val();
			var contact = $('#contact').val();

			var json = {};
			if(name != "") {
				json["member_name"] = name;
			}
			if(job != "") {
				json["job"] = job;
			}
			if(age != "") {
				json["age"] = age;
			}
			if(place != "") {
				json["place"] = place;
			}
			if(email != "") {
				json["email"] = email;
			}
			if(contact != "") {
				json["contact"] = contact;
			}
			
			$.ajax({
				type : 'post',
				url : '/groupHome/saveProfile',
				data : json,
				success : function(result) {
					alert('Saving profile data success!');
				}
			});
		});

	/*	
		$('#btnSendmessageok').click(function() {								// send message
			var title = $('#dataMsgtitle').val();
			//var sendingPerson = $('data.ID').val(); 			
			var receivingPerson = $('#dataMsgsender').val();
			var content = $('#dataMsgcontent').val();
			//var date = $.datepicker.formatDate('yy/mm/dd', new Date()); 	 //today's date
			
			var json = {};
			json["message_title"] = title;
			//json["sender_id"] = sendingPerson;			
			json["receiver_id"] = receivingPerson;
			json["message_content"] = content;
			//json["date"] = date; 				 //today's date
	
			$.ajax({
				type : 'post',
				url : '/groupHome/sendMessage',
				data : json,
				success : function(result) {
					alert('Saveing sending message data success!');
					$('#sendDate').html(date);
					$('#rvdTitle').html(title);
					$('#rvdReceiver').html(receivingPerson);
				}
			});
		});
		
	*/
	
	/*-----------------------------------------------------Send message popup script----------------------------------------------------------------*/

$(".btnSendmessage").click(function() {
		layer_open('popupSendmessage', 'layer');
		return false;
	});
	
$("#btnImageUpload").click(function() {
		layer_open('popupImageUpload', 'layer3');
		return false;
	});
	
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

	popup_layer.find('a.btnClose').click(function(e) {
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

});
