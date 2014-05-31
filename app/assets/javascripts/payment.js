$(document).ready(function(){
    $("#pay-methods").change(function(){

        if ($(this).val() == "1" ) {
            $("div.hide1").toggleClass("hide1", false);
            $("#mcard").slideDown("fast"); //Slide Down Effect
        } else {
            $("div.hide1").toggleClass("hide1", true);
            $("#mcard").slideUp("fast");    //Slide Up Effect
        }
        if ($(this).val() == "2" ) {
            $("div.hide2").toggleClass("hide2", false);
            $("#vcard").slideDown("fast"); //Slide Down Effect
        } else {
            $("div.hide2").toggleClass("hide2", true);
            $("#vcard").slideUp("fast");    //Slide Up Effect
        }
        if ($(this).val() == "3" ) {
            $("div.hide3").toggleClass("hide3", false);
            $("#ppal").slideDown("fast"); //Slide Down Effect
        } else {
            $("div.hide3").toggleClass("hide3", true);
            $("#ppal").slideUp("fast");    //Slide Up Effect
        }
    });
});

function confirmCancel() {
    var answer = confirm("Are you sure you wish to cancel your current booking?\nClick OK to confirm or CANCEL to continue with your booking.");
    if (answer) {
        window.location = "/";
    }
}