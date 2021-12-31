require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({

    host: "localhost",

    port: 3306,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) throw err;
    runPrompt();
});

const runPrompt = () => {
    //this will be the inquirer.prompt function to view users_db etc

    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'See all users',
            'See all email addresses',
            'Add a user',
            'Update a user',
            'Delete a user',
            'Exit',
        ],
    })
    .then((answer) => {
        switch (answer.action) {
            case 'See all users':
                viewAll();
                break;

            case 'See all email addresses':
                viewEmail();
                break;

            case 'Add a user':
                addUser();
                break;

            case 'Update a user':
                updateUser();
                break;

            case 'Delete a user':
                deleteUser();
                break;

            case 'Exit':
                exitPrompt();
                break;

            default:
                console.log(`Invalid action: ${answer.action}`);
                break;
        }
    });
};