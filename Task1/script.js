//об'єкт
class Modal {
    constructor() {
        this.modal = document.getElementById("modal");
        this.header = document.getElementById("modal-header");
        this.closeButton = document.getElementById("modal-close");
        this.content = document.getElementById("modal-content");

        // динамічний фон
        this.backdrop = document.createElement("div");
        this.backdrop.className = "modal-backdrop hidden";
        document.body.appendChild(this.backdrop);

        this.offsetX = 0;
        this.offsetY = 0;
        this.isDragging = false;

        this.initEvents();
    }

    open() {
        this.modal.classList.remove("hidden");
        this.backdrop.classList.remove("hidden");
    }

    close() {
        this.modal.classList.add("hidden");
        this.backdrop.classList.add("hidden");
    }

    setContent(content) {
        if (this.content) {
            this.content.innerHTML = content;
        } else {
            console.error("Modal content element not found.");
        }
    }

    initEvents() {
        this.closeButton.addEventListener("click", this.close.bind(this));
        this.backdrop.addEventListener("click", this.close.bind(this));
        this.header.addEventListener("mousedown", this.startDrag.bind(this));
        document.addEventListener("mousemove", this.onDrag.bind(this));
        document.addEventListener("mouseup", this.stopDrag.bind(this));
    }

    startDrag(event) {
        this.isDragging = true;
        this.offsetX = event.clientX - this.modal.offsetLeft;
        this.offsetY = event.clientY - this.modal.offsetTop;
    }

    onDrag(event) {
        if (this.isDragging) {
            this.modal.style.left = `${event.clientX - this.offsetX}px`;
            this.modal.style.top = `${event.clientY - this.offsetY}px`;
        }
    }

    stopDrag() {
        this.isDragging = false;
    }
}

const modal = new Modal();
document.getElementById("open-modal").addEventListener("click", () => {
    modal.setContent("<p>This is a dynamically added content</p>");
    modal.open();
});