let deadpool = {
    name: 'Wade',
    lastname: 'Winston',
    power: 'Regeneration',
    getName: function() { // or getName() 
        return `${this.name} ${this.lastname} - power: ${this.power}`
    }
}

let { name: firstName, lastname, power } = deadpool;

console.log(`getName: ${deadpool.getName()} `);
console.log(firstName, lastname, power);