const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8000;

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle the signup form submission
app.post('/signup', (req, res) => {
    const userData = {
        Email: req.body.email ,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        password: req.body.password,
       
        dob: req.body.dob,
    };

    // Read the existing users from the JSON file
    fs.readFile('users.json', 'utf8', (err, data) => {
        let users = [];
        if (!err) {
            users = JSON.parse(data);
        }

        // Add the new user data
        users.push(userData);

        // Save the updated users list back to the JSON file
        fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving data');
            }
            console.log(users);
            res.send('Signup successful');
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
