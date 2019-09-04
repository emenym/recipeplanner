// Defining the local dataset
var cars = ['Audi', 'BMW', 'Bugatti', 'Ferrari', 'Ford', 'Lamborghini', 'Mercedes Benz', 'Porsche', 'Rolls-Royce', 'Volkswagen'];


var recipes = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: recipes
});

// Initializing the typeahead
$('.typeahead').typeahead({
    hint: true,
    highlight: true, /* Enable substring highlighting */
    minLength: 1 /* Specify minimum characters required for showing suggestions */
},
{
    name: 'recipes',
    source: recipes
}).on('change blur', function() {
        // Force select an item
        match = false

        $.each(recipes.index.datums, function (i, item) {
            if ($('#userinput').val() == item) {
                match = true;
                return false;
            }
        });

        if (match) {
            $('#hidden_match').val('true')
        }
});