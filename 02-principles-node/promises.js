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

let getEmployee = (id) => {
    return new Promise((resolve, reject) => {
        let employeeDB = employees.find(employee => employee.id == id);
        if (!employeeDB) {
            reject(`Employee with the Id ${id} doesn't exist in DB`);
        } else {
            resolve(employeeDB);
        }
    });
}

let getSalarie = (employee) => {
    return new Promise((resolve, reject) => {
        let salarieDB = salaries.find(salarie => salarie.id == employee.id);
        if (!salarieDB) {
            reject(`Salarie of the Employee ${employee.name} doesn't exist in DB`);
        } else {
            resolve({
                id: employee.id,
                name: employee.name,
                salarie: salarieDB.amount
            });
        }
    });
}

getEmployee(1)
    .then(
        employee => console.log('Employee', employee),
        err => console.log(err)
    );

getEmployee(11)
    .then(
        employee => console.log('Employee', employee),
        err => console.log(err)
    );

getEmployee(1)
    .then(employee => {
        getSalarie(employee).then(employeeInfo => {
            console.log(`Salarie of the Employee ${employeeInfo.name} (id=${employeeInfo.id}) is ${employeeInfo.salarie}`);
        }, err => console.log(err));
    }, err => console.log(err));

getEmployee(1)
    .then(employee => {
        return getSalarie(employee);
    }).then(employeeInfo => {
        console.log(`Salarie of the Employee ${employeeInfo.name} (id=${employeeInfo.id}) is ${employeeInfo.salarie}`);
    });

getEmployee(2)
    .then(employee => getSalarie(employee))
    .then(employeeInfo => {
        console.log(`Salarie of the Employee ${employeeInfo.name} (id=${employeeInfo.id}) is ${employeeInfo.salarie}`);
    }).catch(err => console.log(err));

getEmployee(11)
    .then(employee => getSalarie(employee))
    .then(employeeInfo => {
        console.log(`Salarie of the Employee ${employeeInfo.name} (id=${employeeInfo.id}) is ${employeeInfo.salarie}`);
    }).catch(err => console.log(err));