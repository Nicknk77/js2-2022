"use strict"

let str = document.querySelector('p').innerHTML;

function handleEvents() {
    document.querySelector('#task-1').addEventListener('click', event => {
        let str2 = str.replace(/'/g, '\"');
        document.querySelector('p').innerHTML = str2;
    })
    document.querySelector('#task-2').addEventListener('click', event => {
        let str2 = str.replace(/'/g, '\"');
        let str3 = str2.replace(/(\w\"\w)/g, replacer);
        document.querySelector('p').innerHTML = str3;
    })
    document.querySelector('#task-3').addEventListener('click', event => {
        event.preventDefault();
        let name = document.querySelector('#name');
        let phone = document.querySelector('#phone');
        let email = document.querySelector('#email');
        checkName(name);
        checkPhone(phone);
        checkEmail(email);
    })
}
function replacer(match, p1, offset, string) {
    console.log(p1);
    let str = `${p1[0]}'${p1[2]}`;
    return str;
}
handleEvents();

function checkName(val) {
    let regexp = /^[а-яА-ЯёЁ]{2,10} ?[а-яА-ЯёЁ]{0,10}$/i;
    checkInput(val, regexp);
}

function checkPhone(val) {
    let regexp = /^\+7\(\d{3}\) ?\d{3}-\d{4}$/;
    checkInput(val, regexp);
}

function checkEmail(val) {
    let regexp = /^[a-zA-Z-_\d]{2,15}\.?([a-zA-Z-_\d]{2,15})?@[a-zA-Z-_\d]{2,15}\.[a-zA-Z]{2,6}$/;
    checkInput(val, regexp);
}

function checkInput(val, regexp) {
    if (!regexp.test(val.value)) {
        val.classList.add('redBorder');
    }
    else val.classList.remove('redBorder');
}