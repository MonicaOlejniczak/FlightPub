function confirmRegPassword() {
    if(document.getElementById("password").value != document.getElementById("confirmPassword").value) {
        alert("Password confirmation failed! Re-enter your password!");
        return false;
    } else {
        document.getElementById("regForm").submit();
        return true;
    }
}

function confirmCancel(){
    var answer = confirm("Are you sure you wish to cancel your current booking?\nClick OK to confirm or CANCEL to continue with your booking.");
    if(answer){
        document.getElementById("regForm").reset();
        return true;
    } else {
        return false;
    }
}