window.onload=function generateTable(){
    var formhead = '<form class="form-group" action="/seat-selection/process" id="seatForm" role="form" method="post">\n';
    var tbody = '';
    var alphachar = '';
    var theader = '<table class="table" style="width:310px">\n';

    for(var i = 0; i < 6; i++){
        tbody += '<tr>';
        if(i === 0){
            alphachar = 'A';
            tbody += '<td class="bg-primary">ROW A</td>\n';
        } else if(i ===1){
            alphachar = 'B';
            tbody += '<td class="bg-primary">ROW B</td>\n';
        }else if(i ===2){
            alphachar = 'C';
            tbody += '<td class="bg-primary">ROW C</td>\n';
        }else if(i ===3){
            alphachar = 'D';
            tbody += '<td class="bg-primary">ROW D</td>\n';
        }else if(i ===4){
            alphachar = 'E';
            tbody += '<td class="bg-primary">ROW E</td>\n';
        }else if(i ===5){
            alphachar = 'F';
            tbody += '<td class="bg-primary">ROW F</td>\n';
        }
        var modifier = 1;
        for(var j = 0; j < 7; j++){
            if(j === 3){
                tbody += '<td class="bg-primary">--ISLE--</td>\n';
                modifier = -1;
            }
            else{
                if(j === 4){modifier = 0;}
                tbody += '<td class="active"><input type="checkbox" name= "seat" value="' + alphachar + '' + (j + modifier) + '"></td>\n';
            }
        }
        tbody += '</tr>\n';
    }
    var tfooter = '</table>\n';
    var fprev = '<a href="/luggage" class="btn btn-primary">Previous</a>';
    var fnext = '<input type="submit" class="btn btn-primary" value="Next">';
    var fcancel = '<a href="/" class="btn btn-danger" onclick="return confirmCancel();">Cancel</a>\n';
    var ffoot = '</form>';
    var page = formhead + theader + tbody + tfooter + fprev + fnext + fcancel + ffoot;
    document.getElementById('seats').innerHTML = page;
};

function confirmCancel(){
    var answer = confirm("Are you sure you wish to cancel your current booking?\nClick OK to confirm or CANCEL to continue with your booking.");
    if(answer){
        document.getElementById("seatForm").reset();
        return true;
    } else {
        return false;
    }
}
