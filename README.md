[![Build Status](https://travis-ci.org/wmoll/objvalidator.svg?branch=master)](https://travis-ci.org/wmoll/objvalidator)

# objvalidator

Simple nodejs module for validate object elements by custom rule with custom
error messages.

# Validator Declarations

Validators for various object types are declares in a config file (File may
contain validator definitions for one or more objects).

    // Properties in an ordered sequence
    var personvalidator = [
      {
        fieldId : 'firstname',
        fieldName : 'First Name',
        rules:[
          { method : 'notEmpty', message: 'First Name cannot be empty'},
          { method : 'maxLength', param : 2}
        ]
      },
      {
        fieldId : 'lastname',
        fieldName : 'Last Name',
        rules:[
          { method : 'notEmpty', message: 'Last Name cannot be empty'},
          { method : 'maxLength', param : 2}
        ]
      },
       
    ];
    module.exports.validationPool = {
       person: personvalidator
    };



# Usage

Load this config in your application (Node.js example)

    // Load Config
    var validatorConfig = require("./validationmodel.conf.js");
    // Load Object Validator Module
    var ObjValidation  = require('objvalidator');

Somewhere in the app - run validation...

    var type = 'person';
    // Lookup validator for the object
    var personvalidator = validatorConfig[type];
    // Instantiate validator
    var validator = new ObjValidation.ObjValidation();
    // Object to Validate
    var a_person = {'firstname': 'Bob', 'firstname': '',};
    // Run Validation
    var validation = validator.validateProcess(personvalidator, a_person);

