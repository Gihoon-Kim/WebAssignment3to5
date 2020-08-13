const clientSessions = require("client-sessions");
const express = require('express');
const router = express.Router();
const app = express();
// load mealModel
const meal = require("../data-service-auth");
const users = require("../data-service-user");

const user = {
    isAdmin: true,
    username: "Gihoon Kim",
    password: "samplepassword",
    email: "gkim61@myseneca.ca"
};

// Setup the static folder that static resources can load from like images, css
// files, etc.
app.use(express.static("static"));

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

router.get("/package", (req, res) => {

    meal
        .find({isPackage: true})
        .exec()
        .then((meal) => {
            res.render("product/package", {

                title: "Home Page",
                data: JSON.parse(JSON.stringify(meal))
            });
        })
});

router.get("/descriptionPack/:mealID", (req, res) => {

    console.log(req.params.mealID);
    meal
        .find({id: req.params.mealID})
        .exec()
        .then((meal) => {
            res.render("general/descriptionPack", {
                data: JSON.parse(JSON.stringify(meal))
            });
        })
});

module.exports = router;