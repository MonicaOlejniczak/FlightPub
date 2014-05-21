window.onload=function generateTable(){
    var messageh = '<p class="centre-block">\nFor each passenger, please select whether you wish to include only carry-on luggage with your booking, or if you wish to also include checked luggage.\n</p>\n';
    var formh = '<FORM class="form" role="form" method="POST" action="/luggage">\n';
    var formb = '';
    for(var i = 0; i < 4; i++){
        formb += '<p>Passenger ' + (i + 1) + ':</p>\n';
        formb += '<div class="radio">\n<label>\n<input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>\n';
        formb += 'Only Carry-On Luggage\n</label>\n</div>';
        formb += '<div class="radio">\n<label>\n<input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">\n';
        formb += 'Carry-On Plus Checked Baggage\n</label>\n</div>';
    }
    var formf = '<a href="/seatSelection" class="btn btn-primary">Previous</a>';
    formf += '<input type="submit" class="btn btn-primary" value="Next">';
    formf += '<button class="btn btn-danger" onclick="confirmCan();">Cancel</button>\n';
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