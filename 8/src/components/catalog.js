"use strict"
const NAMES = ['MANGO PEOPLE T-SHIRT', 'BANANA PEOPLE T-SHIRT', 'STRAWBERRY PEOPLE T-SHIRT', 'ORANGE PEOPLE T-SHIRT', 'PUMKIN PEOPLE T-SHIRT', 'PINEAPPLE PEOPLE T-SHIRT', 'CUCUMBER PEOPLE T-SHIRT', 'TOMATO PEOPLE T-SHIRT'];
const PRICES = [52, 53, 55, 67, 69, 94, 23, 45];
const IMG = 'https://raw.githubusercontent.com/Nicknk77/img/master/GB_img/infeature';

let catalog = {
    items: [],
    container: null,

    init: function () {
        this.container = document.querySelector('#catalog');
        this.items = getItems();
        this.render();
    },

    render() {
        let str = ``;
        let img = '';
        this.items.forEach((item, index) => {
            img = `${IMG}${index + 1}.jpg`;
            str += `<div class="featured-item">
                        <div class="add-hover-div">
                            <a class="add-hover-div__cart forAddToCart" href="#" data-img="${img}" data-name="${item.productName}" data-price="${item.productPrice}">
                                <img class="forAddToCart" src="../src/assets/img/cart_white.png" alt="cart">Add to Cart
                            </a>
                        </div>
                        <img src="${img}" alt="picture">
                        <a href="#">${item.productName}</a>
                        <div class="price-stars">
                            <h3>$${(item.productPrice).toFixed(3)}</h3>
                            <div class="product-stars">
                                <img src="../src/assets/img/starYellow.png" alt="star">
                                <img src="../src/assets/img/starYellow.png" alt="star">
                                <img src="../src/assets/img/starYellow.png" alt="star">
                                <img src="../src/assets/img/starYellow.png" alt="star">
                                <img src="../src/assets/img/starYellow.png" alt="star">
                            </div>
                        </div>
                    </div>`
        });
        this.container.innerHTML = str;
    }
}

function getItems() {
    return NAMES.map((name, index) => createNewItem(name, PRICES[index]))
}

function createNewItem(name, price) {
    return {
        productName: name,
        productPrice: price
    }
}

catalog.init();