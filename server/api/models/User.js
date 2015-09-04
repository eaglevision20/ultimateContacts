/**
* User.js
*
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  	schema: true,
    attributes: {

    	contacts: { 
            collection: 'contact',
          	via: 'user'
        },

        imageUrl: {
            type: 'string',
        },

        firstName: {
            type: 'string',
            maxLength: 80,
            defaultsTo: "Anonymous"
        },

        lastName: {
            type: 'string',
            maxLength: 80,
            defaultsTo: "Anonymous"
        },

        email: {
            type: 'email',
            required: true,
            unique: true
        },

        phoneNumber: {
            type: 'string',
            // required: true
        },

        isAdmin: {
            type: 'boolean',
            defaultsTo: false
        },

        password: {
            type: 'string',
            // required: true
            // if password is required errors are thrown when admin edits w/o also passing PW.
        },

    },

    
    beforeUpdate: function (values, next) {
        var bcrypt = require('bcrypt');
        if(values.password && values.pwTest){
            bcrypt.genSalt(10, function(err, salt) {
                if (err) return next(err);
                    console.log('values', values);
                    bcrypt.hash(values.password, salt, function(err, hash) {
                if (err) return next(err);

                    values.password = hash;
                    next();
                });
            });
        } else {
            console.log('skipped', values.password);
            next();
        }
    },

    beforeCreate: function (attrs, next) {
        var bcrypt = require('bcrypt');

        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);

                bcrypt.hash(attrs.password, salt, function(err, hash) {
            if (err) return next(err);

                attrs.password = hash;
                next();
            });
        });
    }
};

