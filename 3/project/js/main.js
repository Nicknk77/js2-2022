const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = data;
                // console.log(data[0].price);
                this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts() {

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            //            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn" data-id="${this.id}">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();

// ------------------------------- My code -----------------------------------

const basket = document.querySelector('div.cart');

class BasketList {
    constructor(container = '.cart') {
        this.container = container;
        this.basket = {};
        this._getBasket()
            .then(data => {
                this.basket = data;
                this._render()
            });
        this._handleEvents();
    }

    _getBasket() {

        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });

    }
    // calcSum() {
    //     return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    // }
    _render() {
        const blockBasket = document.querySelector(this.container);
        let str = '';
        for (let item of this.basket.contents) {
            const basketObj = new BasketItem(item);
            str += basketObj._render();
        }
        blockBasket.innerHTML = str;
    }
    _handleEvents() {
        document.querySelector('.products').addEventListener('click', event => {
            if (event.target.classList.contains('buy-btn')) {
                let id = event.target.dataset.id;
                for (let i = 0; i < this.basket.contents.length; i++) {
                    if (id == this.basket.contents[i].id_product) {
                        this.basket.contents[i].quantity++;
                        this._render();
                    }
                }
            }
        })
        document.querySelector('div.cart_wrapper').addEventListener('click', event => {
            if (event.target.classList.contains('btn-cart')) {
                basket.classList.toggle('cart-unvisibility');
            }
            if (event.target.classList.contains('erase-btn')) {
                let id = event.target.dataset.id;
                for (let i = 0; i < this.basket.contents.length; i++) {
                    if (id == this.basket.contents[i].id_product) {
                        if (this.basket.contents[i].quantity == 1) this.basket.contents[i].quantity = 11;
                        this.basket.contents[i].quantity--;
                        this._render();
                    }
                }
            }
        });
    }
}


class BasketItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.quantity = product.quantity;
        this.img = img;
    }
    _render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $ <span class="qtyInBas">${this.quantity} (кол-во)</span></p>
                        <button class="erase-btn" data-id="${this.id}">Удалить одну</button>
                </div>
            </div>`
    }
}

let Basket = new BasketList();