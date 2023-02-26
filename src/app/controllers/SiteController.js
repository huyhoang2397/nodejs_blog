const Course = require('../models/Course');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
class SiteController {

	//[GET] /
	index(req, res, next) {
		// res.render("home");

		//Callback
		// Course.find({}, function (err, courses) {
		// 	if (!err) {
		// 		res.json(courses);
		// 	} else {
		// 		next(err);
		// 		res.status(400).json({ error: 'ERROR!!!' });
		// 	}
		// })

		//Promises
		Course.find({})
			.then(courses => {
				//courses = courses.map(course => course.toObject())
				//fix loi bao mat hbs bang map toObject
				res.render('home', {
					courses: mutipleMongooseToObject(courses)
					//courses: courses
				})
			})
			.catch(next);
	}

	//[Get] /search
	search(req, res) {
		res.render("search");
	}

}

module.exports = new SiteController;
