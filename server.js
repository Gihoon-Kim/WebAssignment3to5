const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

//This loads all our environment variables from the keys.env
require("dotenv").config({path: './keys.env'});

// Handlebars middleware (this tells Express to set handlebars as the template
// engine)
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

// Load controllers
const generalController = require("./controllers/general");
const productController = require("./controllers/product");

// Map each controller to the app object
app.use("/", generalController);
app.use("/product", productController);


// Sets up server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`The webserver is up and running`);
});