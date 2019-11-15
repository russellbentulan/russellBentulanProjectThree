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


// Remove a selected ingredient item from the array
app.removeSelectedItem = () => {
    
}

// Display the selected ingredients onto the page
// If there are no selected ingredients, display a message instead
app.displaySelectedIngredients = () => {
    
    // Make sure nothing is in the element before starting
    app.$selectedList.empty();

    // Check if there are ingredients that have been selected
    if (app.selectedIngredients.length) {
        app.selectedIngredients.forEach(ingredient => {

            const htmlToAppend = `
                <li class="selectedIngredientsItem">
                    <button class="removeSelectedIngredient"><i class="fas fa-minus-circle"></i></button>
                    <span class="selectedIngredient">${ingredient.name}<span>
                </li>
            `;

            app.$selectedList.append(htmlToAppend);
        });
    } else {
        app.$selectedList.html('<li><em>Add ingredients to your smoothie</em></li>');
    } 

    // Add an event listener for the ingredient removal button
    $('.removeSelectedIngredient').on('click', function() {

        // Get the container element
        const $parentElement = $(this).closest('li');

        // Get the name of the ingredient
        const ingredientName = $parentElement.find('.selectedIngredient').text();

        // Remove the ingredient from the selectedIngredients list
        for (let i = 0; i < app.selectedIngredients.length; i++) {
            if (ingredientName.trim() === app.selectedIngredients[i].name) {
                app.selectedIngredients.splice(i, 1);
                console.log(app.selectedIngredients)
            }
        }

        // Remove the item from the DOM
        $parentElement.remove();
    });
}

// INIT FUNCTION
app.init = () => {

    // CACHE SELECTORS
    app.$addButton = $('addIngredientButton');
    app.$selectedList = $('.selectedIngredients');

    // Setting these later on
    app.$removeIngredient;

    app.displaySelectedIngredients();
};

// DOCUMENT READY
$(function() {
    app.init();
});