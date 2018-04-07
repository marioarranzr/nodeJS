let employees = [{
    id: 1,
    name: 'Mario'
}, {
    id: 2,
    name: 'Melissa'
}, {
    id: 3,
    name: 'Juan'
}];

let salaries = [{
    id: 1,
    amount: 1000
}, {
    id: 2,
    amount: 2000
}];

let getEmployee = (id, callback) => {
    let employeeDB = employees.find(employee => employee.id == id);
    if (!employeeDB) {
        callback(`Employee with the Id ${id} doesn't exist in DB`);
    } else {
        callback(null, employeeDB);
    }
}

let getSalarie = (employee, callback) => {
    let salarieDB = salaries.find(salarie => salarie.id == employee.id);
    if (!salarieDB) {
        callback(`Salarie of the Employee ${employee.name} doesn't exist in DB`);
    } else {
        callback(null, {
            id: employee.id,
            name: salarieDB.name,
            salarie: salarieDB.amount
        });
    }
}

let getEmployeeInfoByEmployee = (err, employee) => {
    if (err) {
        return console.log(err);
    }
    console.log(employee);
}

let getEmployeeInfoCompleteByEmployee = (err, employee) => {
    if (err) {
        return console.log(err);
    }
    getSalarie(employee, (err, salarie) => {
        if (err) {
            return console.log(err);
        }
        console.log(`Salarie of the Employee ${salarie.name} (id=${salarie.id}) is ${salarie.salarie}`);
    });
}

getEmployee(1, (err, employeeDB) => {
    getEmployeeInfoByEmployee(err, employeeDB);
});

getEmployee(11, (err, employeeDB) => {
    getEmployeeInfoByEmployee(err, employeeDB);
});

getEmployee(1, (err, employeeDB) => {
    getEmployeeInfoCompleteByEmployee(err, employeeDB);
});

getEmployee(2, (err, employeeDB) => {
    getEmployeeInfoCompleteByEmployee(err, employeeDB);
});

getEmployee(11, (err, employeeDB) => {
    getEmployeeInfoCompleteByEmployee(err, employeeDB);
});