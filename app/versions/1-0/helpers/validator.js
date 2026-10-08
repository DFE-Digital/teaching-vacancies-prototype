const _ = require('lodash');

function Validator(req, res) {
  this.req = req;
  this.res = res;
	this.validators = [];
	this.errors = [];
}

Validator.prototype.add = function(params) {
	this.validators.push(params);
};

Validator.prototype.getErrors = function() {
	return this.errors;
};

Validator.prototype.getFormattedErrors = function() {
	return this.errors.map(this.formatError);
};

Validator.prototype.exposeInlineErrors = function() {
  this.res.locals.inlineErrors = {};
  this.errors.forEach(error => {
    const { name, message } = error;
    _.set(this.res.locals.inlineErrors, name, { text: message })
  });
};

Validator.prototype.exposeErrorSummaryItems = function() {
  this.res.locals.errorSummary = {
    items: this.getFormattedErrors()
  };
};

Validator.prototype.formatError = function(error) {
	return {
    text: error.message,
		href: '#' + error.name
	};
};

Validator.prototype.getError = function(name) {
	return this.getErrors().filter(error => error.name == name).map(this.formatError)[0];
};

Validator.prototype.validate = function() {
  const body = this.req.body;
  const errors = [];

  for( let validator of this.validators ) {

    const { name, rules } = validator;
    const value = _.get(body, name)

    for( let rule of rules ){

      const { fn, params, message} = rule;
      const isValid = fn( value, params );

      if( !isValid ){
        errors.push( { name, message } );
        break;
      }
    }
  }

  this.errors = errors;
  this.exposeInlineErrors();
  this.exposeErrorSummaryItems();
  this.res.locals.hasValidationErrors = true;

  return errors.length == 0;
};


module.exports = Validator;