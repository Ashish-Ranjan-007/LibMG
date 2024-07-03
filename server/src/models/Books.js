import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: [
    {
      type: String,
      required: true,
    },
  ],
  issuedto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    },
  isIssued: {
    type: Boolean,
    required: true,
    default:false,
  },
 issuehistory:[{
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",

}],
library:[{
  type : mongoose.Schema.Types.ObjectId,
  ref: "Library",
}]

});

export const BooksModel = mongoose.model("Books", bookSchema);
