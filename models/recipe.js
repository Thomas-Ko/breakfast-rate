var mongoose 	= require("mongoose");

var recipeSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	created: {type: Date, default: Date.now},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
	ingredients: [],
	source: {type: String, default:""}
});

var Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;