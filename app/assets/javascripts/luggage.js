window.onload=function generateTable(){
    var messageh = '<p class="centre-block">\nFor each passenger, please select what class of ticket and '
                   + 'whether you wish to include only carry-on luggage with your booking, or if you wish to also include checked luggage.\n</p>\n';
    var formh = '<form class="form-group" action="/luggage/process" role="form" method="post">\n';
    var formb = '<br />';
    for(var j = 0; j < 4; j++){
        formb += '<div>\n';
        formb += '<p>Passenger ' + (j + 1) + ':</p>\n';
        formb += '<div>\n';
        formb += '<select class="form-group">\n<option>Economy</option>\n';
        formb += '<option>Premium Economy</option>\n';
        formb += '<option>Business Class</option>\n';
        formb += '<option>First Class</option>\n</select>\n';
        formb += '<select class="form-group">\n<option>Only Carry-On Luggage</option>\n';
        formb += '<option>Carry-On Plus Checked Baggage</option>\n</select>\n';
        formb += '</div>\n</div>\n';
    }
    var formf = '</div>\n<a href="/" class="btn btn-primary">Previous</a>';
    formf += '<input type="submit" class="btn btn-primary" value="Next">';
    formf += '<a href="/" class="btn btn-danger" onclick="return confirmCan();">Cancel</a>\n</div>\n';
    formf += '</form>\n';
    var page = messageh + formh + formb + formf;
    document.getElementById('luggage').innerHTML = page;
};

function confirmCan(){
    var answer = confirm("Are you sure you wish to cancel your current booking?\nClick OK to confirm or CANCEL to continue with your booking.");
    if(answer){
        return true;
    } else {
        return false;
    }
}