const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const teamMembers = [];

console.log("Starting the team profile generator...");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
function buildTeam() {
    console.log("Please build your team");

    promptManager()
        .then(addManagerToTeam)
        .then(promptForNextAction)
        .catch(err => console.error(err));
}


function promptManager() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the team manager's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the team manager's ID?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the team manager's email?"
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "What is the team manager's office number?"
        }
    ]);
}
function promptEngineer() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the engineer's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the engineer's ID?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the engineer's email?"
        },
        {
            type: 'input',
            name: 'github',
            message: "What is the engineer's GitHub username?"
        }
    ]);
}
function promptIntern() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the intern's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the intern's ID?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the intern's email?"
        },
        {
            type: 'input',
            name: 'school',
            message: "What school does the intern attend?"
        }
    ]);
}

function addManagerToTeam(managerData) {
    const manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.officeNumber);
    teamMembers.push(manager);
}

function promptForNextAction() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do next?',
            choices: ['Add an Engineer', 'Add an Intern', 'Finish building the team']
        }
    ]).then(res => {
        switch (res.action) {
            case 'Add an Engineer':
                return promptEngineer().then(addEngineerToTeam).then(promptForNextAction);
            case 'Add an Intern':
                return promptIntern().then(addInternToTeam).then(promptForNextAction);
            case 'Finish building the team':
                return generateTeam();
        }
    });
}

function addEngineerToTeam(engineerData) {
    const engineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github);
    teamMembers.push(engineer);
}

function addInternToTeam(internData) {
    const intern = new Intern(internData.name, internData.id, internData.email, internData.school);
    teamMembers.push(intern);
}

function generateTeam() {
    // Check if output directory exists, if not, create it
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    // Generate HTML and write to file
    fs.writeFileSync(outputPath, render(teamMembers), 'utf-8');
    console.log('Team profile has been generated in the output directory');
}

buildTeam();