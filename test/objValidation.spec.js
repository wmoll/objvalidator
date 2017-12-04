
var assert = require('./helpers/assert');

var ObjValidation = require('../index').ObjValidation, objValidation = new ObjValidation();

describe("Test ObjValidation functionality", function () {

  it("should verify notEmpty rule", function () {
    var validationParams = [
      {
        fieldId : 'singer',
        fieldName : 'Singer',
        fieldType: "string",
        rules:[
          { method : 'notEmpty', message: 'Expected Singer cannot be empty'}
        ]
      },
      {
        fieldId : 'song',
        fieldName : 'Song',
        fieldType: "string",
        rules:[
          { method : 'notEmpty', message: 'Expected Song cannot be empty'}
        ]
      },
      {
        fieldId : 'type',
        fieldName : 'Type',
        fieldType: "string",
        optional: true,
        rules:[
          { method : 'notEmpty', message: 'Expected Type cannot be empty'}
        ]
      }
    ];

    var object1 = {singer: "B.B. King", song: "The Thrill Is Gone", type: "live"};  // singer exist and is not empty

    var object2 = {singer: "B.B. King", song: "", type: "live"};  // song exist but empty -> raise error

    var object3 = {singer: "B.B. King", song: "The Thrill Is Gone", type: ""}; // Type exist but is empty

    var object4 = {singer: "B.B. King", song: "The Thrill Is Gone"}; // Type is not exist

    assert(objValidation.validateProcess(validationParams, object1).length === 0, "singer test did not passed");
    assert(objValidation.validateProcess(validationParams, object2).length === 1, "song test did not passed");
    assert(objValidation.validateProcess(validationParams, object3).length === 0, "type optional did not passed");
    assert(objValidation.validateProcess(validationParams, object4).length === 0, "type optional test did not passed");

  });

  it("should verify minLength/maxLength rules", function () {
    var validationParams = [
      {
        fieldId : 'singer',
        fieldName : 'Singer',
        fieldType: "string",
        rules:[
          { method : 'minLength', param: 3, message: 'Expected Singer cannot be empty'},
          { method : 'maxLength', param: 6, message: 'Expected Singer cannot be empty'}
        ]
      }
    ];

    var object1 = {singer: "B.B. King"};  // singer shall not pass as of length > 6 -> raise error
    var object2 = {singer: "Sting"};      // singer shall pass as of 3 < length < 6
    var object3 = {singer: "VJ"};         // singer shall not pass as of length < 3 -> raise error

    assert(objValidation.validateProcess(validationParams, object1).length === 1, "object1 test did not passed");
    assert(objValidation.validateProcess(validationParams, object2).length === 0, "object2 test did not passed");
    assert(objValidation.validateProcess(validationParams, object3).length === 1, "object3 test did not passed");

  });

  it("should verify email rule", function () {
    var validationParams = [
      {
        fieldId : 'singerEmail',
        fieldName : 'Singer Email',
        fieldType: "email",
        optional: true,
        rules:[
          { method : 'email', message: 'Expected Author Email must be an email' }
        ]
      }
    ];

    var object1 = {singer: "B.B. King", singerEmail: "bbking@gmail.com"};  // pass as off singerEmail presented
    var object2 = {singer: "B.B. King", singerEmail: ""};      // will not pass as of singerEmail is presented but empty
    var object3 = {singer: "B.B. King"};         // will pass as off singerEmail is not presented and the rule is optional

    assert(objValidation.validateProcess(validationParams, object1).length === 0, "object1 test did not passed");
    assert(objValidation.validateProcess(validationParams, object2).length === 1, "object2 test did not passed");
    assert(objValidation.validateProcess(validationParams, object3).length === 0, "object3 test did not passed");

  });

});
