const Course = require('../models/Course');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
class MeController {

	//[get] /me/stored/courses
	storedCourses(req, res, next){

		Promise.all([Course.find({}), Course.countDocumentsDeleted()])
			.then(([courses, deletedCount])=>
				res.render('me/stored-courses', {
					deletedCount,
					courses: mutipleMongooseToObject(courses)
				})
			)
			.catch(next);
		
	}

	//[get] /me/trash/courses
	trashCourses(req, res, next) {
		Course.findDeleted({})
			.then(courses => res.render('me/trash-courses', {
				courses: mutipleMongooseToObject(courses)
			}))
			.catch(next)

	}
}

module.exports = new MeController;
