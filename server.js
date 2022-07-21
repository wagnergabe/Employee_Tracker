//When starting app, user is presented with the following option:
    //view all departments
    //view all roles
    //view all employees
    //add a department
    //add a role
    //add an employee
    //update an employee role
//----COMPLETE---//

//View Departments:
    //formated table showing department names and deparment ids

//----COMPLETE---//

//View all Roles
    //Presented with job title, role id, the department that role belongs to, and the ssalary for that role

//view all employees
    //Presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the eployees report to

//Add a department
    //Prompted to enter the name of the deparment and that department is added to the database
//----COMPLETE---/

//Add a Role
    //Prompted to enter the name, salary, and deparment for the role and that role is added to the database

//Add an employee
    //Prompted to enter the employee's first name, last name, role, and manager, and that employee is added to the database

//Update an employee role
    //Prompted to select an employee to update and their new role and this information is updated in the database. 

//BONUS
    //Update Employee managers
    //View employees by manager
    //view employees by department
    //Delete departments, roles, and employees.
    //View the total utilized budget of a department (Combined salaries of all employees in that department);

const inquirer = require('inquirer');
const mysql = require ('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "test",
    database: "employees_db"
});

db.connect(function (err) {
    if (err) throw err;
    console.log(`Connected to Database`)
    menu();
})

function menu() {
    inquirer.prompt({
            type: "list",
            name: "menu_select",
            message: "Please select an option",
            choices: [
                "View Departments",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee Role",
                "Delete a Department"
            ]
        }) .then(function (answers) {
            switch (answers.menu_select) {
                case "View Departments":
                    viewDepartments();
                    break;
                case "View All Roles":
                    viewRoles();
                    break;
                case "View All Employees":
                    viewEmployees();
                    break;
                case "Add a Department":
                    addDepartment();
                    break;
                case "Add a Role":
                    addRole();
                    break;
                case "Add an Employee":
                    addEmployee();
                    break;
                case "Update an Employee Role":
                    updateEmployeeRole();
                    break;
                case "Delete a Department":
                    deleteDepartment();
                    break;
        }
    });
};

function viewDepartments() {
    console.log("Directory of Departments");
    const query = "SELECT * FROM department"
    db.query(query, function (err, res) {
        console.table(res);
        menu();
    })
};

function viewEmployees() {
    console.log("Current Employees");
    const query = "SELECT * FROM employee;"
    db.query(query, function (err, res) {
        console.table(res)
        menu();
    })
}

function viewRoles() {
    console.log("List of Employee roles");
    db.query('SELECT * FROM role', (err, res) => {
        console.log(res);
        menu();
    })
}


function addDepartment() {
    inquirer.prompt(
        {
        type: "input",
        name: "department_name",
        message: "What is the name of the department?"
        },
    ) 
    .then(res => {
        db.query("INSERT INTO department SET ?", { name: res.department_name}, (err, res) => {
        if (err) throw err;
        console.log(`successfully added to departments!`)
        menu();
        });
      });
}

function addRole() {
    inquirer.prompt ([
        {
        type: "input",
        message: "Please enter role title",
        name: "role"
        },
        {
        type: "number",
        message: "Please enter a Salary",
        name: "salary"
        },
        {
        type: "number",
        message: "Please enter the department's ID number",
        name: "departmentid"
        }
    ])
        .then (res => {
            db.query('INSERT INTO role (title, salary, department_id) values (?,?,?)', [res.role, res.salary, res.departmentid], (err,res) => {
                if (err) throw err;
                console.log('Role added');
                menu()
            })
        })
}

function addEmployee() {
    inquirer.prompt([
        {
        type: "input:",
        name: "firstName",
        message: "Please enter employee's first name",
        },
        {
        type: "input:",
        name: "lastName",
        message: "Please enter employee's last name",
        },
        {
        type: "number",
        name: "roleid",
        message: "What is the employee's ID?"
        },
        {
        type: "number",
        name: "managerid",
        message: "what is the ID of the employee's manager?"
        }
    ])
    .then(res => {
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)', [res.firstName, res.lastName, res.roleid, res.managerid], (err, res) => {
        if (err) throw err;
        console.log("Employee added")
        menu();
        });
    });
}

function deleteDepartment() {
    console.log
}


