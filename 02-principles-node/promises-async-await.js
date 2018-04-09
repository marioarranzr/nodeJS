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

let getEmployee = async(id) => {
    let employeeDB = employees.find(employee => employee.id == id);
    if (!employeeDB) {
        throw new Error(`Employee with the Id ${id} doesn't exist in DB`);
    } else {
        return employeeDB;
    }

}

let getSalarie = async(employee) => {
    let salarieDB = salaries.find(salarie => salarie.id == employee.id);
    if (!salarieDB) {
        throw new Error(`Salarie of the Employee ${employee.name} (id=${employee.id}) doesn't exist in DB`);
    } else {
        return {
            id: employee.id,
            name: employee.name,
            salarie: salarieDB.amount
        };
    }

}

getEmployeeInfo = async(id) => {
    let employee = await getEmployee(id);
    let employeeInfo = await getSalarie(employee);
    return `Salarie of the Employee ${employeeInfo.name} (id=${employeeInfo.id}) is ${employeeInfo.salarie}`;

}

getEmployeeInfo(1)
    .then(res => console.log(res))
    .catch(err => console.log(err))

getEmployeeInfo(3)
    .then(res => console.log(res))
    .catch(err => console.log(err))

getEmployeeInfo(11)
    .then(res => console.log(res))
    .catch(err => console.log(err))