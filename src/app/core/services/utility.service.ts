import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    formValidation(data: any, manitoryFields: any) {
        let fields = Object.keys(data);
        let validObj: any = {
            isValid: true,
            message: {}
        }
        for (let key of manitoryFields) {
            if (!fields.includes(key) || fields.includes(key) && (data[key] == '')) {
                validObj['isValid'] = false;
                validObj['message'][key] = this.splitAndJoin(key) + ' is required';
            } else if (key === 'email' && !this.isValidEmail(data['email'])) {
                validObj['isValid'] = false;
                validObj['message']['email'] = 'Email is invalid';
            } else if (key == 'password' && data['password'].length <= 3) {
                validObj['isValid'] = false;
                validObj['message']['password'] = "Value must not be greater than 3"
            }
        }
        return validObj;
    }
    splitAndJoin(str: any) {
        if (this.containsUpperCase(str)) {
            let words = str.split(/(?=[A-Z])/);
            let modifiedWords = words.map((word: any) => word.charAt(0).toLowerCase() + word.slice(1));
            let finalWord = modifiedWords.join(' ');
            return finalWord.charAt(0).toUpperCase() + finalWord.slice(1);
        } else {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }
    containsUpperCase(str: any) {
        return /[A-Z]/.test(str);
    }
    isValidEmail(value: any) {
        const emailReg = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g
        return emailReg.test(value);
    }
}