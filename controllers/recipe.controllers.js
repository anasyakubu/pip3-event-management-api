const Recipe = require("../models/recipe.modal");

// List Recipe
const recipeList = (req, res) => {
  Recipe.find({})
    .then((recipe) => res.status(200).json({ status: 200, data: recipe }))
    .catch((err) => res.status(400).json(err));
};

// Fetch Recipe [One]
const getRecipe = (req, res) => {
  const id = req.params.id;
  Recipe.find({ _id: id })
    .then((recipe) => res.status(200).json({ status: 200, data: recipe }))
    .catch((err) => res.status(400).json(err));
};

//Add Recipe
const addRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      ingredients,
      instructions,
      categories,
      tags,
      userID,
    } = req.body;

    // Check if all required fields are provided
    if (!title) {
      return res.status(400).json({ status: 400, error: "Title is required" });
    }
    if (!description) {
      return res
        .status(400)
        .json({ status: 400, error: "Description is required" });
    }
    if (!ingredients) {
      return res
        .status(400)
        .json({ status: 400, error: "Ingredients are required" });
    }
    if (!instructions) {
      return res
        .status(400)
        .json({ status: 400, error: "Instructions are required" });
    }
    if (!categories) {
      return res
        .status(400)
        .json({ status: 400, error: "Categories are required" });
    }
    if (!tags) {
      return res.status(400).json({ status: 400, error: "Tags are required" });
    }
    if (!userID) {
      return res
        .status(400)
        .json({ status: 400, error: "User ID is required" });
    }

    // Check if the recipe already exists
    const existingRecipe = await Recipe.findOne({ title });
    if (existingRecipe) {
      return res
        .status(400)
        .json({ status: 400, error: "Recipe already exists" });
    }

    // Create a new recipe in the database
    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      instructions,
      categories,
      tags,
      userID,
    });

    // Return the newly created recipe
    return res.status(201).json(recipe);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, error: "Internal Server Error" });
  }
};

// update Recipe
const updateRecipe = async (req, res) => {
  const id = req.params.id;
  try {
    const { title, description, ingredients, instructions, categories, tags } =
      req.body;
    // check if details was entered
    if (!title) {
      return res.status(400).json({ status: 400, error: "Title is required" });
    }
    if (!description) {
      return res
        .status(400)
        .json({ status: 400, error: "Descriptionis required" });
    }
    if (!ingredients) {
      return res
        .status(400)
        .json({ status: 400, error: "Ingredients is required" });
    }
    if (!instructions) {
      return res
        .status(400)
        .json({ status: 400, error: "Instructions is required" });
    }
    if (!categories) {
      return res
        .status(400)
        .json({ status: 400, error: "Categories is required" });
    }

    if (!tags) {
      return res.status(400).json({ status: 400, error: "Tags is required" });
    }

    const update = await Recipe.findByIdAndUpdate(
      { _id: id },
      { title, description, ingredients, instructions, categories, tags }
    )
      .then((update) => res.status(200).json(update))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

// delete Recipe
const deleteRecipe = (req, res) => {
  const id = req.params.id;
  Recipe.findByIdAndDelete({ _id: id })
    .then((deleteData) => res.status(200).json(deleteData))
    .catch((err) => console.log(err));
};

module.exports = {
  addRecipe,
  recipeList,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};
