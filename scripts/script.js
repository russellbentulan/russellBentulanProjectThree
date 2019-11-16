// NAMESPACE OBJECT
const app = {};

// INGREDIENT INFORMATION
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

// GLOBAL VARIABLES
app.selectedIngredients = [];

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
            }
        }

        // Remove the item from the DOM
        $parentElement.remove();
    });
}


// Display all of the ingredient information inside a new element
app.displayIngredientInfo = function() {
    // Clear the element each time a new ingredient is chosen
    app.$infoContainer.empty();

    // Get the ingredient name that was just clicked
    const ingredientName = $(this).text().trim();

    // Get the information for the ingredient
    const ingredientInfo = app.ingredients.find(ingredient => ingredient.name === ingredientName);

    // Display a list of ingredient nutritional information
    const nutrientsHtml = ingredientInfo.nutrients.map(nutrient => `<li class="ingredientInfoItem">${nutrient}</li>`);

    // Display all of the ingredient information
    const htmlToAppend = `
        <article class="ingredientInfo">
            <div class="ingredientInfoImg">
                <img src="./assets/ingredientPictures/${ingredientInfo.img}" alt="${ingredientInfo.name}, a ${ingredientInfo.type} ingredient for smoothies">
            </div>
            <div class="ingredientInfoText">
                <h3 class="ingredientInfoTitle">${ingredientInfo.name}</h3>
                
                <ul class="ingredientInfoList">
                    ${nutrientsHtml.join('\n')}
                </ul>
            </div>
        </article>
    `;

    app.$infoContainer.append(htmlToAppend);
}

// Display all available ingredients
// Disable elements that are already chosen by the user
app.displayAvailableIngredients = () => {
    // Make sure nothing is in the element before starting
    app.$availabeContainer.empty();

    // Display all of the ingredient names according to category
    const ingredientCategories = ['fruit', 'thickener', 'liquid', 'mixin'];
    ingredientCategories.forEach(category => {
        const htmlToAppend = `
            <section class="availableIngredientsCategory">
                <h3 class="availableIngredientsTitle">${category}</h3>
                <ul class="availableIngredients" id="${category}Category"></ul>
            </section>
        `;
        app.$availabeContainer.append(htmlToAppend);
    });

    const $parentElement = $('.availableIngredients').closest('section');

    // Show all ingredients, disable the ingredients selected by the user
    app.ingredients.forEach(ingredient => {

        // check if the object exists in the selectedIngredients array
        // change the status of the button if the ingredient is already selected
        let status = '';
        const selected = app.selectedIngredients.filter(selectedIngredient => selectedIngredient.name === ingredient.name);
        if (selected.length) {
            status = 'disabled';
        }

        // append the item to the appropriate category list
        const htmlToAppend = `
            <li class="availableIngredientsItem">
                <button class="availableIngredientsButton" ${status}>${ingredient.name}</button>
            </li>
        `;
        $parentElement.find(`#${ingredient.type}Category`).append(htmlToAppend);
    });
    
    // watch for a click on each ingredient
    $('.availableIngredientsButton').on('click', app.displayIngredientInfo);
}

// INIT FUNCTION
app.init = () => {
    // CACHE SELECTORS
    app.$addButton = $('.addIngredientButton');
    app.$selectedList = $('.selectedIngredients');
    app.$availabeContainer = $('.availableIngredientsContainer');
    app.$infoContainer = $('.ingredientInfoContainer');

    app.displaySelectedIngredients();

    // EVENT LISTENERS
    // DISPLAY a list of ingredients the user
    app.$addButton.on('click', app.displayAvailableIngredients);
};

// DOCUMENT READY
$(function() {
    app.init();
});