const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');

const app = express();


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));


const mg = mailgun({
    apiKey:'fb12c1cf2be0fe30a5bfc482f17a5d2e-ee16bf1a-afd8d66d',

    domain: 'sandbox34876c437a5b4936a3f57684f84c20ed.mailgun.org'
   
});
app.post('/', (req, res) => {
    const email = req.body.email;
    console.log(email);
    console.log('hello');
    const data = {
        from: 'Samridh Mahajan <samridh4834.be22@chitkara.edu.in>',
        to: email,
        subject: 'Testing',
        text: 'Welcome to my mailgun api'

    };
    mg.messages().send(data, (error, body) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).send('An error occurred while sending the email.');
        } else {
          
            res.status(200).send('Email sent successfully.');
        }
    })
})



app.listen(3000, function (request, response) {
    console.log(`Server is running on port 3000`);
});