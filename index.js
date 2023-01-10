const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require(`./lib/manager`)
const Intern = require(`./lib/intern`)
const Engineer = require(`./lib/engineer`)

const employeeDb = []

function managersCard(manager) {
    return `<div class="col-sm-4 mt-4">
    <div class="card" style="width: 18rem;">
    ${manager.name}
        <div class="card-header">
        <div><h2>Manager</h2></div>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ID:${manager.id}</li>
            <li class="list-group-item">Email:${manager.email}</li>
            <li class="list-group-item">Office Number:${manager.officeNumber}</li>
        </ul>
    </div>
</div>
`
}
function internCard(intern) {
    return `<div class="col-sm-4 mt-4">
    <div class="card" style="width: 18rem;">
    ${intern.name}
        <div class="card-header">
        <div><h2>Intern</h2></div>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ID:${intern.id}</li>
            <li class="list-group-item">Email:${intern.email}</li>
            <li class="list-group-item">School:${intern.school}</li>
        </ul>
    </div>
</div>`
}
function engineerCard(engineer) {
    return `<div class="col-sm-4 mt-4">
    <div class="card" style="width: 18rem;">
    ${engineer.name}
        <div class="card-header">
        <div><h2>Engineer</h2></div>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ID:${engineer.id}</li>
            <li class="list-group-item">Email:${engineer.email}</li>
            <li class="list-group-item">OGithub:${engineer.gitHub}</li>
        </ul>
    </div>
</div>`
}

function generateHTML() {
    let cards = ""
    for (let i = 0; i < employeeDb.length; i++) {
        if (employeeDb[i].getRole() === "Manager") {
            cards = cards + managersCard(employeeDb[i])
        }
        if (employeeDb[i].getRole() === "Intern") {
            cards = cards + internCard(employeeDb[i])
        }
        if (employeeDb[i].getRole() === "Engineer") {
            cards = cards + engineerCard(employeeDb[i])
        }
    }
    return `<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link rel="stylesheet" href="./Assets/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>

<body>
    <header class="header">
        <h1>My Team</h1>
    </header>
    <div class="d-flex justify-content-center">
        <div class="row">
        ${cards}
        </div>
    

    </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
            crossorigin="anonymous"></script>
    </body>
    
    </html>`
}

inquirer
    .prompt([
        {
            type: 'input',
            message: `What is your Manager's name?`,
            name: 'name',
        },
        {
            type: 'input',
            message: `What is their employee id?`,
            name: 'id',
        },
        {
            type: 'input',
            message: `What is the manager's email address?`,
            name: 'email',
        },
        {
            type: 'input',
            message: `What is the manager's office number?`,
            name: 'number',
        },

    ])
    .then(answers => {
        const manager = new Manager(answers.name, answers.id, answers.number, answers.email)
        employeeDb.push(manager)

        menu()


    })
function menu() {
    inquirer.prompt([{
        type: "list",
        message: "Do you want to add another employee?",
        name: "menu",
        choices: ["Engineer", "Intern", "Build a Team"]
    }])
        .then(answers => {
            if (answers.menu === "Engineer") {
                addEngineer()
            }
            else if (answers.menu === "Intern") {
                addIntern()
            }
            else {
                buildTeam()
            }
        })
}
function buildTeam() {
    console.log(employeeDb)
        const htmlPageContent = generateHTML();
    fs.writeFile('generatedIndex.html', htmlPageContent, (err) =>
    err ? console.log(err) : console.log('Successfully created index.html!')
    );
}

function addIntern() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: `What is your intern's name?`,
                name: 'name',
            },
            {
                type: 'input',
                message: `What is the intern's id?`,
                name: 'id',
            },
            {
                type: 'input',
                message: `What is the intern's email?`,
                name: 'email',
            },
            {
                type: 'input',
                message: `What is the intern's school?`,
                name: 'school',
            },
        ])

        .then((answers) => {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
            employeeDb.push(intern)
            menu()
        });

}
function addEngineer() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: `What is your engineer's name?`,
                name: 'name',
            },
            {
                type: 'input',
                message: `What is the engineer's id?`,
                name: 'id',
            },
            {
                type: 'input',
                message: `What is the engineer's email address?`,
                name: 'email',
            },
            {
                type: 'input',
                message: `What is the engineer's github?`,
                name: 'github',
            },
        ])
        .then(answers => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
            employeeDb.push(engineer)
            menu()
        })
}


