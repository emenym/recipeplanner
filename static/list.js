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
            }
        }

    });

//    $('#getgroc').click(function(gifurl) {
////         $('#getgroc').html('<img src="{{ url_for('static', filename='loading.gif') }}">');
////        $('#getgroc').html('<img src ='+gifurl+'>');
//        list = $('#list');
//        if (list.children().length > 0){
//            $('.list-group').append("<li class='list-group-item'>"+input.val()+"</li>");
//            // clear input and typehead
//            input.val('');
//            $('.typeahead').typeahead('val', '');
//        }
//
//    });

    $('#userinput').on('keyup', function (e) {
    if (e.keyCode === 13) {
        $('#add').click();
    }
    });



});

function get_groceries(gifurl) {
    $('#getgroc').html('<img src ='+gifurl+'>');
    recipelist = [];
    $( "#list li"  ).each(function( index ) {
        console.log( index + ": " + $( this ).text() );
        recipelist.push($( this ).text())
    });


    $.ajax({
    url: "/get_groceries",
    type: "POST",
    data: JSON.stringify({recipes: recipelist}),
    contentType: "application/json; charset=utf-8",
    success: function(dat) { console.log(dat); }
});

}