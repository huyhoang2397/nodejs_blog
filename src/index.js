const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;

const route = require('./routes');

//static file
app.use(express.static(path.join(__dirname, "public")));

app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.json());
//XMLHttpRequest, fetch, axios,...

//HTTP logger
app.use(morgan("combined"));

//Template engine
app.engine(
	".hbs",
	engine({
		extname: ".hbs",
	})
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources","views"));

//Route init
route(app);
//127.0.0.1 - localhost

		app.listen(port, () => {
	console.log(`App listening on http://localhost:${port}`);
});
