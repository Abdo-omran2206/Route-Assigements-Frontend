var mealImg = document.getElementById("meal-img");
var mealTitle = document.getElementById("meal-title");
var mealDescription = document.getElementById("meal-description");
var badge1 = document.getElementById("badge-1");
var badge2 = document.getElementById("badge-2");
var prepTime = document.getElementById("prepTime");
var servings = document.getElementById("servings");
var cookTime = document.getElementById("cookTime");
var rate = document.getElementById("rate");
var reviews = document.getElementById("reviews");
var overtime = document.getElementById("overtime");

function randomNum() {
  return Math.floor(Math.random() * (meals.length + 1));
}

function renderIngredients(ingredients) {
  var ingredientsBox = document.getElementById("ingredients-container");
  ingredientsBox.innerHTML = "";

  for (let i = 0; i < ingredients.length; i++) {
    ingredientsBox.innerHTML += `
    <div class="d-flex align-items-center gap-2">
  <div class="ingredients-circle fs-8 fs-md-6 rounded-circle text-white">${i + 1}</div>
  <span class="fs-7">${ingredients[i]}</span>
</div>

    `;
  }
}

function renderInstructions(instructions) {
  var instructionsBox = document.getElementById("instructions-container");
  instructionsBox.innerHTML = "";

  for (let i = 0; i < instructions.length; i++) {
    instructionsBox.innerHTML += `
 <div class="d-flex align-items-center gap-2">
  <div class="instructions-circle rounded-4 fw-bold fs-5 text-white">
    ${i + 1}
  </div>
  <div>
    <p class="fs-7 m-0">${instructions[i]}</p>
  </div>
</div>
    `;
  }
}

function renderNutrition(nutrition) {
  var nutritionList = [
    "calories",
    "protein",
    "carbs",
    "fat",
    "fiber",
    "sodium",
  ];
  for (let i = 0; i < nutritionList.length; i++) {
    document.getElementById(`${nutritionList[i]}-value`).innerText =
      nutrition[nutritionList[i]];
  }
}

function renderTips(tips) {
  var tipsBox = document.getElementById("tips-container");
  tipsBox.innerHTML = "";

  for (let i = 0; i < tips.length; i++) {
    tipsBox.innerHTML += `
<div class="tips-box p-3 d-flex align-items-center gap-2">
  <div>
    <i class="fa-solid fa-circle-check"></i>
  </div>
  <div>
    <span class="fs-md-6 fs-7">${tips[i]} </span>
  </div>
</div>

    `;
  }
}

function renderMeal(mealNum) {
  mealImg.src = meals[mealNum].imgCover;
  mealImg.alt = meals[mealNum].image;
  mealTitle.innerText = meals[mealNum].name;
  mealDescription.innerText = meals[mealNum].description;
  badge1.innerText = meals[mealNum].difficulty;
  badge2.innerText = meals[mealNum].category;
  prepTime.innerText = meals[mealNum].prepTime;
  cookTime.innerText = meals[mealNum].cookTime;
  servings.innerText = meals[mealNum].servings;
  rate.innerText = meals[mealNum].ratingsAverage;
  reviews.innerText = `(${meals[mealNum].ratingsQuantity} reviews)`;

  if (meals[mealNum].totalTime > 45) {
    overtime.classList.remove("d-none");
    overtime.classList.add("d-flex");
  } else {
    overtime.classList.add("d-none");
    overtime.classList.remove("d-flex");
  }

  renderIngredients(meals[mealNum].ingredients);
  renderInstructions(meals[mealNum].instructions);
  renderTips(meals[mealNum].tips);
  renderNutrition(meals[mealNum].nutrition);
}

function randomBtn() {
  renderMeal(randomNum());
  if (window.innerWidth < 768) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

(function () {
  renderMeal(randomNum());
})();
