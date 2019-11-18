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

// Category types
app.categories = ['fruit', 'thickener', 'mixin', 'liquid'];

// User selected ingedients
// Fill when the user clicks the [ADD ingredient.name] button
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
        <div class="wrapper slidingCardContainer flex">
            <header class="slidingCardImgContainer columnLeft">
                <img src="./assets/ingredientPictures/${ingredientInfo.img}" alt="${ingredientInfo.name}, a ${ingredientInfo.type} ingredient for smoothies" class="slidingCardImg">
            </header>
                
            <main class="slidingCardMain ingredientInfo columnRight">
                <button class="slidingCardClose">
                    <i class="fas fa-times"></i>
                </button>
                <h3 class="slidingCardTitle">${ingredientInfo.name}</h3>
                <h3 class="ingredientInfoTitle">Nutritional Information</h3>
                <ul class="ingredientInfoList">
                    ${nutrientsHtml.join('\n')}
                </ul>
                <button class="button buttonDark ingredientInfoButton" data-ingredient="${ingredientInfo.name}">Add ${ingredientInfo.name}</button>
            </main>
        </div>
    `;

    app.$infoContainer.append(htmlToAppend);
    app.$infoContainer.addClass('slidingCardActive');

    // Event listener for the [ADD ingredient] button
    $('.ingredientInfoButton').on('click', app.addSelectedIngredient);

    // Event listener for the [X] button
    $('.slidingCardClose').on('click', app.closeSlidingCard);
}

// Function: Close Sliding Card
// Removes the sliding card from the screen
app.closeSlidingCard = () => {
    app.$slidingCard.removeClass('slidingCardActive');
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

    // Closes the slidingCard element
    app.closeSlidingCard();
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
app.displayAvailableIngredients = function() {
    // Empty the container element
    app.$availableContainer.empty();

    // Get the category that was chosen by the user
    const category = $(this).text().trim();

    // Get the ingredients with the right category
    const ingredientsInCategory = app.ingredients.filter(ingredient => ingredient.type === category);

    // Create the markup for each ingredient
    const ingredientsHtml = ingredientsInCategory.map(ingredient => {

        // Find out if the ingredient has already been chosen by the user
        const selected = app.selectedIngredients.filter(selectedIngredient => selectedIngredient.name === ingredient.name);

        // Disable the ingredient if it's already in the chosen ingredients list
        let status = '';
        if (selected.length) {
            status = 'disabled';
        }

        const htmlToAppend = `
            <li class="availableIngredientsItem">
                <button class="availableIngredientsButton" ${status}>${ingredient.name}</button>
            </li>
        `;
        return htmlToAppend
    });

    // Put the element onto the page
    const htmlToAppend = `
        <section class="availableIngredientsCategory">
            <h3 class="availableIngredientsTitle">${category}</h3>
            <ul class="availableIngredients">
                ${ingredientsHtml.join('\n')}
            </ul>
        </section>
    `;
    app.$availableContainer.append(htmlToAppend);

    // Event listener for the [ingredient.name] buttons
    $('.availableIngredientsButton').on('click', app.displayIngredientInfo);
}

// Function: Display Categories
// Places all category selectors onto the page
app.displayCategories = () => {

    // Empty the container element
    app.$categoriesList.empty();

    // Show a button for each category type
    app.categories.forEach(category => {
        const htmlToAppend = `
            <li class="categoriesItem">
                <button class="categoriesButton button">${category}</button>
            </li>
        `;
        app.$categoriesList.append(htmlToAppend);
    });

    // Event listener for the [category] buttons
    $('.categoriesButton').on('click', app.displayAvailableIngredients);
}

// Function: Init
// Initializes the application
app.init = () => {
    // Caching selectors
    app.$addButton = $('#addIngredientButton');
    app.$selectedList = $('#selectedList');
    app.$availableContainer = $('#availableContainer');
    app.$infoContainer = $('#infoContainer');
    app.$categoriesList = $('#categoriesList');
    app.$slidingCard = $('.slidingCard');

    app.displaySelectedIngredients();

    app.displayCategories();
};

$(function() {
    app.init();
});