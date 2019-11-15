// NAMESPACE OBJECT
app = {};

// INGREDIENT INFORMATION
app.ingredients = [
    {
        name: 'strawberries',
        type: 'fruit',
        nutrients: ['folate', 'potassium', 'fiber', 'vitamin c']
    },
    {
        name: 'blueberries',
        type: 'fruit',
        nutrients: ['vitamin e', 'folate', 'magnessium', 'postassium', 'fiber', 'vitamin c', 'vitamin k', 'manganese']
    },
    {
        name: 'blueberries',
        type: 'fruit',
        nutrients: ['vitamin e', 'folate', 'magnesium', 'potassium', 'fiber', 'vitamin c', 'vitamin k', 'manganese']
    },
    {
        name: 'blackberries',
        type: 'fruit',
        nutrients: ['vitamin e', 'folate', 'magnesium', 'potassium', 'fiber', 'vitamin c', 'vitamin k', 'manganese']
    },
    {
        name: 'bananas',
        type: 'fruit',
        nutrients: ['fiber', 'vitamin c', 'potassium', 'manganese', 'vitamin b6']
    },
    {
        name: 'pineapple',
        type: 'fruit',
        nutrients: ['thiamin', 'vitamin b6', 'copper', 'vitamin c', 'manganese']
    },
    {
        name: 'mango',
        type: 'fruit',
        nutrients: ['fiber', 'vitamin b6', 'vitamin a', 'vitamin c']
    },
    {
        name: 'peach',
        type: 'fruit',
        nutrients: ['fiber', 'vitamin a', 'niacin', 'potassium', 'vitamin c']
    },
    {
        name: 'plain yogurt',
        type: 'thickener',
        nutrients: ['protein', 'riboflavin', 'calcium', 'phosphorus']
    },
    {
        name: 'peanut butter',
        type: 'thickener',
        nutrients: ['niacin', 'manganese']
    },
    {
        name: 'almond butter',
        type: 'thickener',
        nutrients: ['magnesium', 'manganese']
    },
    {
        name: 'almond milk',
        type: 'liquid',
        nutrients: ['vitamin e', 'riboflavin', 'magnesium', 'calcium', 'potassium']
    },
    {
        name: 'coconut milk',
        type: 'liquid',
        nutrients: ['menganese']
    },
    {
        name: 'whole milk',
        type: 'liquid',
        nutrients: ['vitamin d', 'calcium', 'phosphorus']
    },
    {
        name: 'spinach',
        type: 'mixin',
        nutrients: ['niacin', 'zinc', 'fiber', 'protein', 'vitamin a', 'vitamin c', 'vitamin e', 'vitamin k', 'thiamin', 'robiflavin', 'vitamin b6', 'folate', 'calcium', 'iron', 'magnesium', 'potassium']
    },
    {
        name: 'kale',
        type: 'mixin',
        nutrients: ['fiber', 'protein', 'thiamin', 'riboflavin', 'folate', 'iron', 'magnesium', 'vitamin a', 'vitamin c', 'vitamin k', 'vitamin b6', 'calcium', 'potassium', 'copper', 'manganese']
    },
    {
        name: 'flax seed',
        type: 'mixin',
        nutrients: ['fiber', 'protein', 'thiamine', 'copper', 'magnesium', 'phosphorous']
    }
];

// GLOBAL VARIABLES
app.selectedIngredients = app.ingredients.filter(ingredient => ingredient.name === 'strawberries' || ingredient.name === 'almond milk');

// CACHE SELECTORS
$addButton = $('addIngredientButton');
$selectedList = $('.selectedIngredients');

// display the selected ingredients onto the page
// if there are no selected ingredients, display a message instead
app.displaySelectedIngredients = function() {
    
    // make sure nothing is in the element before starting
    $selectedList.empty();

    // check if there are ingredients that have been selected
    if (app.selectedIngredients.length) {
        app.selectedIngredients.forEach(ingredient => {
            $selectedList.append(`<li>${ingredient.name}</li>`);
        });
    } else {
        $selectedList.html('<li><em>Add ingredients to your smoothie</em></li>');
    }
    
}

// INIT FUNCTION
app.init = () => {
    app.displaySelectedIngredients();
};

// DOCUMENT READY
$(function() {
    app.init();
});