const mongoose = require('mongoose');

// /* This is mongoDB part
// */
var mealSchema = mongoose.Schema;

// This allows Mongoose to connect to MongoDB
const MONGO_DB_URL = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@web322-assignment.enhe6.mongodb.net/${process.env.MONGO_DB_DATABASE_NAME}?retryWrites=true&w=majority`;
mongoose
    .connect(MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {

        console.log(`You have successfully connected to your mongoDB database`);
    })
    .catch((err) => {

        console.log(`Sorry, something occured: ${err}`);
    });

var mealsSchema = new mealSchema({
    
    "id": {
        autoIncrement: true,
        type: Number,
        primaryKey: true
    },
    "title": String,
    "infomation": String,
    "price": Number,
    "food_category": String,
    "content_synopsis": String,
    "top_package": Boolean,
    "isPackage": Boolean,
    "number_of_meals": Number,
    "imagePath": String
})

var meals = mongoose.model("web322_assignment_meals", mealsSchema);

// Delete data before start
meals
    .deleteMany({top_package: true})
    .exec()
    .then(() => {
        console.log("removed meals");
    })
    .catch((err) => {
        console.log(err);
    });
{

    // declare data
    var mealsList = [];

    mealsList[0] = new meals({
        id: 1,
        title: "Chicken Teriyaki",
        price: 11.95,
        food_category: "teriyaki",
        content_synopsis: "",
        number_of_meals: 1,
        isPackage: false,
        top_package: true,
        imagePath: "Chicken_Teriyaki.JPG"
    });

    mealsList[1] = new meals({
        id: 2,
        title: "Butter Chicken with Mixed Vegetables",
        price: 11.95,
        food_category: "teriyaki",
        content_synopsis: "",
        number_of_meals: 1,
        isPackage: false,
        top_package: true,
        imagePath: "Butter_chicken_with_Mixed_Vegetables.JPG"
    });

    mealsList[2] = new meals({
        id: 3,
        title: "Sundried Tomato and Basil Pesto Chicken Linguini",
        price: 10.76,
        food_category: "teriyaki",
        content_synopsis: "",
        number_of_meals: 1,
        isPackage: false,
        top_package: true,
        imagePath: "Sundried_Tomato_and_Basil_Pesto_Chicken_Linguini.JPG"
    });

    mealsList[3] = new meals({
        id: 4,
        title: "Roast Chicken and Homemade Pan Gravy",
        price: 11.95,
        food_category: "teriyaki",
        content_synopsis: "",
        number_of_meals: 1,
        isPackage: false,
        top_package: true,
        imagePath: "Roast_Chicken_and_Homemade_Pan_Gravy.JPG"
    });

    mealsList[4] = new meals({
        id: 5,
        title: "Weight Loss",
        price: 145,
        food_category: "Package",
        content_synopsis: "High protein, low-calorie meals with a nutrient profile tuned for weight loss",
        top_package: true,
        isPackage: true,
        number_of_meals: 4,
        imagePath: "package_1.png"
    });

    mealsList[5] = new meals({
        id: 6,
        title: "Muscle Gain",
        price: 159,
        food_category: "Package",
        content_synopsis: "Higher protein and calorie portions to support your muscle gain momentum",
        top_package: true,
        isPackage: true,
        number_of_meals: 4,
        imagePath: "package_2.png"
    });

    mealsList[6] = new meals({
        id: 7,
        title: "Keto",
        price: 159,
        food_category: "Package",
        content_synopsis: "High fat, low carb meals with moderate protein to achieve and sustain ketosis",
        top_package: true,
        isPackage: true,
        number_of_meals: 5,
        imagePath: "package_3.png"
    });

    mealsList[7] = new meals({
        id: 8,
        title: "Fat Burner",
        price: 159,
        food_category: "Package",
        content_synopsis: "Low carb, nutrient-rich meals with fat-burning profiles to support fat loss",
        top_package: true,
        isPackage: true,
        number_of_meals: 6,
        imagePath: 'package_4.png'
    });
}

// save the meals
{
    mealsList.forEach(element => {
        element.save((err) => {
            if (err) {
                console.log(`There was an error saving the meal: ${err}`);
            } else {
                console.log(`Meal ${element.title} is saved`);
            }
        });
    });
}

// collection in the db to store documents
module.exports = meals;

// module.exports.getTopMeals = function () {
//     return new Promise(function (resolve, reject) {
//         indiMeals.find({
//             where: {
//                 top_package: true
//             }
//         }).then(function (data) {
//             resolve(data);
//         }).catch((err) => {
//             reject("query returned 0 results");
//         });
//     });
// };

// module.exports.getAllPackages = function () {
//     return new Promise(function (resolve, reject) {
//         packages.find().then(function (data) {
//             resolve(data);
//         }).catch((err) => {
//             reject("query returned 0 results");
//         });
//     });
// };

// module.exports.getMealByNum = function (mealID) {
//     return new Promise(function (resolve, reject) {
//         indiMeals.find({
//             where: {
//                 id: mealID
//             }
//         }).then(function (data) {
          
//                 resolve(data[0]); 
         
//         }).catch(() => {
//             reject("query returned 0 results");
//         });
//     });
// };

// module.exports.getPackByNum = function (packID) {
//     return new Promise(function (resolve, reject) {
//         packages.find({
//             where: {
//                 id: packID
//             }
//         }).then(function (data) {
          
//                 resolve(data[0]); 
         
//         }).catch(() => {
//             reject("query returned 0 results");
//         });
//     });
// };

// module.exports.addPackage = function (packageData) {
//     return new Promise(function (resolve, reject) {

//         for (var prop in packageData) {
//             if(packageData[prop] == '')
//             packageData[prop] = null;
//         }

//         packages.create(packageData).then(() => {
//             resolve();
//         }).catch((err)=>{
//             console.log(err);
//             reject("unable to create employee");
//         });

//     });
// };
