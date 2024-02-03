const mongoose = require("mongoose");
const ingredientSchema = new mongoose.Schema(
  {
    img: String,
    title: String,
    detail: [String],
    source: [
      {
        source: String,
        logo: String,
        price: String,
        url: String,
      },
    ],
  },
  { collection: "ingredient" }
);

const ingredient = mongoose.model("ingredient", ingredientSchema);
module.exports = ingredient;
