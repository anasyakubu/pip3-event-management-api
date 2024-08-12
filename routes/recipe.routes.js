const express = require("express");
const router = express.Router();
const {
  addRecipe,
  recipeList,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipe.controllers");

// Recipe
router.get("/recipe/list", recipeList);
router.get("/recipe/get/:id", getRecipe);
router.post("/recipe/add", addRecipe);
router.put("/recipe/update/:id", updateRecipe);
router.delete("/recipe/delete/:id", deleteRecipe);

module.exports = router;
