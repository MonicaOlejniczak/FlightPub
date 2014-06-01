function confirmPassword() {
    if(document.getElementById("accPassword").value != document.getElementById("accConfPassword").value) {
        alert("Password confirmation failed! Re-enter your password!");
        return false;
    } else {
        document.getElementById("accForm").submit();
        return true;
    }
}

function confirmCancel(){
    var answer = confirm("Are you sure you wish to cancel your current booking?\nClick OK to confirm or CANCEL to continue with your booking.");
    if(answer){
        document.getElementById("accForm").reset();
        return true;
    } else {
        return false;
    }
}