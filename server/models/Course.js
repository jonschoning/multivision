var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
  title: {type:String, required:'{PATH} is required!'},
  featured: {type:Boolean, required:'{PATH} is required!'},
  published: {type:Date, required:'{PATH} is required!'},
  tags: [String]
});
var Course = mongoose.model('Course', courseSchema);

  function createDefaultCourses() {

    Course.find({}).exec(function(err, collection) {
      if(collection.length === 0) {
        Course.create({title: 'C# for Non-Sociopaths', featured: false, published: new Date('4/5/2014'), tags: ['C#']});
        Course.create({title: 'D  for Non-Sociopaths', featured: false, published: new Date('2/3/2014'), tags: ['D']});
        Course.create({title: 'C  for Sociopaths', featured: true, published: new Date('5/3/2014'), tags: ['C']});
        Course.create({title: 'B  for Non-Sociopaths', featured: false, published: new Date('1/1/2014'), tags: ['B']});
        Course.create({title: 'F# for Sociopaths', featured: true, published: new Date('2/4/2014'), tags: ['F#']});
      }
    });
  }

exports.createDefaultCourses = createDefaultCourses;
