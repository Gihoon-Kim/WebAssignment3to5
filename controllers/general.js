const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const clientSessions = require("client-sessions");
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
// load mealModel
const meal = require("../data-service-auth");
const users = require("../data-service-user");


// Setup the static folder that static resources can load from like images, css
// files, etc.
app.use(express.static("static"));


var user = {
    password: "1q2w3e4rQ",
    email: "gkim61@myseneca.ca"
  };

// Setup client-sessions
app.use(clientSessions({
    cookieName: "session", // this is the object name that will be added to 'req'
    secret: "week10example_web322", // this should be a long un-guessable string.
    duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
    activeDuration: 1000 * 60 // the session will be extended by this many ms each request (1 minute)
}));

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

function ensureLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect("/login");
    } else {
        next();
    }
}
function ensureLogin2(req, res, next) {
    if (!req.session.user.isAdmin) {
        res.redirect("/login");
    } else {
        next();
    }
}

router.get("/", (req, res) => {

    meal
        .find({isPackage: false})
        .exec()
        .then((meal) => {
            res.render("general/index", {

                title: "Home Page",
                data: JSON.parse(JSON.stringify(meal))
            });
        })
});

router.get("/login", (req, res) => {

    res.render("general/login");
})

router.post("/login", (req, res) => {

    const usermail = req.body.email;
    const userpassword = req.body.Password;

    const emailError = [];
    const passwordError = [];

    if (req.body.email == "") {
        emailError.push("You must enter an email")
    };
    if (req.body.Password == "") {
        passwordError.push("You must enter a password")
    };

    // This is if the user failed the validation
    if (emailError.length > 0) {

        res.render("general/login", {

            emailError: emailError,
            email: req.body.email,
            password: req.body.Password
        });
    } else if (passwordError.length > 0) {

        res.render("general/login", {

            passwordError: passwordError,
            email: req.body.email,
            password: req.body.Password
        });
    } else {
        console.log(usermail);
        console.log(userpassword);

        console.log(user.email);
        console.log(user.password);
        if (usermail == user.email && userpassword == user.password) {

            req.session.user = {
                email: user.email
            };
            res.redirect("/");
        }
        else {
            res.render("general/login", {errorMsg: "invalid usermail or password"});
        }
    }
});

router.get("/logout", (req, res) => {
    req
        .session
        .reset();
    res.redirect('/');
})

router.get("/registration", (req, res) => {

    res.render("general/registration");
});

router.get("/description/:mealID", (req, res) => {

    meal
        .find({id: req.params.mealID})
        .exec()
        .then((meal) => {
            res.render("general/description", {
                data: JSON.parse(JSON.stringify(meal))
            });
        })
});

router.get("/descriptionPack", (req, res) => {

    res.render("general/descriptionPack");
});

router.post("/registration", (req, res) => {

    var nameType = /^[A-Za-z]{3,30}$/;
    const firstNameError = [];
    const lastNameError = [];
    const emailError = [];

    // at least one lower case character, one upper case character, and number need
    var passwordType = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/

    const passwordError = [];

    if (req.body.first_name == "" || !nameType.test(req.body.first_name)) {
        firstNameError.push("First Name is an error")
    };
    if (req.body.last_name == "" || !nameType.test(req.body.last_name)) {
        lastNameError.push("Last Name is an error")
    };
    if (req.body.email == "") {
        emailError.push("You must enter an email")
    };
    if (req.body.Password == "" || !passwordType.test(req.body.Password)) {
        passwordError.push(
            "password should be 6 to 12 digits, and at least each one upper character, lowe" +
            "r character, and digit included"
        )
    };

    if (firstNameError.length > 0) {

        res.render("general/registration", {

            firstNameError: firstNameError,
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            regEmail: req.body.email,
            password: req.body.Password
        });
    } else if (lastNameError.length > 0) {

        res.render("general/registration", {

            lastNameError: lastNameError,
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            regEmail: req.body.email,
            password: req.body.Password
        });
    } else if (emailError.length > 0) {

        res.render("general/registration", {

            emailError: emailError,
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            regEmail: req.body.email,
            password: req.body.Password
        });
    } else if (passwordError.length > 0) {

        res.render("general/registration", {

            passwordError: passwordError,
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            regEmail: req.body.email,
            password: req.body.Password
        });
    } else {

        // Email part is not working now
        /*
        let email = req.body.email;

        let transporter = nodemailer.createTransport({

            service: 'gmail',
            auth: {

                user: 'tempGkim@gmail.com',
                pass: '1q2w3e4r1!'
            }
        });

        let mailOptions = {

            from: 'tempGkim@gmail.com',
            to: email,
            subject: 'Registration was succeed',
            text: 'Thank you for registration our web.!'
        };

        transporter.sendMail(mailOptions, (error, info) => {

            if (error) {
                console.log(error);
            }
        });
        */

        userInfo = [];
        userInfo.push(req.body.first_name);
        userInfo.push(req.body.last_name);
        userInfo.push(req.body.email);

        let user;
        user = new users(
            {id: 1, email: req.body.email, firstName: req.body.first_name, lastName: req.body.last_name}
        );

        user.save((err) => {
            if (err) {
                console.log(`There was an error saving the user: ${err}`);
            } else {
                console.log(`user ${user.email} is saved`);
            }

        });
        res.redirect("/dashboard");
    }
});

router.get("/dashboard", (req, res) => {

    res.render("general/dashboard", {userInfo: userInfo});
})

router.get("/addPackage", ensureLogin, (req, res) => {
    res.render("product/addPackage");
});

module.exports = router;