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
}
function replacer(match, p1, offset, string) {
    console.log(p1);
    let str = `${p1[0]}'${p1[2]}`;
    return str;
}

handleEvents();