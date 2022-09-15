"use strict"

const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50}
];
//Функция для формирования верстки каждого товара
const renderProduct = (product,img='https://via.placeholder.com/200x150') => {
    return `<div class="product-item">
                <img src="${img}" alt="img">
                <h3>${product.title}</h3>
                <p>${product.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    document.querySelector('.products').innerHTML =
        (list.map(product => renderProduct(product))).join('');
};
function showSum(obj) {
    let sum = 0;
    obj.forEach(el => {
        sum += el.price;
    })
    return sum;
}

//----------------------------------------------------- Корзина -------------------------------------------------
class Basket {
    constructor() {
        this.items = [];
        this.total = 0;
        this.containerBasket = null;
    }

    init() {
        this.containerBasket = document.querySelector('.btn-cart');
        this._handleEvents();
        console.log('initialization of Basket');
    }
    /**
     * создает верстку и заносит в нужный блок корзину
     * добавляем свойство каждого товара - количество в корзине
     * */
    _renderBasket() {
        let str = '';
        this.items.forEach(el => {
            let item = new BasketItem(el.title, el.price, el.img);
            item.qty = 1;
            str += item._renderItem();
        });
        str += `<div class="totalBasket">$${this.total}</div>`;
        this.containerBasket.innerHTML = str;
    }

    /**
     * сортирует товары в корзине поцене или по алфавиту названия
     * ставим флаг для сортировки (price, title), по умолчанию цена
     * */
    sortBasket(flag = 'price') {
        if (flag === 'price') {
            this.items.sort((a, b) => a.price > b.price ? 1 : -1);
        }
        else if (flag === 'title') {
            this.items.sort((a, b) => a.title > b.title ? 1 : -1);
        }
        return this.items;
    }

    /**
     * считает и возвращает сумму заказа
     * */
    _getSum() {
        this.items(el => {
            this.total += el.price * el.qty;
        });
    }

    /**
     * увеличивает количество данного товара в корзине, title - название товара, basket - корзина
     * поиск происходит по названию товара ( id здесь вряд ли нужен )
     * */
    _addQty(basket, name) {
        basket.forEach( el => {
            if (el.title === name) {
                el.qty++;
            }
        })
    }

    /**
     * уменьшает количество данного товара в корзине, title - название товара, basket - корзина
     * */
    _minusQty(basket, name) {
        basket.forEach( (el, index, arr) => {
            if (el.title === name) {
                if (el.qty > 1) el.qty--;
                else arr.splice(index, 1)
            }
        })
    }

    /**
     * обработчики кликов
     * */
    _handleEvents() {
        document.querySelector(('.products')).addEventListener('click', event => {
            event.preventDefault();
            if (event.target.classList.contains('.buy-btn')) {
                let item = new BasketItem(event.target.dataset.title, event.target.dataset.price,
                    event.target.dataset.img);
                if (this.items.find(el => el.title === item.title)) {
                    this._addQty(this.items, item.title);
                }
                console.log('Добавляем этот товар в корзину');
                this._getSum();
                this._renderBasket()
            }
            if (event.target.classList.contains('.buttonFromCart')) {
                let item = new BasketItem(event.target.dataset.title, event.target.dataset.price,
                    event.target.dataset.img);
                this._minusQty(this.items, item.title);
                console.log('Удаляем этот товар из корзины');
                this._getSum();
                this._renderBasket()
            }
        });
    }
}

//------------------------------------------------- Товар в корзине ----------------------------------------------
class BasketItem {
    constructor(title, price, img) {
        this.title = title;
        this.price = price;
        this.img = img;
    }
    _renderItem() {
        return `<div class="basket-item" data-title="${this.title}" data-price="${this.price}" data-img="${this.img}">
                    <img src="${this.img}" alt="picture">
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                    <p class="itemQty">1</p>        <!-- количество этого товара в корзине -->
                    <a class="buttonFromCart" href="#">Удалить</a>
                </div>`;
    }
}

// Инициализация корзины и обработчиков событий для заполнения корзины и удаления товаров из неё.
new Basket().init();

renderPage(products);
products.forEach(pr => {
    console.log(`Цена товара ${pr.title} = ${pr.price}`);
});
console.log(`\nСумма всех этих товаров = ${showSum(products)}`);
let basket = new Basket();
basket.items = products;
console.log(`\nОтсортировано по названию:`);
console.log(basket.sortBasket('title'));