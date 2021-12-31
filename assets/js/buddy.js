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

const viewAll = () => {
    console.log('selecting all users...\n');
    connection.query('SELECT * FROM user', (err,res) => {
        if (err) throw err;
        console.table(res);
        
    });
    runPrompt();
};

const viewEmail = () => {
    // select all email addresses from all users in user table
    // SELECT * email ????

    const query = 'SELECT email FROM user';
    connection.query(query, { user: answer.user }, (err,res) => {
        if (err) throw err;
        res.forEach(({ email }) => {
            console.log(`User: ${email}`);
        });
        runPrompt();
    });
};


const addUser = () => {
    inquirer.prompt([
        {
            name: 'addFirst',
            type: 'input',
            message: 'Enter user first name'},
        {
            name: 'addLast',
            type: 'input',
            message: 'Enter user last name'},
        {
            name: 'addEmail',
            type: 'input',
            message: 'Enter user email'},
        {
            name: 'addCountry',
            type: 'input',
            message: 'Enter user country'},
        {
            name: 'addCity',
            type: 'input',
            message: 'Enter user city'},
        {
            name: 'addState',
            type: 'input',
            message: 'Enter user state/province'},
    ])
    .then((answer) => {console.log('Adding new user...\n');
        connection.query(
            'INSERT INTO user SET ?',
            {
                first_name: answer.addFirst,
                last_name: answer.addLast,
                email: answer.addEmail,
                country: answer.addCountry,
                city: answer.addCity,
                state_prov: answer.addState,
            },
            (err) => {
                if (err) throw err;
                console.log('User added!\n');
            }
        );

    });
};


//updateUser function will most likely be used for updating email only

const users = [];

const updateUser = () => {

        const userChoices = () => {

            connection.query('SELECT last_name FROM user', (err, res) => {
                if (err) throw err;
                res.push(users);
            })
        };

    userChoices();

    inquirer.prompt(
        {
            name: 'updateUser',
            type: 'list',
            message: 'Which user (last name) would you like to update?',
            choices: users,
        },
    )
    .then((answer) => {console.log('Updating user...\n');

        connection.query(
            'UPDATE user SET ? WHERE ?',
            {
                email: answer.upEmail,
            }
        )

})
};