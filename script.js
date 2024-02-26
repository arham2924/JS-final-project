//https://api.edamam.com/search?q=dinner&app_id=245ec72d&app_key=042a05f1165c7e87ccd2dbaafa8f7535&to=20

const recipeListEl = document.querySelector(".recipe-list");
const searchInput = document.querySelector('data-search')

async function main() {
  const recipes = await fetch("https://api.edamam.com/search?q=dinner&app_id=245ec72d&app_key=042a05f1165c7e87ccd2dbaafa8f7535&to=100");
  const recipeData = await recipes.json();
  const recipeListEl = document.querySelector(".recipe-list");
  recipeListEl.innerHTML = recipeData.hits.map(hit => recipeHTML(hit.recipe)).join("");
}

main();


function recipeHTML(recipe) {
    const labelsHtml = recipe.healthLabels.map(label => `<span class="label-item">${label}</span>`).join('');
    const ingredientsHtml = recipe.ingredientLines.map(ingredient => `<span class="ingredient-item">${ingredient}</span>`).join('')
    
    return `
    <div class="recipe-card">
        <div class="recipe-card__container">
            <h3 class="recipe__title">${recipe.label}</h3>
            <figure class="recipes__img">
                <img src="${recipe.image}" alt="${recipe.label}">
            </figure>
            <div class="recipe__texts">
            <div class="recipe__text">
            <p class="recipe__label">Health Labels</p>
            <p class="recipe__labels">${labelsHtml}</p>
            </div>
            <div class="recipe__text">
            <p class="recipe__ingredient">Ingredients</p>
            <p class="recipe__ingredients">${ingredientsHtml}</p>
            </div>
            </div>
        </div>
    </div>
    `;
}


function searchFunction() {
    var input = document.getElementById("search-input").value.toLowerCase(); 
    var recipeCards = document.querySelectorAll(".recipe-card"); 

    for (var i = 0; i < recipeCards.length; i++) {
        let titleElement = recipeCards[i].querySelector(".recipe__title"); 
        let titleText = titleElement.textContent || titleElement.innerText; 

        if (titleText.toLowerCase().includes(input)) {
            recipeCards[i].style.display = ""; 
        } 
        else {
            recipeCards[i].style.display = "none"; 
        }
    }
}
