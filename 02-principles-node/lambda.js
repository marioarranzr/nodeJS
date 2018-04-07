let sum = (a, b) => {
    return a + b;
}

let sum2 = (a, b) => a + b;

console.log(sum(10, 20));
console.log(sum2(10, 20));

function sayHello() {
    return `Hello world`;
}

let sayHello2 = () => `Hello world`;
let sayHello3 = (who) => `Hello ${who}`;

console.log(sayHello());
console.log(sayHello2());
console.log(sayHello3('world'));