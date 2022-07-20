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