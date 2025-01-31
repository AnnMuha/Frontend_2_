class Notification {
    constructor(containerId) {
        // Ініціалізація контейнера для сповіщень
        this.container = document.getElementById(containerId);
    }

    // Метод для створення сповіщення
    createNotification(message, type = 'info') {
        // Створення контейнера для сповіщення
        let notification = document.createElement('div');
        notification.classList.add('notification', type);

        // Створення кнопки закриття
        let closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.classList.add('close-btn');
        closeButton.addEventListener('click', this.closeNotification.bind(this, notification));

        // Додавання кнопки та тексту до сповіщення
        notification.appendChild(closeButton);
        let messageSpan = document.createElement('span');
        messageSpan.textContent = message;
        notification.appendChild(messageSpan);

        // Додавання сповіщення в контейнер
        this.container.appendChild(notification);

        setTimeout(() => {
            this.closeNotification(notification);
        }, 5000);
    }

    // Метод для закриття сповіщення
    closeNotification(notification) {
        notification.classList.add('hidden');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 500);
    }
}

// Ініціалізація менеджера сповіщень
let notificationManager = new Notification('notifications-container');

// Функція для створення сповіщень
function showNotification() {
    notificationManager.createNotification('This is an info message.', 'info');
    notificationManager.createNotification('This is a success message!', 'success');
    notificationManager.createNotification('Warning! Something went wrong.', 'warning');
    notificationManager.createNotification('Error! Something failed.', 'error');
}