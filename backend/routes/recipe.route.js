    const express = require("express")
    const {getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload} = require("../controller/recipe.controller")
    const router=express.Router();
    const verifyToken = require("../middleware/auth")
  

    router.get("/",getRecipes)//Get all recipe 
    router.get("/:id",getRecipe)//Get recipe by id
    router.post("/",upload.single('coverImage'),verifyToken ,addRecipe) //add recipe
  router.put("/:id",upload.single('coverImage'),editRecipe) //Edit recipe
    router.delete("/:id",deleteRecipe)//delete recipe
    module.exports=router