import mongoose from "mongoose";

const librarySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true    
  },
  books:[{
    type : mongoose.Schema.Types.ObjectId,
    ref: "Books",
  }]
});

export const RecipesModel = mongoose.model("Library", librarySchema);
