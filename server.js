//When starting app, user is presented with the following option:
    //view all departments
    //view all roles
    //view all employees
    //add a department
    //add a role
    //add an employee
    //update an employee role

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

const inquirer = require('inquirer');

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
        })
};

menu()