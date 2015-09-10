import Ember from 'ember';

export default Ember.Controller.extend({
	firstName: '',
	lastName: '',
	imageUrl: '',
	email: '',
	phoneNumber: '',
	password: '',
	verifyPW: '',
	formErrors: [],
	message: null,

	actions: {
		createUser: function () {
			var self = this,
				testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
				testNum = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/i,
				formErrors = [],
				user = {
					firstName: this.get('firstName'),
					lastName: this.get('lastName'),
					imageUrl: this.get('imageUrl'),
					email: this.get('email'),
					phoneNumber: this.get('phoneNumber'),
					password: this.get('password')
				};

			if(user.firstName.length < 2){
				formErrors.push('Please Provide a First Name');
			}

			if(user.lastName.length < 2){
				formErrors.push('Please Provide a Last Name');
			}

			if(user.email.length < 2 || !testEmail.test(user.email)){
				formErrors.push('Please Provide a Valid Email');
			}

			if(!testNum.test(user.phoneNumber)){
				formErrors.push('Please Provide a Valid Phone Number');
			}

			if(user.password.length < 4){
				formErrors.push('Please Provide a Password of at Least 4 Characters');
			}

			if(user.password != this.get('verifyPW')){
				formErrors.push('The Entered Passwords Do Not Match');
			}

			this.set('formErrors',formErrors);
			
			var onSuccess = function(user) {
                self.setProperties({
                    'firstName': null,
                    'lastName': null,
                    'imageUrl': null,
                    'email': null,
                    'phoneNumber': null,
                    'password': null,
                    'verifyPW': null,
                });
                self.send('setMessage', "User Created Successfully. Please Log in.");
            };

            var onFail = function(error) {

                self.send('setMessage', "User failed to save. Please double check all fields are filled out.");
            };

			if(!Ember.isEmpty(formErrors)){
				return;
			} else {
				this.store.createRecord('user',user).save().then(onSuccess,onFail);
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