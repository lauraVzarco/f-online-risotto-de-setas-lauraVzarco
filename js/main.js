'use strict';

let ingredientlist = document.querySelector('.recipe-ingredients__list');
let itemsNumber = document.querySelector('.items-number-js');
let ingredientprice = document.querySelector('.price-js');
let shippingPrice = document.querySelector('.shipping-js');
let totalPrice = document.querySelector('.total-js');
let buyButton = document.querySelector('.buy-btn');
const selectAllButton = document.querySelector('.select-all-btn');
const unselectAllButton = document.querySelector('.unselect-all-btn');
buyButton.addEventListener('click', alertMsg);
unselectAllButton.addEventListener('click', unselectHandler);
selectAllButton.addEventListener('click', selectHandler);

let items = 0;
let price = 0;
let total = 0;
let shipping = 0;
let ingredientChecks = [];

function updateView() {
    items = 0;
    price = 0;
    shipping = 0;
    total = 0;
    for (let check of ingredientChecks) {
        if (check.checked) { price += Number(check.value); shipping = 7; items += 1; }
    }
    //calculo el total
    total = price + shipping;
    //escribo en los huecos en blanco
    itemsNumber.innerHTML = items;
    ingredientprice.innerHTML = price + '€';
    shippingPrice.innerHTML = shipping + '€';
    totalPrice.innerHTML = total + '€';
    buyButton.innerHTML = 'Comprar por ' + total + '€';
}

//alerta al comprar ingredientes
function alertMsg(e) {
    e.preventDefault();
    if (total !== 0) {
        alert('Gracias por realizar tu Compra');
    } else {
        alert('No puedes comprar si no has seleccionado nada');
    }
}

//select y unselect

function unselectHandler() {
    for (let check of ingredientChecks) {
        check.checked = false;
    }
    updateView();
}

function selectHandler() {
    for (let check of ingredientChecks) {
        check.checked = true;
    }
    updateView();
}
//traer ingredientes

function getRecipeInfo() {
    fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log(json);
            let recipe = json.recipe;
            //Creo los elementos de la lista
            for (let i = 0; i < recipe.ingredients.length; i++) {
                let ingredientCheck = document.createElement('input');
                ingredientCheck.type = 'checkbox';
                ingredientCheck.name = 'ingredients';
                ingredientCheck.value = recipe.ingredients[i].price;
                ingredientCheck.addEventListener('change', updateView);
                //label de la etiqueta
                let labelInput = document.createElement('label');
                labelInput.innerHTML = recipe.ingredients[i].product;
                //datos del ingrediente
                let priceIngredient = document.createElement('div');
                priceIngredient.innerHTML = recipe.ingredients[i].price + recipe.currency;
                let kiloIngredient = document.createElement('div');
                kiloIngredient.innerHTML = recipe.ingredients[i].quantity;
                let brandIngredient = document.createElement('div');
                brandIngredient.innerHTML = recipe.ingredients[i].brand || 'Marca Blanca';
                //meto los elementos dentro de la lista
                ingredientlist.appendChild(ingredientCheck);
                ingredientlist.appendChild(labelInput);
                ingredientlist.appendChild(priceIngredient);
                ingredientlist.appendChild(kiloIngredient);
                ingredientlist.appendChild(brandIngredient);
                //Cada vez que se chequeen los ingredientes se miran los que están chequados para calcular todo
                ingredientChecks.push(ingredientCheck);
            }
        });
}


//llamar funciones
getRecipeInfo();
