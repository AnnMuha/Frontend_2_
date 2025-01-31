class Slider {
    constructor(containerId, orientation = 'horizontal') {
        this.container = document.getElementById(containerId);
        this.slider = this.container.querySelector('.slider');
        this.slides = [];
        this.currentIndex = 0;
        this.orientation = orientation;

        this.initEvents();
        this.updateSlidePosition();
    }

    // додає новий слайд до слайдера
    addSlide(content) {
        const slide = document.createElement('div');
        slide.classList.add('slider-item');
        slide.innerHTML = content;
        this.slider.appendChild(slide);
        this.slides.push(slide);
        this.updateSlidePosition();
    }

    // переміщення до наступного слайда
    nextSlide() {
        if (this.currentIndex < this.slides.length - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        this.updateSlidePosition();
    }

    // Переміщення до попереднього слайда
    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.slides.length - 1;
        }
        this.updateSlidePosition();
    }

    // Оновлює позицію слайдів відповідно до поточного індексу
    updateSlidePosition() {
        const offset = this.orientation === 'horizontal'
            ? -this.currentIndex * 100
            : -this.currentIndex * 100;

        if (this.orientation === 'horizontal') {
            this.slider.style.transform = `translateX(${offset}%)`;
        } else {
            this.slider.style.flexDirection = 'column';
            this.slider.style.transform = `translateY(${offset}%)`;
        }
    }

    // Ініціалізація подій для кнопок
    initEvents() {
        const nextButton = this.container.querySelector('#next-slide');
        const prevButton = this.container.querySelector('#prev-slide');

        nextButton.addEventListener('click', () => this.nextSlide());
        prevButton.addEventListener('click', () => this.prevSlide());
    }
}

const slider = new Slider('slider-container', 'horizontal');
slider.addSlide('<div>Slide 1</div>');
slider.addSlide('<div>Slide 2</div>');
slider.addSlide('<div>Slide 3</div>');