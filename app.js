var express 			= require("express"),
	app 				= express(),
	bodyParser 			= require('body-parser'),
	mongoose 			= require('mongoose'),
	methodOverride 		= require('method-override'),
	passport			= require('passport'),
	localStrategy		= require('passport-local'),
	flash				= require('connect-flash'),
	//Models
	Recipe 				= require("./models/recipe"),
	Comment				= require("./models/comment"),
	User				= require("./models/user"),
	//Seed file
	seedDB				=require("./seeds");

//require routes
var indexRoutes		= require("./routes/index"),
	recipeRoutes 	= require("./routes/recipes"),
	commentRoutes 	= require("./routes/comments");


//APP CONFIG
mongoose.connect('mongodb://localhost/breakfast-rate');
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));	//css
app.use(bodyParser.urlencoded({ extended: true }));	//tells express to use bodyParser
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
	secret: "Peyton Manning takes HGH!!!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//runs for ever single route
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});

app.use("/", indexRoutes);
app.use("/recipes", recipeRoutes);
app.use("/recipes/:id/comments",commentRoutes);





app.listen(process.env.PORT || 3000, function(){
	console.log('The Breakfast Rate server is running...');
});