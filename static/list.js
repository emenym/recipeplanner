$(document).ready(function(){
    // add item to list-group
    var btn = $('#enter')
    btn.click(function() {
        input = $('#userinput')
        if (input.val() != ''){
            $('.list-group').append("<li class='list-group-item'>"+input.val()+"</li>");
            // clear input and typehead
            input.val('')
                    $('.typeahead').typeahead('val', '');
        }

    });


    var btn = $('#getgroc')
    btn.click(function() {
        list = $('#list')
        if (list.children().length > 0){
            $('.list-group').append("<li class='list-group-item'>"+input.val()+"</li>");
            // clear input and typehead
            input.val('')
                    $('.typeahead').typeahead('val', '');
        }

    });

});
