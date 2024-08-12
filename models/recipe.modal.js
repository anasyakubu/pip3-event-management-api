const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: [String], required: true },
    categories: { type: [String], required: true },
    tags: { type: [String], required: true },
    userID: {
      type: String,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
); // This will automatically add createdAt and updatedAt fields

const RecipeModel = mongoose.model("Recipe", recipeSchema);

module.exports = RecipeModel;
