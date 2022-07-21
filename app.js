const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const _ = require("lodash");

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/recipesDB");

const recipeSchema = new mongoose.Schema({
  name: String,
  imageURL: String, 
  description: String,
  prepTime: Number,
  cookTime: Number,
  noOfServings: Number,
  tags: Array,
  ingredients: Array,
  instructions: Array
});

const Recipe = mongoose.model("Recipe", recipeSchema);

Recipe.count({}, function(err, count){
  if (count === 0) {
    Recipe.create([
      {name : "Omelette", imageURL : "https://images.unsplash.com/photo-1494597706938-de2cd7341979?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1204&q=80", description: "Omelettes are not that scary as they seem to be! Making an omlette at home is almost easy. With few tips you can pull this off in minutes. Fill it with whatever you have on hand - freezer leftovers will do perfect for this!", prepTime : 5, cookTime : 5, noOfServings : 1, tags : ["Breakfast"], ingredients : [ "3x eggs", "butter", "filling of your chosing" ], instructions : [ "Beat the eggs.", "Melt the butter. Keep the temperature low and slow when cooking the eggs so the bottom doesn't get too brown or overcooked.", "Add the eggs, Let them sit for a minute, then gently use a heatproof spatula to lift the cooked part from the edges of the pan. Tilt the pan to allow the uncooked eggs to flow to the edge.", "Fill the omelette, but don't overstuff it. Cook few more seconds.", "Fold in half and slide it onto a plate. Enjoy!" ]},
      {name : "French Toast", imageURL : "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80", description: "The BEST French Toasts! Fluffy and tender on the inside, gloriously browned on the outside. That's a great idea for some stale bread, that's no longer good for ordinary sandwiches!", prepTime : 5, cookTime : 15, noOfServings : 4, tags:["Breakfast"], ingredients : [ "4 large eggs", "2/3 cup milk", "2 teaspoons cinnamon", "8 thick slices 2-day-old bread (better if slightly stale)", "Butter (can sub vegetable oil)", "Maple syrup (optional)", "Fresh fruits or non-sweet toppings" ], instructions : [ "In a medium bowl, whisk together the eggs, milk, and cinnamon. Whisk the mixture until well blended and pour into a shallow bowl, wide enough to place a slice of the bread you will be using.", "Soak the bread slices in egg mixture.", "Melt some butter in a large skillet over medium high heat. Shake off the excess egg mixture from the bread and place the bread slices onto the hot skillet. Fry the French toast until browned on one side, then flip and brown the other side.", "Serve the French toast hot with toppings of your chosing!" ]},
      {name : "Caesar Salad", imageURL : "https://images.unsplash.com/photo-1512852939750-1305098529bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", description : "This Classic Caesar Salad with an easy homemade Caesar dressing is sure to please everyone. Plus, you will never want to buy Caesar dressing again!", prepTime : 30, cookTime : 0, noOfServings : 4, tags : [ "Lunch", "Salad" ], ingredients : [ "1/2 cup high-quality extra virgin olive oil, plus more for brushing", "4 cloves garlic, minced", "1 baguette, preferably a day old, thinly sliced", "1/4 cup fresh lemon juice (plus more to taste)", "4 ounces Parmesan cheese, grated", "1 teaspoon anchovy paste, or 1 to 2 anchovies, minced", "2 large eggs", "1/4 teaspoon freshly ground black pepper (or to taste)", "1/2 teaspoon kosher salt (or to taste)", "4 to 6 small heads romaine lettuce, rinsed, patted dry, wilted outer leaves discarded" ], instructions : [ "In a very large bowl, whisk together 1/2 cup olive oil and garlic. Let sit for at least half an hour.", "While the garlic is sitting, make the croutons. Spread the baguette slices out on a baking sheet. (You may need to do in batches.) Brush or spray with olive oil (or melted butter). Broil for a couple of minutes until the tops are lightly browned. (Note: do not walk away, these can easily go from browned to burnt.) Remove and let cool.", "Dressing: add minced anchovies (or anchovy paste, if using) and eggs to the oil-garlic mixture. Whisk until creamy. Add salt and pepper and 1/4 cup of lemon juice. Whisk in half of the Parmesan cheese. Taste, add more lemon juice, salt and pepper to taste. The lemon should give an edge to the dressing, but not overwhelm it.", "Using your hands, tear off chunks of lettuce from the heads of romaine lettuce (do not use a knife to cut). Add to the dressing and toss until coated. Add the rest of the Parmesan cheese, and toss.", "Coarsely chop the toasted bread into croutons and add to the salad. Brush in any crumbs from chopping the bread, too. Toss and serve immediately." ]},
      {name : "Mango Chicken Curry", imageURL : "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1968&q=80", description : "Mango and chicken are a power combo! This Mango Chicken Curry uses fresh mango as its base and adds full-fat coconut milk for creamy richness. Try it tonight!", prepTime : 20, cookTime : 40, noOfServings : 6, tags : [ "Dinner", "Chicken", "Rice" ], ingredients : [ "2 tablespoons vegetable oil", "1 large onion, chopped (1 1/2 to 2 cups)", "1/2 red bell pepper, chopped", "2 garlic cloves, minced", "2 tablespoons fresh minced ginger", "2 tablespoons yellow curry powder", "1/2 teaspoon ground cumin", "2 mangos, peeled and diced", "2 tablespoons apple cider vinegar or white vinegar", "1 13.5-ounce can (full-fat) coconut milk", "1 1/4 pounds skinless boneless chicken thighs or breasts, cut into 1-inch pieces", "1/3 cup golden raisins, optional", "Salt and freshly ground black pepper", "Cilantro for garnish", "Cooked rice, to serve" ], instructions : [ "Heat oil in a large sauté pan over medium heat. Add onions and bell pepper and cook, stirring occasionally, until soft, about 5 minutes. Add the garlic and ginger and cook for another minute.bAdd the curry powder and cumin, cook for a few more minutes. The spices will absorb some of the oil, so if anything begins to stick too much to the bottom of the pan, add a little more oil to the pan.", "Add the vinegar, coconut milk, and one of the two chopped mangos to the pan. Increase the heat and bring to a boil, then lower the heat to maintain a low simmer for about 15 minutes, stirring occasionally.", "Remove pan from heat. Scoop the sauce into a blender. Purée the sauce, pulsing until smooth. Return the sauce to the pan.", "Add chicken and raisins (if using) to the pan and return to a low simmer. Cover the pan and let cook for 8 to 10 minutes. The chicken should be just cooked until done. Use a knife to cut open the largest piece to check.", "Add the remaining chopped mango, then stir in the cream, if using. Cook at a very low temperature for another minute or two, uncovered. Do not allow to boil, or the cream may curdle.", "If a little too sweet, add a little more vinegar. If not sweet enough, you can add a dash of sugar. Add salt and pepper to taste. Serve over rice and garnish with cilantro, if desired." ]},
      {name : "Tapioca Pudding", imageURL : "https://www.simplyrecipes.com/thmb/dLuarRavhfFEdoTTYx1tqLdQ0Rs=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Tapioca-Pudding-LEAD-1-9fc50466fd33411eb56e9362f243362a.jpg", description : "Tapioca pudding is a classic dessert that features small tapioca pearls, milk, sugar, eggs, and vanilla. It only takes 30 minutes to make!", repTime : 5, cookTime : 30, noOfServings : 5, tags : ["Dessert"], ingredients : [ "1/2 cup small pearl tapioca (do not use instant tapioca)", "3 cups whole milk (or skim milk with cream added)", "1/4 teaspoon salt", "2 large eggs", "1/2 cup sugar", "1 teaspoon vanilla extract" ], instructions : [ "Combine tapioca, milk, and salt in 1 1/2 quart pan on medium-high heat. Stir while bringing to a bare simmer. Lower the heat and cook, uncovered, at the lowest possible heat, adding sugar gradually until the tapioca pearls have plumped up and thickened.Depending on the type or brand of tapioca you are using (and if you've pre-soaked the tapioca as some brands call for), this could take anywhere from 5 minutes to 45 minutes of cooking at a very low temperature.Stir occasionally so the tapioca doesn't stick to the bottom of the pan.", "Beat eggs in a separate bowl. Whisk in some of the hot tapioca very slowly to equalize the temperature of the two (to avoid curdling).", "Slowly add the eggs to the tapioca in the pan. Increase the heat to medium and stir for several minutes until you get a thick pudding consistency. Do not let the mixture boil or the tapioca egg custard will curdle. Cool 15 minutes. Stir in vanilla. Serve either warm or chilled." ]},
      {name : "Baked Apples", imageURL : "https://www.simplyrecipes.com/thmb/XpU_BUrWK0fxpnNRjM4_nmiK8HY=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2014__11__baked-apples-vertical-1173-20a5583fb7ea4648bd47f6e8d83ffeb3.jpg", description : "Classic baked apples are an easy, comforting dessert. Filled with pecans, cinnamon, raisins, butter, and brown sugar, our baked apples recipe is perfect for cozy afternoons.", prepTime : 15, cookTime : 35, noOfServings : 4, tags : [ "Dessert" ], ingredients : [ "4 large good baking apples, such as Rome Beauty, Golden Delicious, or Jonagold", "1/4 cup brown sugar", "1 teaspoon cinnamon", "1/4 cup chopped pecans, optional", "1/4 cup currants or chopped raisins", "1 tablespoon butter", "3/4 cup boiling water" ], instructions : [ "Set your oven to 375°F (190°C).", "Rinse and dry the apples. Using a sharp paring knife or an apple corer, cut out the cores, leaving the bottom 1/2 inch of the apples intact.", "Stuff apples, then, dot with butter:nPlace the brown sugar, cinnamon, currants or chopped raisins, and chopped pecans (if using) in a small bowl and stir to combine.Put the apples in a baking dish and stuff each apple with the sugar stuffing mixture. Place a dot of butter (a quarter of the tablespoon called for in the ingredient list) on top of the sugar.", "Pour the boiling water into the bottom of the baking dish. Bake at 375°F (190°C) for 30 to 45 minutes, until the apples are cooked through and tender, but not overcooked and mushy. When done, remove the apples from the oven and baste them with the juices from the pan.Terrific with a side of vanilla ice cream." ]},
      {name : "Broccoli Cheddar Bites", imageURL : "https://www.simplyrecipes.com/thmb/ehgvcrYaPWdS7fHn5dpSMteh8l4=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2015__09__broccoli-cheddar-bites-vertical-a-1200-9f375c3e16474faa89d7fea91598ecf2.jpg", description : "Cheesy baked broccoli snacks, great for a brunch, kid-friendly lunch, or party!", prepTime : 15, cookTime : 30, noOfServings : 24, tags : ["Lunch"], ingredients : [ "1 large bunch broccoli florets", "2 large eggs, lightly beaten", "1/2 cup, packed, torn fresh bread (no crust)", "1/4 cup grated onion", "1/4 cup mayonnaise", "1 cup (4 ounces, 114g), packed, grated sharp cheddar cheese", "1 1/2 teaspoons lemon zest", "1/2 teaspoon salt", "1/4 teaspoon freshly ground black pepper" ], instructions : [ "Place 1 inch of water in a pot with a steamer basket. Bring to a boil. Add the broccoli florets. Steam the broccoli florets for 5 minutes, until just tender. Rinse with cold water to stop the cooking. Finely chop the steamed broccoli florets. You should have 2 to 2 1/2 cups.", "Place the beaten eggs and the torn bread in a large bowl. Mix until the bread is completely moistened.Add the grated onion, mayonnaise, cheese, lemon zest, salt and pepper. Stir in the minced broccoli.", "Preheat oven to 350°F (180°C). Coat the wells of 2 mini muffin pans (1 dozen wells each) with olive oil (so the bites don't stick). Distribute the broccoli mixture in the muffin wells.", "Bake at 350°F for 25 minutes until cooked through and lightly browned on top." ]},
      {name : "Apple Crisp", imageURL : "https://www.simplyrecipes.com/thmb/tWhuO1gQtoDTUBiPi3B0FVdVDd0=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2018__08__Apple-Crisp-LEAD-1-cb6c5dc4c5ed4023b93ac63ea761a88a.jpg", description : "Crunchy, crispy apple crisp recipe! This is the easiest of the apple desserts. Just bake sliced tart apples topped with a streusel oat topping, with plenty of brown sugar, butter, and cinnamon. Serve with ice cream!", prepTime : 15, cookTime : 45, noOfServings : 8, tags : [ "Dessert" ], ingredients : [ "7 tart apples, peeled, cored, and sliced", "4 teaspoons fresh lemon juice", "1/2 teaspoon vanilla", "1 cup brown sugar", "1/2 teaspoon ground cinnamon", "1 cup rolled oats", "1/2 cup butter, room temperature" ], instructions : [ "Preheat oven to 375°F (190°C). ", "In a mixing bowl, combine apples, lemon juice, and vanilla.", "Layer sliced apples in a 9 x 13-inch (or approximately the same size) baking pan.", "Combine brown sugar, cinnamon, and oatmeal in a bowl. Cut in the butter. Sprinkle sugar mixture over apples.", "Bake at 375°F (190°C) for 45 minutes or until topping looks crunchy and apples are tender.Serve with whipped cream or vanilla ice cream." ]}
    ]);
}});

app.get("/", function(req, res) {
  function drawRecipes(foundRecipes){
    const randomRecipes = [];
    while (randomRecipes.length < 3){
      let randomNumber = Math.floor(Math.random() * foundRecipes.length);
      if(randomRecipes.includes(randomNumber) === false){
        randomRecipes.push(randomNumber);
      }
    }
    return randomRecipes;
  }
  Recipe.find({}, function(err, foundRecipes){
    res.render("home", {recipes: foundRecipes, randomRecipes: drawRecipes(foundRecipes)});
  });
});

app.get("/about", function(req,res){
  function drawRecipes(foundRecipes){
    const randomRecipes = [];
    while (randomRecipes.length < 3){
      let randomNumber = Math.floor(Math.random() * foundRecipes.length);
      if(randomRecipes.includes(randomNumber) === false){
        randomRecipes.push(randomNumber);
      }
    }
    return randomRecipes;
  }
  Recipe.find({}, function(err, foundRecipes){
    res.render("about", {recipes: foundRecipes, randomRecipes: drawRecipes(foundRecipes)});
  });
});

app.get("/add", function(req,res){
  res.render("add");
});

app.get("/recipes", function(req,res){
  Recipe.find({}, function(err, foundRecipes){
    res.render("recipes", {recipes: foundRecipes});
  });
});

app.get("/tags", function(req,res){
  Recipe.find({}, function(err, foundRecipes){
    const tagsArr = [];
    foundRecipes.forEach(function(recipe){
      const tags = recipe.tags;
      if (tags.length>1){
        tags.forEach(function(tag){
          tagsArr.push(_.capitalize(tag));
        });
      } else {
        tagsArr.push(_.capitalize(tags.join()));
      }
    });
      const counts = {}
      for (const tag of tagsArr) {
        counts[tag] = counts[tag] ? counts[tag] + 1 : 1;
      }
    res.render("tags", {tagsList: counts});
    console.log("Tagslist:", counts);
  });
});

app.get("/recipes/:recipeId", function(req,res){
  const requestedRecipeId = req.params.recipeId;
  Recipe.findOne({_id: requestedRecipeId}, function(err, foundRecipe){
      if(err){
        console.log(err);
      } else {
        res.render("single-recipe", {
          recipeName: foundRecipe.name, 
          recipeDescription: foundRecipe.description,
          recipeURL: foundRecipe.imageURL, 
          prepTime: foundRecipe.prepTime, 
          cookTime: foundRecipe.cookTime,
          noOfServings: foundRecipe.noOfServings,
          tags: foundRecipe.tags,
          ingredients: foundRecipe.ingredients,
          instructions: foundRecipe.instructions
        });
      }
  });
});

app.get("/tags/:recipeQuery", function(req,res){
  const requestedTag = _.capitalize(req.params.recipeQuery);
  Recipe.find({tags: requestedTag}, function(err, matchingRecipes){
    res.render("recipes", {recipes: matchingRecipes});
  });
});

app.post("/add", function(req,res){
  const tagsList = req.body.tags;
  let tags = tagsList.replace(/\s+/g, ''); 
  tags = tags.split(',');
  toUpper = function(x){ 
    return x.charAt(0).toUpperCase() + x.slice(1);
  };
  tags = tags.map(toUpper);
  const recipe = new Recipe({
    name: req.body.recipeName,
    imageURL: req.body.imageUrl, 
    description: req.body.recipeDesc,
    prepTime: req.body.prepTime,
    cookTime: req.body.cookTime,
    noOfServings: req.body.noOfServings,
    tags: tags,
    ingredients: req.body.newIngredient,
    instructions: req.body.newInstruction
  });
  recipe.save(function(err){
    if(!err){
      function drawRecipes(foundRecipes){
        const randomRecipes = [];
        while (randomRecipes.length < 3){
          let randomNumber = Math.floor(Math.random() * foundRecipes.length);
          if(randomRecipes.includes(randomNumber) === false){
            randomRecipes.push(randomNumber);
          }
        }
        return randomRecipes;
      }
      Recipe.find({}, function(err, foundRecipes){
        res.render("success", {
          recipes: foundRecipes, 
          randomRecipes: drawRecipes(foundRecipes),
          recipeName: recipe.name,
          recipeURL: recipe.imageURL,
          prepTime: recipe.prepTime,
          cookTime: recipe.cookTime,
          id: recipe._id
        });
      });
    }
  });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
    });