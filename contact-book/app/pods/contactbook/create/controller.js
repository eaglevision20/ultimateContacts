import Ember from 'ember';

export default Ember.Controller.extend({
	firstName: '',
	lastName: '',
	imageUrl: '',
	email: '',
	phoneNumber: '',
	tags: [],
	groups: [],
	formErrors: [],
	message: null,

	actions: {
		createContact: function () {
			var self = this,
				testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
				testNum = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/i,
				formErrors = [],
				contact = {
					user: this.get('session.content.userId'),
					firstName: this.get('firstName'),
					lastName: this.get('lastName'),
					imageUrl: this.get('imageUrl'),
					email: this.get('email'),
					phoneNumber: this.get('phoneNumber'),
					tags: this.get('tags').split(" ,"),
					groups: this.get('groups').split(" ,")
				};

			if(contact.firstName.length < 2){
				formErrors.push('Please Provide a First Name');
			}

			if(contact.lastName.length < 2){
				formErrors.push('Please Provide a Last Name');
			}

			if(contact.email.length < 2 || !testEmail.test(contact.email)){
				formErrors.push('Please Provide a Valid Email');
			}

			if(contact.phoneNumber.length > 1 && !testNum.test(contact.phoneNumber)){
				formErrors.push('Please Provide a Valid Phone Number');
			}


			this.set('formErrors',formErrors);
			
			var onSuccess = function(contact) {
                self.setProperties({
                    'firstName': null,
                    'lastName': null,
                    'imageUrl': null,
                    'email': null,
                    'phoneNumber': null,
                    'tags': null,
                    'groups': null,
                });
                self.send('setMessage', "Contact Created Successfully.");
            };

            var onFail = function(error) {
                console.log(error.responseJSON.invalidAttributes)
                self.send('setMessage', "Contact failed to save. Please double check all fields are filled out.");
            };

			if(!Ember.isEmpty(formErrors)){
				return;
			} else {
				this.store.createRecord('contact',contact).save().then(onSuccess,onFail);
			}
		},

		setMessage: function (message) {
            if (message){
                this.set('message', message);
            } else {
                this.set('message', null);
            }
        },
	}

});