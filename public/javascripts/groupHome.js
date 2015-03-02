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
	
	/*
	$('#btnSaveprofile').click(function() {
			var name = $('#nameinputProfile').val();
			var job = $('#jobinputProfile').val();
			var age = $('#age').val();
			var place = $('#place').val();
			var email = $('#email').val();
			var contact = $('#contact').val();
			
			var json = {};
			json["member_name"] = name;
			json["age"] = age;
			json["location"] = place;
			json["id"] = email;
			json["contact"] = contact;
	
			$.ajax({
				type : 'post',
				url : '/groupHome/imageUpload',
				data : json,
				success : function(result) {
					alert('Saving profile data success!');
				}
			});
		});
		
		$('#btnSendmessageok').click(function() {
			var title = $('#dataMsgtitle').val();
			//var sendingPerson = $('data.ID').val(); 			占쎈��껃칰占쏙옙�롫뮉野껓옙筌띿쉶�쀥쳞�곻옙 筌뤴뫀�ㅵ칰醫롫뮶
			var receivingPerson = $('#dataMsgsender').val();
			var content = $('#dataMsgcontent').val();
			
			var json = {};
			json["message_title"] = title;
			//json["sender_id"] = sendingPerson;			占쎄쑴肉됬댆占쏙쭕�롮몵筌롳옙揶쏆늿��占썩뫁竊쒏묾占�
			json["receiver_id"] = receivingPerson;
			json["message_content"] = content;
	
			$.ajax({
				type : 'post',
				url : '/groupHome/sendMessage',
				data : json,
				success : function(result) {
					alert('Saveing sending message data success!');
				}
			});
		});
		
		$('#btnRvdmessageok').click(function() {
			var date = $('#date').val();
			var title = $('#title').val();
			var sender = $('#sender').val();
			var content = $('#RvdMsgcontent').val();
			
			var json = {};
			//json["date"] = date;
			json["message_title"] = title;
			json["sender_id"] = sender;
			json["message_content"] = content;
	
			$.ajax({
				type : 'post',
				url : '/groupHome/receivedMessage',
				data : json,
				success : function(result) {
					alert('Saveing received message data success!');
				}
			});
		});
	*/
	
	
	/*-----------------------------------------------------Send message popup script----------------------------------------------------------------*/

$(".btnSendmessage").click(function() {
		layer_open('popupSendmessage', 'layer');
		return false;
	});
	
$(".sendpersonMessagebox").click(function() {
		layer_open('popupSendmessage', 'layer');
		return false;
	});
		
$(".textMessagebox").click(function() {
		layer_open('popupRvdmessage', 'layer2');
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
