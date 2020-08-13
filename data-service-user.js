const mongoose = require('mongoose');

var usersSchema = mongoose.Schema;
var userSchema = new usersSchema({

    "email": String,
    "password": String,
    "firstName": String,
    "lastName": String,
    "isAdmin": {
        type: Boolean,
        default: false
    }
})

var users = mongoose.model("web322_assignment_users", userSchema);

users
    .deleteMany({isAdmin: true})
    .exec()
    .then(() => {
        console.log("removed admins");
    })
    .catch((err) => {
        console.log(err);
    });

let admin;
admin = new users({
    id: 1,
    email: "gkim61@myseneca.ca",
    password: "1q2w3e4r!",
    firstName: "Gihoon",
    lastName: "Kim",
    isAdmin: true
});



admin.save((err) => {
    if (err) {
        console.log(`There was an error saving the user: ${err}`);
    } else {
        console.log(`user ${admin.email} is saved`);
    }

});

module.exports = users;