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

    validateField(field, input) {
        let validator = field.validator;
        let isValid = !validator || validator.validate(input.value);
        let errorMessageElement = input.nextElementSibling;
        if (errorMessageElement && errorMessageElement.classList.contains('error-message')) {
            errorMessageElement.remove();
        }
        input.classList.toggle('invalid', !isValid);
        if (!isValid) {
            this.showErrorMessage(input, field.errorMessage);
        }
        return isValid;
    }

    validateFields() {
        let isValid = true;
        this.fields.forEach(field => {
            let input = this.form.querySelector('.' + field.name);
            if (!this.validateField(field, input)) {
                isValid = false;
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
let form = new Form('form-container', [
    {
        name: 'username',
        placeholder: 'Enter your username',
        required: true,
        validator: new UsernameValidator(),
        errorMessage: 'Username must be at least 3 characters long'
    },
    {
        name: 'email',
        placeholder: 'Enter your email',
        type: 'email',
        required: true,
        validator: new EmailValidator(),
        errorMessage: 'Invalid email address'
    },
    {
        name: 'password',
        placeholder: 'Enter your password',
        type: 'password',
        required: true,
        validator: new PasswordValidator(),
        errorMessage: 'Password must contain at least 6 ones (1)'
    }
], function (data) {
    console.log('Form submitted:', data);
});
