var express = require('express');
var fs = require('fs');
var multer  = require('multer');
var auth = require('basic-auth');
var router = express.Router();


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/uploads/')
  },
  filename: function (req, file, cb) {

  	fs.exists('public/images/uploads/' + (file.originalname).replace(/\s/g, ''), function(exists) {
    let uploadedFileName;

	    if (exists) {
	    	console.log('gots in here', typeof file.originalname)
	        uploadedFileName = (Date.now() + '_' + file.originalname).replace(/\s/g, '');
	    } else {
	        uploadedFileName = (file.originalname).replace(/\s/g, '');
	    } 
	    cb(null, uploadedFileName)

	});
    
  }
})



var upload = multer({ storage: storage });
var Post = require('../models/posts.js');


/* GET main blog entries ( or listings ) page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/content', function(req, res, next) {
	var q = Post.find().sort({'datetime': -1}).limit(10);
	q.exec(function(err, posts){
		res.send(posts)
	})
});


router.post('/createpost', upload.single('imgFile'), function(req, res, next) {

	var newPost = new Post({
					    headline: req.body.headline,
					    content: req.body.content,
					    imageUrl: req.file ? "/images/uploads/" + req.file.filename : "",
					    imageDesc: req.body.description ? req.body.description : "",
					    datetime: new Date()
				  });

	// do not need to specify an else case when position equals false (therefore before) bc
	// that is the default pos for all new inserted posts. Will have to check both however on the
	// update existing post route because you could be changing a post that has position after
	if(req.body.position === 'on'){
		newPost.position.before = false;
	}


	newPost.save(function(err, post){
		if (err) return next(err);

		res.redirect('/')

	})
	
});

router.get('/auth', function(req, res, next) {
	var credentials = auth(req);

	  if (!credentials || credentials.name !== 'user01' || credentials.pass !== 'secret') {
	    res.statusCode = 401
	    res.setHeader('WWW-Authenticate', 'Basic realm="example"')
	    res.end('Denied')
	  } else {
	    res.render('addpost')
	  }
});

module.exports = router;
