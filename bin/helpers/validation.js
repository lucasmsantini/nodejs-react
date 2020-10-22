'user strict';

class ValidationContract{
    constructor(){
        this._errors = [];
    }
    isNotArrayOrEmpty(value, message){
        if(!value && value.length == 0){
            this._errors.push({message:message});
        }
    }
    isTrue(vale, message){
        if(value){
            this._errors.push({message:message});
        }
    }
    isRequired(vale, message){
        if(!value || value.length <= 0){
            this._errors.push({message:message});
        }
    }
    isEmail(vale, message){
        var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        if(!reg.test(value)){
            this._errors.push({message:message});
        }
    }
    errors(){
        return this._errors;
    }
    isValid(){
        return this._errors.length == 0;
    }
}

module.exports = ValidationContract;