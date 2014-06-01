$(document).ready(function(){
    $("#pay-methods").change(function(){

        if ($(this).val() == "1" ) {
            $("#pPalUser").val("");
            $("#pPalPass").val("");
            $("div.hide1").toggleClass("hide1", false);
            $("#mcard").slideDown("fast"); //Slide Down Effect
        } else {
            $("div.hide1").toggleClass("hide1", true);
            $("#mcard").slideUp("fast");    //Slide Up Effect
        }
        if ($(this).val() == "2" ) {
            $("#mcardName").val("");
            $("#mcardNum").val("");
            $("#mcardCVV").val("");
            $("#mcardExpMonth").val("0");
            $("#mcardExpYear").val("0");
            $("div.hide2").toggleClass("hide2", false);
            $("#ppal").slideDown("fast"); //Slide Down Effect
        } else {
            $("div.hide2").toggleClass("hide2", true);
            $("#ppal").slideUp("fast");    //Slide Up Effect
        }
    });
});

function checkPay() {
    if(document.getElementById("pay-methods").value === "0") {
        alert("Choose a payment method!");
        return false;
    } else if((document.getElementById("pay-methods").value === "1" && (document.getElementById("mcardExpMonth").value === "0" || document.getElementById("mcardExpYear").value === "0"))) {
        alert("Fill in you payment details!");
        return false;
    } else {
        return true;
    }
}

function confirmCancel() {
    var answer = confirm("Are you sure you wish to cancel your current booking?\nClick OK to confirm or CANCEL to continue with your booking.");
    if(answer){
        document.getElementById("payForm").reset();
        return true;
    } else {
        return false;
    }
}