const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const Course = require('../models/Course')

class CourseController {


	//[Get] /Courses/:slug
	show(req, res, next) {
		Course.findOne({ slug: req.params.slug })
			.then(course => {
				res.render('courses/show', { course: mongooseToObject(course) })
			})
			.catch(next);
	}

	//[get] /course/create
	create(req, res, next) {
		res.render('courses/create')
	}

	//Create
	//[post] /course/store
	store(req, res, next) {
		req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/asdasd.jpg`;
		const course = new Course(req.body);
		course.save()
			.then(() => res.redirect('/me/stored/courses'))
			.catch(error => {

			});
	}

	//Edit
	//[get] /courses/:id/edit
	edit(req, res, next) {
		Course.findById(req.params.id)
			.then(course => res.render('courses/edit', {
				course: mongooseToObject(course)
			}))
			.catch(next);
	}

	//[put] /courses/:id
	update(req, res, next){
		Course.updateOne({_id: req.params.id}, req.body)
			.then( () => res.redirect('/me/stored/courses')) //them key location /me/store/courses vao header response
			.catch(next);
	}

	// [DELETE] /courses/:id
	destroy(req, res, next) {
		Course.delete({ _id: req.params.id })
			.then(() => res.redirect('back'))
			.catch(next);
	}
	// destroy(req, res, next) {
	// 	Course.deleteOne({_id: req.params.id })
	// 		.then(() => res.redirect('back'))
	// 		.catch(next);
	// }

	//[DELETE] /courses/:id/force
	forceDestroy(req, res, next) {
		Course.deleteOne({_id: req.params.id })
			.then(() => res.redirect('back'))
			.catch(next);
	}

	//[PATCH] //courses/:id/restore
	restore(req, res, next) {
		Course.restore({ _id: req.params.id })
			.then(() => res.redirect('back'))
			.catch(next);
	}
	//GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD

	//[POST] /courses/handle-form-actions
	handleFormActions(req, res, next){
		switch(req.body.action){
			case 'delete':
				Course.delete({ _id: {  $in: req.body.courseIds }}) //xoa cac id co trong list courseIds
					.then(() => res.redirect('back'))
					.catch(next);
				break;
			
			case 'restore':
				Course.restore({ _id: { $in: req.body.courseIds } })
					.then(() => res.redirect('back'))
					.catch(next);
				break;

			case 'forceDestroy':
				Course.deleteOne({ _id: { $in: req.body.courseIds } })
					.then(() => res.redirect('back'))
					.catch(next);
				break;

			default:
				res.json({message: 'Action is invalid!'})
		};
	}
}

module.exports = new CourseController;