const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Mouse', price: 20 },
    { id: 3, title: 'Keyboard', price: 200 },
    { id: 4, title: 'Gamepad', price: 50 },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = item => {
    return `<div class="product-item">
                <h3>${item.title}</h3>
                <img src="img/pic.jpg" alt="picture">
                <p>${item.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    let productsList = '';
    list.forEach(item => productsList += renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);

// ЗАПЯТАЯ: чтобы избавиться в верстке от запятых, innerHTML
// теперь присваиваеся не массив, а строка в ф-ции renderPage, но можно было
// и через join('') в строке 21 добавить, наверное так даже лучше, потому что
// productsList так и останется списком товаров, а не строкой.