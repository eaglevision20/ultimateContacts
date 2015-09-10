/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	login: function (req, res) {
	    console.log('found the api');
      var bcrypt = require('bcrypt');
	    if(typeof req.body.username === undefined || req.body.username === '' || req.body.password === ''){
	      	res.json(
	        	{ 
	          		error: 'Please complete the entire form before submitting.'
	        	}, 404);
	    }

      	User.findOneByEmail(req.body.username).exec(function (err, user) {
        	if (err) res.json({ error: 'DB error' }, 500);

        	if (user) {
          		bcrypt.compare(req.body.password, user.password, function (err, match) {
            	if (err) res.json({ error: 'Server error' }, 500);

            	if (match) {
              		// set session user id for frontend access
              		req.session.user = user.id;
              		res.json({
              			// Tokening not implemented but available for later
                		access_token: '1',
                		userId: user.id,
                		siteAdmin: user.siteAdmin
              		})
            	} else {
              		// invalid password
              		if (req.session.user) req.session.user = null;
              		res.json({ error: 'Invalid password' }, 400);
            	}
          	});
        	} else {
          		res.json({ error: 'User not found. Please review your user name.' }, 404);
        	}
      	});
    }
};

