//конструктор
class Table {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.table = document.createElement('table');
        this.container.appendChild(this.table);
    }

    // Метод для додавання заголовків стовпців
    setHeaders(headers) {
        const thead = this.table.createTHead();
        const row = thead.insertRow();
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            row.appendChild(th);
        });
    }

    // Метод для додавання рядка до таблиці
    addRow(data) {
        const row = this.table.insertRow();
        data.forEach(cellData => {
            const cell = row.insertCell();
            cell.textContent = cellData;
        });
    }

    // Метод для додавання стовпця до існуючих рядків
    addColumn(defaultValue = '') {
        const rows = this.table.rows;
        Array.from(rows).forEach((row, index) => {
            const cell = row.insertCell();
            cell.textContent = index === 0 ? "New Column" : defaultValue;
        });
    }
}

// Використання класу
const table = new Table('table-container');

// Додаємо заголовки стовпців
table.setHeaders(['Name', 'Age', 'Country']);

// Додаємо кілька рядків
table.addRow(['Alice', 25, 'USA']);
table.addRow(['Bob', 30, 'Canada']);
table.addRow(['Charlie', 35, 'UK']);

// Додаємо новий стовпець за замовчуванням значенням
table.addColumn('N/A');