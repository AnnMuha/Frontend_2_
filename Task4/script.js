class Form {
    constructor(containerId, fields, onSubmit) {
        this.container = document.getElementById(containerId);
        // Поля форми
        this.fields = fields;
        // Функція-обробник для відправки форми
        this.onSubmit = onSubmit;
        this.form = document.createElement('form');
        this.container.appendChild(this.form);
        this.renderFields();
        this.addSubmitButton();
    }
    // Метод для створення та відображення полів форми
    renderFields() {
        let self = this;
        this.fields.forEach(function (field) {
            let input = document.createElement('input');
            input.type = field.type || 'text'; // Тип поля (текст за замовчуванням)
            input.name = field.name; // Ім'я поля
            input.placeholder = field.placeholder || '';
            input.required = field.required || false;
            input.classList.add(field.name);
            // Додаємо поле до форми
            self.form.appendChild(input);
        });
    }
    // Метод для створення кнопки відправки форми
    addSubmitButton() {
        let button = document.createElement('button');
        button.type = 'button';
        button.textContent = 'Submit';
        this.form.appendChild(button);
        // Додаємо обробник події для натискання на кнопку
        button.addEventListener('click', this.handleSubmit.bind(this)); // Прив'язуємо контекст
    }
    // Метод для обробки відправки форми
    handleSubmit(event) {
        let self = this;
        let isValid = true; // Прапорець для перевірки валідності всіх полів
        let data = {}; // Об'єкт для збереження даних форми
        // Перевіряємо кожне поле на валідність
        this.fields.forEach(function (field) {
            let input = self.form.querySelector('.' + field.name);
            let errorMessageElement = input.nextElementSibling;
            // Якщо помилка вже існує, видаляємо її
            if (errorMessageElement && errorMessageElement.classList.contains('error-message')) {
                errorMessageElement.remove();
            }
            // Якщо поле не пройшло валідацію
            if (field.validation && !field.validation(input.value)) {
                isValid = false;
                input.classList.add('invalid');
                // Створюємо повідомлення про помилку
                let errorMessage = document.createElement('div');
                errorMessage.classList.add('error-message');
                errorMessage.textContent = field.errorMessage || 'Invalid input';
                input.after(errorMessage);
            } else {
                // Якщо поле валідне, прибираємо некоректний клас
                input.classList.remove('invalid');
                data[field.name] = input.value;
            }
        });
        if (isValid) {
            this.onSubmit(data);
            this.form.reset();
        }
    }
}

// Використання класу
let form = new Form('form-container', [
    {
        name: 'username',
        placeholder: 'Enter your username',
        required: true,
        validation: function (value) {
            return value.length >= 3; // Ім'я повинно бути щонайменше 3 символи
        },
        errorMessage: 'Username must be at least 3 characters long'
    },
    {
        name: 'email',
        placeholder: 'Enter your email',
        type: 'email',
        required: true,
        validation: function (value) {
            return /^\S+@\S+\.\S+$/.test(value); // Перевірка формату email
        },
        errorMessage: 'Invalid email address'
    },
    {
        name: 'password',
        placeholder: 'Enter your password',
        type: 'password',
        required: true,
        validation: function (value) {
            return (value.match(/1/g) || []).length >= 6; // Пароль повинен містити щонайменше 6 одиниць
        },
        errorMessage: 'Password must contain at least 6 ones (1)'
    }
], function (data) {
    console.log('Form submitted:', data); // Вивід даних у консоль
});