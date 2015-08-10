"use strict";

function ObjValidation(opts) {
    opts = opts || {};

    var validator = this;



    this.checkEmpty = function(value, rule){
        if(value.length === 0 ){
            if(typeof rule.message !== 'undefined'){
                return rule.message;
            }else{
                return 'Value should by not empty';
            }
        }
        return '';
    }

    this.checkMinLength = function(value, rule){
        if(typeof rule.param === 'undefined'){
            return 'Validation rule error!';
        }

        if(value.length < parceInt(rule.param) ){
            if(typeof rule.message !== 'undefined'){
                return rule.message;
            }else{
                return 'Value should by minimum '+parceInt(rule.param)+' chars length';
            }
        }
        return '';
    }

    this.checkMaxLength = function(value, rule){
        if(typeof rule.param === 'undefined'){
            return 'Validation rule error!';
        }

        if(value.length > parceInt(rule.param) ){
            if(typeof rule.message !== 'undefined'){
                return rule.message;
            }else{
                return 'Value should by minimum '+parceInt(rule.param)+' chars length';
            }
        }
        return '';
    }

    this.validateProcess = function (rules, object) {
        var errors = [];
        rules.forEach(function(rule){
            //value for testing
            var value = object[rule.fieldId];

            //check for isset
            if(typeof(value)==='undefined'){
                errors.push({
                    field:rule.fieldId,
                    messge:'Field '+rule.fieldId+' not defined'
                });
            }else{
                rule.rules.forEach(function(singlerule){
                    var validMessage = '';
                    switch (singlerule.method) {
                        case 'notEmpty':
                            validMessage = validator.checkEmpty(value, singlerule);
                            break
                        case 'minLength':
                            validMessage = validator.checkMinLength(value, singlerule);
                            break
                        case 'maxLength':
                            validMessage = validator.checkMaxLength(value, singlerule);
                            break
                        default:
                    }

                    if(validMessage !== ''){
                        errors.push({
                            field:rule.fieldId,
                            messge:validMessage
                        });
                    }

                });
            }
        })

        return errors;
    };
}


var module;
if (!module) {module = { exports: null}; }
module.exports.ObjValidation = ObjValidation;
