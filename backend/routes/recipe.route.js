const express = require("express")
const {getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe} = require("../controller/recipe.controller")
const router=express.Router();

router.get("/",getRecipes)//Get all recipe 
router.get("/:id",getRecipe)//Get recipe by id
router.post("/",addRecipe)//add Recipe
router.put("/:id",editRecipe)//edit recipe
router.delete("/:id",deleteRecipe)//delete recipe
module.exports=router