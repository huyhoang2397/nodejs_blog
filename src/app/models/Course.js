const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete')


const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, default: '', maxLength: 255, required: true },
    description: { type: String, default: '', maxLength: 600 },
    image: { type: String, maxLength: 255 },
    videoId: { type: String, required: true },
    level: { type: String, default: 'Co ban' },
    // them slug auto
    slug: { type: String, slug: 'name', unique: true },
}, {
    timestamps: true,
});
//add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Course', Course);