const meal = {

    fakedb : [],

    initDB() {

        this.fakedb.push({

            title : "Chicken Teriyaki",
            price : "$11.95",
            food_category : "teriyaki",
            top_package : false,
            imgPath : "Chicken_Teriyaki.JPG"
        })

        this.fakedb.push({

            title : "Butter Chicken with Mixed Vegetables",
            price : "$11.95",
            food_category : "teriyaki",
            top_package : false,
            imgPath : "Butter_Chicken_with_Mixed_Vegetables.JPG"
        })

        this.fakedb.push({

            title : "Sundried Tomato and Basil Pesto Chicken Linguini",
            price : "$10.76",
            food_category : "teriyaki",
            top_package : false,
            imgPath : "Sundried_Tomato_and_Basil_Pesto_Chicken_Linguini.JPG"
        })

        this.fakedb.push({

            title : "Roast Chicken and Homemade Pan Gravy",
            price : "$11.95",
            food_category : "teriyaki",
            top_package : false,
            imgPath : "Roast_Chicken_and_Homemade_Pan_Gravy.JPG"
        })

        this.fakedb.push({

            title : "Weight Loss",
            price : "$145",
            food_category : "Package",
            content_synopsis : "High protein, low-calorie meals with a nutrient profile tuned for weight loss",
            top_package : true,
            number_of_meals : 4,
            imgPath : "package_1.png"
        })

        this.fakedb.push({

            title : "Muscle Gain",
            price : "$159",
            food_category : "Package",
            content_synopsis : "Higher protein and calorie portions to support your muscle gain momentum",
            top_package : true,
            number_of_meals : 4,
            imgPath : "package_2.png"
        })

        this.fakedb.push({

            title : "Keto",
            price : "$159",
            food_category : "Package",
            content_synopsis : "High fat, low carb meals with moderate protein to achieve and sustain ketosis",
            top_package : true,
            number_of_meals : 5,
            imgPath : "package_3.png"
        })

        this.fakedb.push({

            title : "Fat Burner",
            price : "$159",
            food_category : "Package",
            content_synopsis : "Low carb, nutrient-rich meals with fat-burning profiles to support fat loss",
            top_package : true,
            number_of_meals : 6,
            imgPath : "package_4.png"
        })
    },
    getAllMeals() {return this.fakedb;},
    getPackages() {

        const packages = [];
        this.fakedb.forEach(element => {
            
            if (element.top_package) {
                packages.push(element);
            }
        });
        return packages;
    },
    getMeals() {

        const meals = [];
        this.fakedb.forEach(element => {
            
            if (!element.top_package) {
                meals.push(element);
            }
        });
        return meals;
    }
}

meal.initDB();
module.exports = meal;