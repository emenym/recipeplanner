$(document).ready(function(){
    // add item to list-group
    $('#add').click(function() {
        input = $('#userinput')
        if (input.val() != ''){
            if ($('#hidden_match').val()== 'true'){
                $('.list-group').append("<li class='list-group-item'>"+input.val()+"</li>");
                // clear input and typehead
                input.val('');
                $('#hidden_match').val('false')
                $('.typeahead').typeahead('val', '');
                $('#userinput').css('color', '#495057');
                $("#userinput").focus();
            }else{
                $('#userinput').css('color', 'red');
                $("#userinput").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
                $("#userinput").focus();
            }
        }

    });

    $('#userinput').on('keyup', function (e) {
    if (e.keyCode === 13) {
        $('#add').click();
    }
    });

    $('.printme').click(function(){
         $("#grocerytable").print();
    });

});

function get_groceries(gifurl) {
    $('#getgroc').html('<img src ='+gifurl+'>');
    recipelist = [];
    $( "#list li"  ).each(function( index ) {
        recipelist.push($( this ).text())
    });


    $.ajax({
    url: "/get_groceries",
    type: "POST",
    data: JSON.stringify({recipes: recipelist}),
    contentType: "application/json; charset=utf-8",
    success: function(dat) {

            $('#getgroc').html('Get Grocery List');
            if (jQuery.isEmptyObject(dat.groceries)){
                $("#userinput").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
                $("#userinput").focus();
                return;
            }
            var grocerylist = $("<div id=grocerylist></div>");
            $('#content').append(grocerylist)
            $('#grocerylist').load(grocery_template, function(){
                $.each(dat.groceries, function(key, val) {
                    var row = $("<tr><td>"+key+"</td><td>"+val.qty+"</td><td>"+val.unit+"</td></tr>");
                    $('#grocerytable tbody').append(row);
                 });
            });
         }
    });

}