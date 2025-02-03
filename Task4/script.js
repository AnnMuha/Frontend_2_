// Створюємо класи для валідації
class Validator {
    validate(value) {
        throw new Error("validate() must be implemented.");
    }
}

class UsernameValidator extends Validator {
    validate(value) {
        return value.length >= 3;
    }
}

class EmailValidator extends Validator {
    validate(value) {
        return /^\S+@\S+\.\S+$/.test(value);
    }
}

class PasswordValidator extends Validator {
    validate(value) {
        return (value.match(/1/g) || []).length >= 6;
    }
}

// Клас для обробки форми
class Form {
    constructor(containerId, fields, onSubmit) {
        this.container = document.getElementById(containerId);
        this.fields = fields;
        this.onSubmit = onSubmit;
        this.form = document.createElement('form');
        this.container.appendChild(this.form);
        this.renderFields();
        this.addSubmitButton();
    }

    renderFields() {
        this.fields.forEach((field) => {
            let input = document.createElement('input');
            input.type = field.type || 'text';
            input.name = field.name;
            input.placeholder = field.placeholder || '';
            input.required = field.required || false;
            input.classList.add(field.name);
            this.form.appendChild(input);
        });
    }

    addSubmitButton() {
        let button = document.createElement('button');
        button.type = 'button';
        button.textContent = 'Submit';
        this.form.appendChild(button);
        button.addEventListener('click', this.handleSubmit.bind(this));
    }

    handleSubmit(event) {
        let isValid = this.validateFields();
        if (isValid) {
            this.onSubmit(this.collectFormData());
            this.form.reset();
        }
    }

    validateFields() {
        let isValid = true;
        this.fields.forEach((field) => {
            let input = this.form.querySelector('.' + field.name);
            let validator = field.validator;
            let errorMessageElement = input.nextElementSibling;
            if (errorMessageElement && errorMessageElement.classList.contains('error-message')) {
                errorMessageElement.remove();
            }
            if (validator && !validator.validate(input.value)) {
                isValid = false;
                input.classList.add('invalid');
                this.showErrorMessage(input, field.errorMessage);
            } else {
                input.classList.remove('invalid');
            }
        });
        return isValid;
    }

    collectFormData() {
        let data = {};
        this.fields.forEach((field) => {
            let input = this.form.querySelector('.' + field.name);
            data[field.name] = input.value;
        });
        return data;
    }

    showErrorMessage(input, errorMessage) {
        let error = document.createElement('div');
        error.classList.add('error-message');
        error.textContent = errorMessage || 'Invalid input';
        input.after(error);
    }
}

// Використання класу
class FieldConfig {
    constructor(name, placeholder, type = 'text', validator = null, required = true, errorMessage = 'Invalid input') {
        this.name = name;
        this.placeholder = placeholder;
        this.type = type;
        this.validator = validator;
        this.required = required;
        this.errorMessage = errorMessage;
    }
}

let form = new Form('form-container', [
    new FieldConfig('username', 'Enter your username', 'text', new UsernameValidator(), true, 'Username must be at least 3 characters long'),
    new FieldConfig('email', 'Enter your email', 'email', new EmailValidator(), true, 'Invalid email address'),
    new FieldConfig('password', 'Enter your password', 'password', new PasswordValidator(), true, 'Password must contain at least 6 ones (1)')
], function (data) {
    console.log('Form submitted:', data);
});