function generateTable(){
    var formhead = '<FORM class="center-block" METHOD="POST" ACTION="/luggage">\n';
    var tbody = '';
    var alphachar = '';
    var theader = '<table class="table" style="width:500px">\n';

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
        for(var j = 0; j < 7; j++){
            if(j === 3){tbody += '<td class="bg-primary">--ISLE--</td>\n';}
            else{
                tbody += '<td class="active"><input type="checkbox" name= "seat" value="' + alphachar + '' + (j + 1) + '"></td>\n';
            }
        }
        tbody += '</tr>\n';
    }
    var tfooter = '</table>\n';
    var fprev = '<a href="/" class="btn btn-primary">Previous</a>';
    var fnext = '<input type="submit" class="btn btn-primary" value="Next">';
    var fcancel = '<a href="/" class="btn btn-danger">Cancel</a>';
    var ffoot = '</FORM>';
    var page = formhead + theader + tbody + tfooter + fprev + fnext + fcancel + ffoot;
    document.getElementById('seats').innerHTML = page;
}
