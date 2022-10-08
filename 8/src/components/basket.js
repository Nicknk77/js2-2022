"use strict"

const aBasket = document.querySelector('.header__cart')
aBasket.addEventListener('click', event => {
    document.querySelector('.basket').classList.toggle('basket_visible');
    event.preventDefault();
})



const basket = {
    items: [],
    container: null,
    containerTotal: null,
    total: 0,

    init: function () {
        this.container = document.querySelector('.basket-list');
        this.containerTotal = document.querySelector('.basket_total_push');
        this._handleEvents();
    },

    _render() {
        let str = ``;
        this.items.forEach((data, index) => {
            str += `
        <div class="basket__item" data-name="${data.nameBasketItem}" data-qty="${data.qty}" 
        data-img=${data.img} data-price=${data.price}>
                            <img src="${data.img}" alt="picture">
                            <div class="basket__item-info">
                                <h4>${data.nameBasketItem}</h4>
                                <div class="product-stars" style="display: flex;">
                                    <img src="../src/assets/img/starYellow.png" alt="star">
                                    <img src="../src/assets/img/starYellow.png" alt="star">
                                    <img src="../src/assets/img/starYellow.png" alt="star">
                                    <img src="../src/assets/img/starYellow.png" alt="star">
                                    <img src="../src/assets/img/starYellow.png" alt="star">
                                </div>
                                <div class="basket__quantity-block">
                                    <span class="spanQty">${data.qty}</span> x <span>$${data.price}</span>
                                </div>
                            </div>
                            <a href="#" class="basket__item-delete">
                                <i class="fas fa-times-circle forDeleteEvent" data-name="${data.nameBasketItem}"></i>
                            </a>
                        </div>`
        });
        this.container.innerHTML = str;
    },

    _handleEvents() {
        document.querySelector('.featured-items').addEventListener('click', event => {
            event.preventDefault();
            let dataSet;
            if (event.target.classList.contains('forAddToCart')) {
                dataSet = (event.target.tagName === 'IMG') ?
                    event.target.parentNode.dataset : dataSet = event.target.dataset;
                dataSet = this._getDataset(dataSet);

                if (this._checkBasket(document.querySelector('.basket-list'), dataSet.name)) {
                    this._checkBasket(document.querySelector('.basket-list'), dataSet.name).qty;
                    this._changeQty(this.items, dataSet.name);

                } else {
                    this.items.push(this._createNewBasketItem(dataSet.name, dataSet.price, dataSet.img, 1));
                }
                this._render();
                this.containerTotal.textContent = `$${this._getTotal(this.items).toFixed(2)}`;
            };
        });
        document.querySelector('.basket').addEventListener('click', event => {
            if (event.target.classList.contains('forDeleteEvent')) {
                this._minusOne(this.items, event.target.dataset.name);
                this._render();
                this.containerTotal.textContent = `$${this._getTotal(this.items).toFixed(2)}`;
            }
        })
    },

    _changeQty(items, name) {
        return items.map(element => {
            if (element.nameBasketItem === name)
                element.qty++;
        });
    },

    _minusOne(items, name) {
        return items.map((element, index, arr) => {
            if (element.nameBasketItem === name) {
                if (element.qty > 1) element.qty--;
                else arr.splice(index, 1);
            }
        });
    },

    /**
    * Для подсчета суммы покупок в корзине
    */
    _getTotal(items) {
        let total = 0;
        items.forEach(el => {
            total += el.qty * el.price;
        });
        return total;
    },

    /**
     * Создает список товаров из того что уже отрисовано в корзине
     */
    _getBasketItems(container) {
        let items = [];
        if (container.hasChildNodes()) {
            for (let i = 0; i < container.children.length; i++) {
                let dataS = this._getDataset(container.children[i].dataset);
                items[i] = this._createNewBasketItem((dataS.name, dataS.price, dataS.img, dataS.qty));
            }
        }
        return items;
    },

    /**
     * Создает один объект-товар для корзины 
     */
    _createNewBasketItem(name, price, img, qty) {
        return {
            nameBasketItem: name,
            img: img,
            price: price,
            qty: qty
        };
    },

    /**
     * Проверяет есть ли уже этот товар в корзине
     */

    _checkBasket(container, item) {
        if (container.hasChildNodes()) {
            for (let i = 0; i < container.children.length; i++) {
                if (container.children[i].dataset.name === item) {
                    return true;
                }
            }
        }
        return false;
    },

    /**
     ф-я из псевдообъекта dataset делает объект (может есть готовая ф-я?)
     */
    _getDataset(data) {
        let resData = {};
        for (let prop in data) {
            resData[prop] = data[prop];
        }
        return resData;
    }

};
basket.init();