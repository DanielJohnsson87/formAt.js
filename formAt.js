(function($) {
	'use strict'

var validateFlag = {},
	errorMessages = {},
/**
 * Methods object. Store all the methods needed for the plugin here
 * Then we will require the specific method we need in the format function.
 */
	methods = {


		/**
		 * nameRule 
		 * Validates if a name matches the following rules.
		 * Rules: Accepts the english & Swedish Alpabet, numbers and spaces.
		 * Minimum 3 characters and max 35.
		 */
		dataname : function(string) {
			var regEx = new RegExp(/^[A-ZÅÄÖa-zåäö0-9 ]{3,35}$/);
				errorMessages = {dataname : '* Not a valid name.'}
			return regEx.test(string);
		},


		/**
		 * emailRule
		 * Validates if a the string looks like an email
		 * Rules: Must be 2 or more characters before @
		 *  Must be more than 3 characters after the @ 
		 *  and between 2-4 characters after the dot '.' 
		 */
		dataemail : function(string) {
			var regEx = new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+)*\w[\w-]{0,66})([a-z]{2,6}(?:\.[a-z]{2,4})?)$/i);
				errorMessages = {dataemail : '* Not a valid E-mail.'}
			return regEx.test(string);
		},
		/**
		 * usernameRule
		 * Validates if the userid string matches the following rules.
		 * Rules: Accepts English alphabet & numbers. No special characters exempt underscore('_')
		 * minimum 3 characters and max 20.
		 */
		datausername : function(string) {
			var regEx = new RegExp(/^[A-Za-z0-9_]{3,20}$/);
				errorMessages = {datausername: '* Not a valid username.'}
			return regEx.test(string);
		},
		/**
		 * passwordRule
		 * Validates if the userid string matches the following rules.
		 * Rules: Minimum length 6 characters and max 20. 
		 * Supports the following special characters:
		 *  ! @ # $ % ^ & * ( ) _
		 */
		datapassword : function(string) {
			var regEx = new RegExp(/^[A-Za-z0-9!@#$%^&*()_]{6,20}$/);
				errorMessages = {datapassword : '* Not a valid password.'}
			return regEx.test(string);
		},

		/**
		 * numberRule
		 * Validates if the number string only contains numbers
		 * and the dash '-'
		 */
		datanumber : function(string) {
			var regEx = new RegExp( /^[0-9-]+$/);
				errorMessages = {datanumber : '* Must be a number.'}
			return regEx.test(string);
		},
		/**
		 * requiredRule
		 * Validates if the field has anything but a single
		 * whitespace or nothing at all.
		 */
		datarequired : function(string) {
			var regEx = new RegExp(/\S/);
				errorMessages = {datarequired : '* This field is required.'}
			return regEx.test(string);
		},

		/**
		 * datamaxlength 
		 * defines a max length of a input field
		 */

		datamaxlength : function(string, rule) {
			var regEx = new RegExp('^\\S{0,' + rule + '}$');
				errorMessages = {datamaxlength : '* Can´t be longer than ' + rule + ' characters.',};
				return regEx.test(string);
		},
		/**
		 * dataminlength
		 * defines a min length of a input field
		 */
		dataminlength : function(string, rule) {
			var regEx = new RegExp('^\\S{' + rule + ',}$');
				errorMessages = {dataminlength : '* Must be atleast ' + rule + ' characters.',};
				return regEx.test(string);
		},

		datarange : function(string, rule) {
			var regEx = new RegExp('^\\S{' + rule + '}$');
				errorMessages = {datarange : '* Out of range. Must be between ' + rule + ' characters.',};
				return regEx.test(string);
		},

		dataregex : function(string, rule) {
			var regEx = new RegExp(rule);
				errorMessages = {dataregex : '* Incorrect input.',};
				return regEx.test(string);
		},

		datacreditcard : function(string, rule) {
			var onlyDigits = string.replace(/-/g, '');
			switch(rule) {
				case 'visa':
					//All Visa card numbers start with a 4. New cards have 16 digits. Old cards have 13. 
					var regEx = new RegExp(/^4[0-9]{12}(?:[0-9]{3})?$/);
					errorMessages = {datacreditcard : '* Not a valid ' + rule + 'card number.'};
					return regEx.test(onlyDigits);

				case 'mastercard':
					//All MasterCard numbers start with the numbers 51 through 55. All have 16 digits. 
					var regEx = new RegExp(/^5[1-5][0-9]{14}$/);
					errorMessages = {datacreditcard : '* Not a valid ' + rule + ' number.'};
					return regEx.test(onlyDigits);

				case 'american express':
					//American Express card numbers start with 34 or 37 and have 15 digits. 
					var regEx = new RegExp(/^3[47][0-9]{13}$/);
					errorMessages = {datacreditcard : '* Not a valid ' + rule + ' card number.'};
					return regEx.test(onlyDigits);

				case 'Diners club':
					//Diners Club card numbers begin with 300 through 305, 36 or 38. All have 14 digits. 
					//There are Diners Club cards that begin with 5 and have 16 digits. These are a joint venture between 
					//Diners Club and MasterCard, and should be processed like a MasterCard. 
					var regEx = new RegExp(/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/);
					errorMessages = {datacreditcard : '* Not a valid ' + rule + ' card number.'};
					return regEx.test(onlyDigits);

				case 'Discover':
					//Discover card numbers begin with 6011 or 65. All have 16 digits. 
					var regEx = new RegExp(/^6(?:011|5[0-9]{2})[0-9]{12}$/);
					errorMessages = {datacreditcard : '* Not a valid ' + rule + ' card number.'};
					return regEx.test(onlyDigits);
				case 'JCB' :
					//JCB cards beginning with 2131 or 1800 have 15 digits. JCB cards beginning with 35 have 16 digits. 
					var regEx = new RegExp(/^(?:2131|1800|35\d{3})\d{11}$/);
					errorMessages = {datacreditcard : '* Not a valid ' + rule + ' card number.'};
					return regEx.test(onlyDigits);
				default:
					// All of the regexes above
					var regEx = new RegExp(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/);
						errorMessages = {datacreditcard : '* Not a valid Creditcard number'};
						return regEx.test(onlyDigits);
			}
		},

		/**
		 * Check if a field has focus or not. If it does, highlight it.
		 * When a field looses focus, run the validateInput method.
		 */
		validateForm : function(settings) {
			$('#formAt, #formAt input, #formAt textarea').on('focus', function() {
				var $this = $(this);
				$this.addClass('highlight')
				//Must use unbind because we are attaching a new focusout event handler 
				//each time we handle a click. These event handlers are not replaced, 
				//but added, and each event handler is executed when the event is triggered.
				//This quickly gets out of hands since it doubbles each time we click.
						.unbind('focusout')
						.on('focusout', function() {
							$this.removeClass('highlight');
							//Hand over to the validateInput method
							methods.validateIfRequired($this, settings);
							});
			});
		},
		/**
		 * Determine if the element needs to be validated.
		 * If it does, run the validateAccordingToRules function and then
		 * display an alert if a validation error appears. 
		 */
		validateIfRequired : function($this, settings) {
			var element 		= $this,
				input 			= $this.val(),
				id 				= $this.attr('id'),
				validationRules = {},
				dataAttr 		= {};

				//Fetch all attributes from the element we are working with
				$(element[0].attributes).each(function() {
					//Regex to search for all attr that starts with data-
					var data = /^data-/;
					//Check if the attr starts with data- . If it does save it to validationRules
					//and remove the dash '-'
					if(data.test(this.nodeName)) {
						dataAttr = this.nodeName.replace(/-/g, '');
						validationRules[dataAttr] = this.value.toLowerCase();
					}
				});

				//If the object doesent contain a data- attr  ? 
			if(!validationRules) {
				console.log('nothing to validate');
				//Else validate according to the rules in our methods.rule .
			} else {
					//Go through every key in validationRules
					for(var ruleCat in validationRules) {
							//Store the rule in a variabel
							var rule = validationRules[ruleCat],
								validate = methods[ruleCat](input, rule)
								//validate = methods.validateAccordingToRules(rule, input, ruleCat),

						//If it doesn't validate, alert and set the flag to false.
						if(!validate){
							$('#' + dataAttr).remove();
							$this.addClass('alert')
									.after('<p id="' + dataAttr +  '"class="errorMessage">' + errorMessages[dataAttr] + '</p>');
							validateFlag[id] = false;
						//else woho! Remove the alert class and set the flag to true.
						} else {
							validateFlag[id] = true;
							$this.removeClass('alert');
							console.log('woho');
							$('#' + dataAttr).remove();
						}
					}
				}


		},
};
/**
 * format function. 
 */
	$.fn.format = function(method) {

		return this.each(function() {

			var $this = $(this),
				preventPost;

			//Runs the method that we specified when we run our plugin
			methods[method]();

			//When the form is submited
			$this.on('submit', function(event) {
				//itterate through every input, select & textarea button and validate it
				$('#formAt, input, select, textarea').each(function() {
					var thisId = $(this).attr('id');
					//If the field is false or undefined it´s not validated. We need to validate.
					if(!validateFlag[thisId]) {
						//console.log(validateFlag[thisId]);
						methods.validateIfRequired($(this));
						return preventPost = true;
					} else {
						console.log('We succeded');
						return preventPost = false;
					}
				});
				if(preventPost) {
					event.preventDefault();
				};
				//console.log(event);
				//event.preventDefault();

			}); 


		});

		};
})(jQuery);