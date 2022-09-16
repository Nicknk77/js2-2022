"use strict"

// массив начинок
const staffing = [
    {
        title: 'С сыром',
        price: 10,
        calories: 20
    },
    {
        title: 'С салатом',
        price: 20,
        calories: 5
    },
    {
        title: 'С картофелем',
        price: 15,
        calories: 10
    }
];

// массив размеров
const size = [
    {
        name: 'Маленький',
        price: 50,
        calories: 20,
    },
    {
        name: 'Большой',
        price: 100,
        calories: 40,
    }
];

// массив добавок
const topping = [
    {
        title: 'Приправа',
        price: 15,
        calories: 0
    },
    {
        title: 'Майонез',
        price: 20,
        calories: 5
    }
]

// массив для первоначального заполнения меню ресторана  
// (для тестирования - сейчас не нужен)
const burgers = [
    {
        size: size[0],
        staffing: staffing[0],
    },
    {
        size: size[1],
        staffing: staffing[2],
    },
    {
        size: size[1],
        staffing: staffing[1],
    },
    {
        size: size[1],
        staffing: staffing[0],
    },
    {
        size: size[0],
        staffing: staffing[2],
    }
];

// собираем по форме наш бургер и возвращаем объект с его свойствами
function getParams() {
    let top = [];
    let block = document.querySelector('.chooseBurger');
    let siz = size[block.querySelector('input[name="burgerSize"]:checked').value];
    let staff = staffing[+block.querySelector('input[name="staffing"]:checked').value];
    let topping1 = block.querySelector('#topPepper').checked ? topping[0] : null;
    let topping2 = block.querySelector('#topMayonnaise').checked ? topping[1] : null;
    if (topping1) top.push(topping1);
    if (topping2) top.push(topping2);
    return { siz, staff, top };
}

class Mcdonalds {
    constructor() {
        this.menu = [];
        this.totalPrice = 0

    }

    init() {
        this._handleEvents();
        Burger.calculatePrice();
        Burger.calculateCalories();
    }

    _renderMenu() {
        let str = '';
        this.menu.forEach((el, index) => {
            let burger = new Burger(el.size, el.staffing);
            burger.id = index;
            burger.topping = el.topping;
            burger.price = el.price;
            burger.calories = el.calories;
            str += burger._renderBurger();
        });
        document.querySelector('.ourMenu').innerHTML = str;
        this._getTotal();
        document.querySelector('.totalPrice').innerHTML = this.totalPrice;

    }

    _handleEvents() {
        document.querySelector('.chooseBurger').addEventListener('click', event => {
            if (event.target.classList.contains('butAddToMenu')) {
                event.preventDefault();
                let item = getParams();
                let size = item.siz;
                let staffing = item.staff;
                let burger = new Burger(size, staffing);
                let top2 = '';
                for (let i = 0; i < item.top.length; i++) top2 += `${item.top[i].title}<br>`;
                burger.topping = top2;
                burger.price = Burger.calculatePrice();
                burger.calories = Burger.calculateCalories();
                this.menu.push(burger);
                this._renderMenu();
            }
            if (!event.target.classList.contains('butAddToMenu')) {
                Burger.calculatePrice();
                Burger.calculateCalories();
            }
        });
        document.querySelector('.ourMenu').addEventListener('click', event => {
            if (event.target.classList.contains('delFromMenu')) {
                event.preventDefault();
                const ind = event.target.dataset.id;
                this._delFromMenu(ind);
                this._renderMenu();
            }
        })
    }

    _delFromMenu(id) {
        this.menu.forEach((el, index, arr) => {
            if (index == id) {
                arr.splice(index, 1);
            }
        })
    }

    _getTotal() {
        this.totalPrice = 0;
        this.menu.forEach(el => {
            this.totalPrice += el.price;
        })
    }

}

class Burger {
    constructor(size = {}, stuffing = {}) {
        this.size = size;
        this.staffing = stuffing;
    }
    _renderBurger() {
        return `
            <div class="burgerItem">
                <img src="img/burger.jpg" alt="taste this burger">
                <p><b>${this.size.name}</b></p>
                <p>${this.staffing.title}</p>
                <p>${this.topping}</p>
                <p>${this.calories} калорий</p>
                <p>${this.price} денег</p>
                <a class="delFromMenu" href="#"  data-id="${this.id}"><i class="far fa-times-circle"></i> Удалить из меню</a>
                <hr>
            </div>
        `;

    }

    // Узнать цену бургера
    static calculatePrice() {
        let burgerPrice = 0;
        let containerPrice = document.querySelector('#getPrice');
        let top = document.querySelector('#topPepper').checked ? topping[0].price : 0;
        top += document.querySelector('#topMayonnaise').checked ? topping[1].price : 0;
        burgerPrice += +size[document.querySelector('input[name="burgerSize"]:checked').value].price +
            +staffing[document.querySelector('input[name="staffing"]:checked').value].price + top;
        ;
        containerPrice.value = burgerPrice;
        return burgerPrice;
    }

    // Узнать калорийность со всеми добавками
    static calculateCalories() {
        let caloriesBurger = 0;
        let containerCalories = document.querySelector('#getCalories');
        let topCal = document.querySelector('#topPepper').checked ? topping[0].calories : 0;
        topCal += document.querySelector('#topMayonnaise').checked ? topping[1].calories : 0;
        caloriesBurger += +size[document.querySelector('input[name="burgerSize"]:checked').value].calories +
            +staffing[document.querySelector('input[name="staffing"]:checked').value].calories + topCal;
        ;
        containerCalories.value = caloriesBurger;
        return caloriesBurger;
    }
}

let cafe = new Mcdonalds();
cafe.init();