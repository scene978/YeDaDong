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
			
	$("#btnSettingMember").click(function() {
		console.log("Setting Member menu click");
		$.ajax({
			type : 'get',
			url : '/groupHome/moveSettingMember',
			success : function(data) {
				$(location).attr('href', '/groupHome/moveSettingMember');
			}
		});
	});
	
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

$('.freeboard').click(function() {
	
	console.log("Board loading");
	
	$.ajax({
		type : 'post',
		url : '/groupHome/moveBoard',
		success : function(data) {
			$(location).attr('href', 'board');
			console.log("board loading done");
				//move page
			}
	});
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
