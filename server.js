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

//View all Roles
    //Presented with job title, role id, the department that role belongs to, and the ssalary for that role

//view all employees
    //Presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the eployees report to

//Add a department
    //Prompted to enter the name of the deparment and that department is added to the database

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
            name: "menu",
            message: "Please select an option",
            choices: [
                "View Departments",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee Role"
            ]
        }) .then(function (answers) {
            switch (answers.menu) {
                case "View Departments":
                    viewDepartments();
                    break;
                case "View All Roles":
                    viewRoles();
                    break;
                case "View All Employees":
                    viewEmployees();
                    break;
                case "Add a department":
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

function addDepartment() {
    inquirer.prompt([
        {
        type: "input",
        name: "department_name",
        message: "What is the name of the department?"
        },
    ]) 
    .then(res => {
        db.query("INSERT INTO department SET ?", { NAME: res.department_name}, (err, res) => {
        if (err) throw err;
        console.log(`${department} successfully added to departments!`)
        menu();
        });
      });
    }


