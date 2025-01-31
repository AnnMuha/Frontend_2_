class Tab {
    constructor(containerId) {
        // Знаходимо контейнер для вкладок
        this.container = document.getElementById(containerId);
        this.tabHeaders = document.createElement('div');
        this.tabHeaders.classList.add('tabs');
        this.container.appendChild(this.tabHeaders);
        this.contents = document.createElement('div');
        this.contents.classList.add('contents');
        this.container.appendChild(this.contents);

        // Масиви для збереження вкладок і їхнього вмісту
        this.tabs = [];
        this.contentsList = [];
    }

    // Метод для додавання вкладки
    addTab(title, content) {
        let tabIndex = this.tabs.length;
        // Створюємо заголовок вкладки
        let tab = document.createElement('div');
        tab.classList.add('tab');
        tab.textContent = title;
        // Додаємо обробник події для перемикання
        tab.addEventListener('click', this.switchTab.bind(this, tabIndex));
        this.tabHeaders.appendChild(tab);
        this.tabs.push(tab);
        // Створюємо блок вмісту вкладки
        let contentDiv = document.createElement('div');
        contentDiv.classList.add('content');
        contentDiv.innerHTML = content;
        this.contents.appendChild(contentDiv);
        this.contentsList.push(contentDiv);
        // Активуємо першу вкладку за замовчуванням
        if (this.tabs.length === 1) {
            this.activateTab(0);
        }
    }
    // Метод для перемикання між вкладками
    switchTab(index) {
        let self = this; // Зберігаємо контекст
        this.tabs.forEach(function (tab, i) {
            if (i === index) {
                tab.classList.add('active');
                self.contentsList[i].classList.add('active');
            } else {
                tab.classList.remove('active');
                self.contentsList[i].classList.remove('active');
            }
        });
    }
    // Метод для активації вкладки
    activateTab(index) {
        this.switchTab(index);
    }
}
// Використання класу
let tabComponent = new Tab('tab-container');
tabComponent.addTab('Home', '<p>Welcome to the Home tab!</p>');
tabComponent.addTab('Profile', '<p>This is your Profile.</p>');
tabComponent.addTab('Settings', '<p>Here you can change your settings.</p>');