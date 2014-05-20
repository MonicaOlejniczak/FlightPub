function confirmCancel(){
    var answer = confirm("Are you sure you wish to cancel your current booking?\nClick OK to confirm or CANCEL to continue with your booking.");
    if(answer){
        window.location = "/";
    }
}