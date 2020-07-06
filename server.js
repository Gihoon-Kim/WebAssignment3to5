const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const meal = require("./models/meals");

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended : false }));

app.get("/", (req, res) => {

    res.render("index", {

        title : "Home Page",
        data : meal.getMeals()
    })
});

app.get("/package", (req, res) => {

    res.render("package", {

        title : "Package Page",
        data : meal.getPackages()
    })
});

app.get("/login", (req, res) => {

    res.render("login");
})

app.post("/login", (req, res) => {
    
    const emailError = [];
    const passwordError = [];

    if (req.body.email == "") { emailError.push("You must enter an email")};    
    if (req.body.Password == "") { passwordError.push("You must enter a password")};

    // This is if the user failed the validation
    if (emailError.length > 0) {

        res.render("login", {

            emailError : emailError
        });
    }
    else if (passwordError.length > 0) {

        res.render("login", {

            passwordError : passwordError
        });
    }
    else { res.redirect("/"); }
})

app.get("/registration", (req, res) => {

    res.render("registration");
})

app.post("/registration", (req, res) => {

    var nameType = /^[A-Za-z]{3,30}$/;
    const firstNameError = [];
    const lastNameError = [];
    const emailError = [];

    // at least one lower case character,
    // one upper case character,
    // and number need
    var passwordType = /(?=.*[a-z])(?=.*[A-Z]).{6,12}/

    const passwordError = [];

    if (req.body.first_name == "" || !nameType.test(req.body.first_name)) { firstNameError.push("First Name is an error")};    
    if (req.body.last_name == "" || !nameType.test(req.body.last_name)) { lastNameError.push("Last Name is an error")};    
    if (req.body.email == "") { emailError.push("You must enter an email")};    
    if (req.body.Password == "" || !passwordType.test(req.body.Password)) { passwordError.push("Error happend")};

    if (firstNameError.length > 0) {

        res.render("registration", {

            firstNameError : firstNameError
        });
    }
    else if (lastNameError.length > 0) {

        res.render("registration", {

            lastNameError : lastNameError
        });
    }

    else if (emailError.length > 0) {

        res.render("registration", {

            emailError : emailError
        });
    }
    else if (passwordError.length > 0) {

        res.render("registration", {

            passwordError : passwordError
        });
    }
    else { res.redirect("/"); }

    // only number and english characters
    
    
})

const PORT = 3000;

app.listen(PORT, ()=> {
    console.log(`The webserver is up and running`);
})