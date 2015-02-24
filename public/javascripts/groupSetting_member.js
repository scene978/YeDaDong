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

/*-----------------------------------------------------Send message popup script----------------------------------------------------------------*/

$(".btnAccept").click(function() {
		layer_open('popupAccept', 'layer');
		return false;
	});
	
$(".btnRefuse").click(function() {
		layer_open('popupRefuse', 'layer2');
		return false;
	});
	
$(".btnAuthorize").click(function() {
		layer_open('popupAuthorize', 'layer3');
		return false;
	});
	
$(".btnSignout").click(function() {
		layer_open('popupSignout', 'layer4');
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