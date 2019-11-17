// Global namespacing object
const app = {};

// Ingredient list
app.ingredients = [
    {
        name: 'strawberries',
        type: 'fruit',
        nutrients: ['folate', 'potassium', 'fiber', 'vitamin c'],
        img: 'strawberries.jpg'
    },
    {
        name: 'blueberries',
        type: 'fruit',
        nutrients: ['vitamin e', 'folate', 'magnessium', 'postassium', 'fiber', 'vitamin c', 'vitamin k', 'manganese'],
        img: 'blueberries.jpg'
    },
    {
        name: 'blackberries',
        type: 'fruit',
        nutrients: ['vitamin e', 'folate', 'magnesium', 'potassium', 'fiber', 'vitamin c', 'vitamin k', 'manganese'],
        img: 'blackberries.jpg'
    },
    {
        name: 'banana',
        type: 'fruit',
        nutrients: ['fiber', 'vitamin c', 'potassium', 'manganese', 'vitamin b6'],
        img: 'banana.jpg'
    },
    {
        name: 'pineapple',
        type: 'fruit',
        nutrients: ['thiamin', 'vitamin b6', 'copper', 'vitamin c', 'manganese'],
        img: 'pineapple.jpg'
    },
    {
        name: 'mango',
        type: 'fruit',
        nutrients: ['fiber', 'vitamin b6', 'vitamin a', 'vitamin c'],
        img: 'mango.jpg'
    },
    {
        name: 'peach',
        type: 'fruit',
        nutrients: ['fiber', 'vitamin a', 'niacin', 'potassium', 'vitamin c'],
        img: 'peach.jpg'
    },
    {
        name: 'plain yogurt',
        type: 'thickener',
        nutrients: ['protein', 'riboflavin', 'calcium', 'phosphorus'],
        img: 'plainYogurt.jpg'
    },
    {
        name: 'peanut butter',
        type: 'thickener',
        nutrients: ['niacin', 'manganese'],
        img: 'peanutButter.jpg'
    },
    {
        name: 'almond butter',
        type: 'thickener',
        nutrients: ['magnesium', 'manganese'],
        img: 'almondButter.jpg'
    },
    {
        name: 'almond milk',
        type: 'liquid',
        nutrients: ['vitamin e', 'riboflavin', 'magnesium', 'calcium', 'potassium'],
        img: 'almondMilk.jpg'
    },
    {
        name: 'coconut milk',
        type: 'liquid',
        nutrients: ['menganese'],
        img: 'coconutMilk.jpg'
    },
    {
        name: 'whole milk',
        type: 'liquid',
        nutrients: ['vitamin d', 'calcium', 'phosphorus'],
        img: 'wholeMilk.jpg'
    },
    {
        name: 'spinach',
        type: 'mixin',
        nutrients: ['niacin', 'zinc', 'fiber', 'protein', 'vitamin a', 'vitamin c', 'vitamin e', 'vitamin k', 'thiamin', 'robiflavin', 'vitamin b6', 'folate', 'calcium', 'iron', 'magnesium', 'potassium'],
        img: 'spinach.jpg'
    },
    {
        name: 'kale',
        type: 'mixin',
        nutrients: ['fiber', 'protein', 'thiamin', 'riboflavin', 'folate', 'iron', 'magnesium', 'vitamin a', 'vitamin c', 'vitamin k', 'vitamin b6', 'calcium', 'potassium', 'copper', 'manganese'],
        img: 'kale.jpg'
    },
    {
        name: 'flax seed',
        type: 'mixin',
        nutrients: ['fiber', 'protein', 'thiamine', 'copper', 'magnesium', 'phosphorous'],
        img: 'flaxSeed.jpg'
    }
];

// User selected ingedients
// Fill when the user clicks the [ADD INGREDIENT] button
app.selectedIngredients = [];

// Function: Display Selected Ingredients
// Displays the user's selected ingredients
app.displaySelectedIngredients = () => {
    
    // Empty the container element
    app.$selectedList.empty();

    // Check if there are ingredients that have been selected
    if (app.selectedIngredients.length) {
        // Display the ingredients that are selected
        app.selectedIngredients.forEach(ingredient => {

            const htmlToAppend = `
                <li class="selectedIngredientsItem" data-ingredient="${ingredient.name}">
                    <button class="removeSelectedIngredient"><i class="fas fa-minus-circle"></i></button>
                    <span class="selectedIngredient">${ingredient.name}<span>
                </li>
            `;

            app.$selectedList.append(htmlToAppend);
        });
    } else {
        // Display a message when there are no selected ingredients
        app.$selectedList.html('<li class="selectedIngredientsItem"><em>Add ingredients to your smoothie</em></li>');
    }

    // Event handler for the [-] button
    $('.removeSelectedIngredient').on('click', app.removeSelectedIngredient);
}

// Function: Display Ingredient Info
// Places all the ingredient information onto the page
app.displayIngredientInfo = function() {
    // Empty the parent element
    app.$infoContainer.empty();

    // Get the ingredient name that was just clicked
    const ingredientName = $(this).text().trim();

    // Get the information for the ingredient
    const ingredientInfo = app.ingredients.find(ingredient => ingredient.name === ingredientName);

    // Save a list of ingredient nutritional information
    const nutrientsHtml = ingredientInfo.nutrients.map(nutrient => `<li class="ingredientInfoItem">${nutrient}</li>`);

    const htmlToAppend = `
        <article class="ingredientInfo">
            <header>
                <div class="ingredientInfoImg">
                    <img src="./assets/ingredientPictures/${ingredientInfo.img}" alt="${ingredientInfo.name}, a ${ingredientInfo.type} ingredient for smoothies">
                </div>
                <h3 class="ingredientInfoTitle">${ingredientInfo.name}</h3>
            </header>
                
            <section class="ingredientInfoText">
                <ul class="ingredientInfoList">
                    ${nutrientsHtml.join('\n')}
                </ul>
                <button class="ingredientInfoButton" data-ingredient="${ingredientInfo.name}">Add ${ingredientInfo.name}</button>
            </section>
        </article>
    `;

    app.$infoContainer.append(htmlToAppend);

    // Event handler for the [ADD ingredient] button
    $('.ingredientInfoButton').on('click', app.addSelectedIngredient);
}

// Function: Add Selected Ingredient
// Adds the user's selection to the ingredients list and updates the page
app.addSelectedIngredient = function () {
    // Get the ingredient name from the data attribute
    const ingredientName = $(this).data('ingredient');

    // Get the corresponding object from the ingredients list
    const ingredientInfo = app.ingredients.find(ingredient => ingredient.name === ingredientName);

    // Add the item to the selectedIngredients list
    app.selectedIngredients.push(ingredientInfo);
    
    // Disable the corresponding button in the selected ingredients element
    $(`.availableIngredientsButton:contains(${ingredientName})`).attr('disabled', true);
    
    // Refresh the selected ingredients element
    app.displaySelectedIngredients();

    // Disable this button so it cannot be added twice
    $(this).attr('disabled', true);
}

// Function: Remove Selected Ingredient
// Adds the user's selection to the ingredients list and updates the page
app.removeSelectedIngredient = function () {
    // Get the parent element
    const $parentElement = $(this).closest('li');

    // Get the name of the ingredient from the data attribute
    const ingredientName = $parentElement.data('ingredient');

    // Remove the ingredient from the selectedIngredients list
    for (let i = 0; i < app.selectedIngredients.length; i++) {
        if (ingredientName === app.selectedIngredients[i].name) {
            app.selectedIngredients.splice(i, 1);
        }
    }

    // Remove the element from the page
    $parentElement.remove();

    // Refresh the selected ingredients and available ingredients element
    app.displayAvailableIngredients();
    app.displaySelectedIngredients();
}

// Function: Display Available Ingredients
// Places all availalbe ingredients onto the page
app.displayAvailableIngredients = () => {
    // Empty the container element
    app.$availabeContainer.empty();

    // Save a list of all the ingredient categories
    const ingredientCategories = ['fruit', 'thickener', 'liquid', 'mixin'];

    // Display all of the ingredients according to their category type
    ingredientCategories.forEach(category => {
        const htmlToAppend = `
            <section class="availableIngredientsCategory">
                <h3 class="availableIngredientsTitle">${category}</h3>
                <ul class="availableIngredients" id="${category}Category"></ul>
            </section>
        `;
        app.$availabeContainer.append(htmlToAppend);
    });

    // Get the parent element
    const $parentElement = $('.availableIngredients').closest('section');

    // Puts all of the ingredients into the parent element
    app.ingredients.forEach(ingredient => {

        // Check if the object exists in the selectedIngredients array
        // Disable the button if it has already been selected by the user
        let status = '';
        const selected = app.selectedIngredients.filter(selectedIngredient => selectedIngredient.name === ingredient.name);
        if (selected.length) {
            status = 'disabled';
        }

        // Put the item into the appropriate category list element
        const htmlToAppend = `
            <li class="availableIngredientsItem">
                <button class="availableIngredientsButton" ${status}>${ingredient.name}</button>
            </li>
        `;
        $parentElement.find(`#${ingredient.type}Category`).append(htmlToAppend);
    });
    
    // Event handler for the [INGREDIENT] button
    $('.availableIngredientsButton').on('click', app.displayIngredientInfo);
}

// Function: Init
// Initializes the application
app.init = () => {
    // Caching selectors
    app.$addButton = $('#addIngredientButton');
    app.$selectedList = $('#selectedList');
    app.$availabeContainer = $('#availabeContainer');
    app.$infoContainer = $('#infoContainer');

    app.displaySelectedIngredients();

    // Styling WIP
    app.displayAvailableIngredients();

    // Event handler for the [ADD AN INGREDIENT] button
    app.$addButton.on('click', app.displayAvailableIngredients);
};

$(function() {
    app.init();
});