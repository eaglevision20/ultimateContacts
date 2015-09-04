/**
* Contact.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	schema: true,
  	attributes: {
        
        user: { model: 'User' },
  		
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
	        // required: true,
            // unique: true
        },

        phoneNumber: {
            type: 'string',
            // required: true
        },

        tags: {
            type: 'array'
        },

        groups: {
        	type: 'array'
        }
  	}
  }
};

