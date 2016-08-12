"use strict";

function ObjValidation(opts) {
    opts = opts || {};

    var validator = this;

    this.checkEmpty = function(value, rule){
        if(value.length === 0 ){
            if(typeof rule.message !== 'undefined'){
                return rule.message;
            }else{
                return 'Value should be not empty';
            }
        }
        return '';
    };

    this.checkMinLength = function(value, rule){
        if(typeof rule.param === 'undefined'){
            return 'Validation rule error!';
        }

        if(value.length < parseInt(rule.param) ){
            if(typeof rule.message !== 'undefined'){
                return rule.message;
            }else{
                return 'Value should be minimum '+parseInt(rule.param)+' chars length';
            }
        }
        return '';
    };

    this.checkMaxLength = function(value, rule){
        if(typeof rule.param === 'undefined'){
            return 'Validation rule error!';
        }

        if(value.length > parseInt(rule.param) ){
            if(typeof rule.message !== 'undefined'){
                return rule.message;
            }else{
                return 'Value should be minimum '+parseInt(rule.param)+' chars length';
            }
        }
        return '';
    };

    this.checkEmail = function(value, rule){
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if(!re.test(value)){
            if(typeof rule.message !== 'undefined'){
                return rule.message;
            }else{
                return 'Value should be email';
            }
        }
        return '';
    };

    this.checkList = function(value, rule){
        if(typeof rule.param === 'undefined'){
            return 'Validation rule error!';
        }
        if(rule.param.indexOf(value)=== -1){
            if(typeof rule.message !== 'undefined'){
                return rule.message;
            }else{
                return 'Value should be in array of elements: '+ rule.param.join(', ');
            }
        }
        return '';
    };

    this.checkMinValue = function(value, rule){
        if(typeof rule.param === 'undefined'){
            return 'Validation rule error!';
        }

        if(value < rule.param){
            if(typeof rule.message !== 'undefined'){
                return rule.message;
            }else{
                return 'Value should be bigger then '+ rule.param;
            }
        }

        return '';
    };

    this.checkMaxValue = function(value, rule){
        if(typeof rule.param === 'undefined'){
            return 'Validation rule error!';
        }

        if(value > rule.param){
            if(typeof rule.message !== 'undefined'){
                return rule.message;
            }else{
                return 'Value should be less then '+ rule.param;
            }
        }

        return '';
    };

    this.validateProcess = function (rules, object) {
        var errors = [];
        rules.forEach(function(rule){
            //value for testing
            var value = object[rule.fieldId];

            //check for is set
            if(typeof(value)==='undefined'){
                if(rule.rules.length>0){
                    errors.push({
                        field:rule.fieldId,
                        message:'Field '+rule.fieldId+' not defined'
                    });
                }
            }else{
                rule.rules.forEach(function(singlerule){
                    var validMessage = '';
                    switch (singlerule.method) {
                        case 'notEmpty':
                            validMessage = validator.checkEmpty(value, singlerule);
                            break;
                        case 'minLength':
                            validMessage = validator.checkMinLength(value, singlerule);
                            break;
                        case 'maxLength':
                            validMessage = validator.checkMaxLength(value, singlerule);
                            break;
                        case 'email':
                            validMessage = validator.checkEmail(value, singlerule);
                            break;
                        case 'list':
                            validMessage = validator.checkList(value, singlerule);
                            break;
                        case 'numberMin':
                            validMessage = validator.checkMinValue(value, singlerule);
                            break;
                        case 'numberMax':
                            validMessage = validator.checkMaxValue(value, singlerule);
                            break;
                        default:
                    }

                    if(validMessage !== ''){
                        errors.push({
                            field:rule.fieldId,
                            message:validMessage
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