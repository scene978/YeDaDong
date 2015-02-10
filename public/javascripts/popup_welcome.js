$(document).ready(function ()
{	
	ShowDialog(); 
	$("#btnClose").click(function (e) {
		HideDialog();
		e.preventDefault();
	}); 
	
  	$("#popup_subscribe_newsletter").click(function(){
		var email_id = $("#popup_email_newsletter").val();  
		if(validatePopupEmail(email_id))
		{
			$.ajax({url:"index.php?route=module/welcome_popup/subscribe_email&email="+email_id,success:function(result){
				$("#callback_newsletter").html(result); 
			}});
		} 
	});
	
	//for submitting email.	
}); 
function validatePopupEmail(email) {
    var x = email;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        alert("Not a valid e-mail address");
        return false;
    }
	else
	 	return true;
}
function ShowDialog(modal)
{
	$("#overlay").show();
	$("#popup_dialog").fadeIn(300); 
	if (modal) 
		$("#overlay").unbind("click"); 
	else {
		$("#overlay").click(function (e) {
			//HideDialog();
		});
	}
} 
function HideDialog()
{
	$("#overlay").hide();
	$("#popup_dialog").fadeOut(300);
}  