window.onload=function generateTable(){
    var messageh = '<p class="centre-block">\nFor each passenger, please select what class of ticket and '
                   + 'whether you wish to include only carry-on luggage with your booking, or if you wish to also include checked luggage.\n</p>\n';
    var formh = '<FORM class="form-group" role="form" method="POST" action="/luggage">\n';
    var formb = '';
    for(var j = 0; j < 4; j++){
        formb += '<div>\n';
        formb += '<p>Passenger ' + (j + 1) + ':</p>\n';
        formb += '<div>\n';
        formb += '<select class="form-control">\n<option>Economy</option>\n';
        formb += '<option>Premium Economy</option>\n';
        formb += '<option>Business Class</option>\n';
        formb += '<option>First Class</option>\n</select>\n';
        formb += '<select class="form-control">\n<option>Only Carry-On Luggage</option>\n';
        formb += '<option>Carry-On Plus Checked Baggage</option>\n</select>\n';
        formb += '</div>\n<br /></div>\n';
    }
    var formf = '</div>\n<a href="/seatSelection" class="btn btn-primary">Previous</a>';
    formf += '<input type="submit" class="btn btn-primary" value="Next">';
    formf += '<button class="btn btn-danger" onclick="confirmCan();">Cancel</button>\n</div>\n';
    formf += '</FORM>\n';
    var page = messageh + formh + formb + formf;
    document.getElementById('luggage').innerHTML = page;
};

function confirmCan(){
    var answer = confirm("Are you sure you wish to cancel your current booking?\nClick OK to confirm or CANCEL to continue with your booking.");
    if(answer){
        window.location = "/";
    }
}