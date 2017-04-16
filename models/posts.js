var mongoose = require('mongoose');


var postSchema = mongoose.Schema({

  headline:    String,
  content: 	   String,
  datetime:	   Date,
  imageUrl:    String,
  imageDesc:   String,
  position:   {
	  	 before:    {
         type: Boolean,
  	  	 default: true
       }
  }

});




var Post = mongoose.model('post', postSchema);

module.exports = Post;