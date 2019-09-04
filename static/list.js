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

    $('#getgroc').click(function() {
        list = $('#list')
        if (list.children().length > 0){
            $('.list-group').append("<li class='list-group-item'>"+input.val()+"</li>");
            // clear input and typehead
            input.val('')
                    $('.typeahead').typeahead('val', '');
        }

    });

    $('#userinput').on('keyup', function (e) {
    if (e.keyCode === 13) {
        $('#add').click();
    }
});


});
