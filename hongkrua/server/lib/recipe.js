const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema({
    selectedImage:{String},
    title: {String},
    nation: {String},
    type: {String},
    details: {String},
    steps: [{
        step: {String},
        image1: {String},
        image2: {String} // เก็บ URL ของรูปภาพหรือใช้ GridFS สำหรับรูปภาพไบนารี
    }],
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;