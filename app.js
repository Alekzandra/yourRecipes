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

// const recipe = new Recipe({
//   name: "Omelette",
//   imageURL: "https://images.unsplash.com/photo-1494597706938-de2cd7341979?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1204&q=80",
//   description: "Omellettes are not that scare as they seem to be! Making an omelteere at home is almost easy. With few tips you can pull this off in minutes. Fill it with whatever you have on hand - freezer leftovers will do perfect for this!",
//   prepTime: 5,
//   cookTime: 5,
//   noOfServings: 1,
//   tags: ["Breakfast"],
//   ingredients: ["3x eggs", "butter", "filling of your chosing"],
//   instructions: ["Beat the eggs.", "Melt tle butter. Keep the temperature low and slow when cooking the eggs so the bottom doesn't get too brown or overcooked.", "Add the eggs, Let them sit for a minute, then gently use a heatproof spatula to lift the cooked part from the edges of the pan. Tilt the pan to allow the uncooked eggs to flow to the edge.", "Fill the omelette, but don't overstuff it. Cook few more seconds.", "Fold in half and slide it onto a plate. Enjoy!"]
// });

// Recipe.insertMany(recipe, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Success!");
//   }
// });

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