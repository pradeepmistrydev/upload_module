//success message
function successmsg() {
    document.querySelector('#successMessage').style.display = "block";
}
//success message

//eye pointer

$('.password_eye').on('click', function () {
    var passInput = $("#text_password");
    if (passInput.attr('type') === 'password') {
        passInput.attr('type', 'text');
    } else {
        passInput.attr('type', 'password');
    }
});

$('.password_eye').hide();
$('#text_password').focus(function () {

    $('.password_eye').show();
});

//eye pointer

//btn submit
$('#btn_submit').click(function () {
    var user = $('#text_username').val();
    var pass = $('#text_password').val();
    if (user != '' && user.length > 8 && pass.length > 5 && pass != '') {
        window.location.href = "upload.html?username=" + user + "&password=" + pass;
        return false;
    }
    else {
        alert('Please fill the credentials appropriately. Email Ex. - admin@gmail.com and Password Ex. - Admin@123');
    }
});
//btn submit

//export btn
function ExportToExcel(type, fn, dl) {
    var elt = document.getElementById('csvtable');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    return dl ?
        XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
        XLSX.writeFile(wb, fn || ('MyExcel.' + (type || 'xlsx')));
}


$('.exportbtn').hide();
$('#viewfile').click(function () {
    $('.exportbtn').show();

});

//export btn

//edit & delete function
$(document).on('click', '.table tbody tr td .btn-delete', function () {
    $(this).parent().parent().remove()
});
$('.edit_textbox').hide();
$(document).on('click', '.table tbody tr td .btn-edit', function () {

    var id = $(this).attr('data-attr');
    // alert(id);
    console.log('id ' + $(this).attr('data-attr'));
    console.log('id ' + $('.edit_textbox_' + id));

    $('.data_textbox_' + id).hide();
    $('.edit_textbox_' + id).show();
});

function myFunction(x) {
    // //alert("y");
    // console.log(x.id)
    var id = x.getAttribute('data-attr-row');
    // console.log(id);
    $('.btn_edit_' + id).text("Save").addClass('bg_color');
    var z = $('.btn_edit_' + id).text("Save");

    z.click(function () {
        alert('Data Successfully Saved. You are ready to export the Excel file.');

    })
}
//edit & delete function

//table extraction

function ExportToTable() {
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv)$/;
    //Checks whether the file is a valid csv file    
    if (regex.test($("#csvfile").val().toLowerCase())) {
        //Checks whether the browser supports HTML5    
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var table = $("#csvtable > tbody");
                //Splitting of Rows in the csv file    
                var csvrows = e.target.result.split("\n");
                for (var i = 0; i < csvrows.length; i++) {
                    if (csvrows[i] != "") {
                        var row = "<tr data-attr-row=" + i + ">";
                        var csvcols = csvrows[i].split(",");
                        //Looping through each cell in a csv row 

                        for (var j = 0; j < csvcols.length; j++) {
                            var col1 = "<td> <button type = 'button' id='btn_edit' class = 'btn btn-edit btn_edit_" + i + "' data-attr=" + i + "> Edit </button> <button class = 'btn btn-delete' type = 'button'> Delete </button></td>";
                            var cols = "<td data-attr=" + j + ">" + "<span data-attr=" + j + "' class='col_text data_textbox_" + i + "'>" + csvcols[j] + "</span>" + "<input type='text' class='edit_textbox edit_textbox_" + i + "' id='edit_textbox_" + i + "' value='" + csvcols[j] + "'  onfocus='myFunction(this)'  data-attr-row=" + i + "  data-attr=" + j + ">" + "</td > ";

                            // console.log(csvcols[j]);
                            row += cols;
                        }
                        row += col1;
                        row += "</tr>";
                        table.append(row);
                    }
                }
                $('#csvtable').show();
            }
            reader.readAsText($("#csvfile")[0].files[0]);
        } else {
            alert("Sorry! Your browser does not support HTML5!");
        }
    } else {
        alert("Please upload a valid CSV file!");
    }
}
//table extraction