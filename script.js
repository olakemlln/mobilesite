// Добавьте в начало script.js
if (!window.scrollTo) {
    window.scrollTo = function(x, y) {
        document.documentElement.scrollTop = y;
    };
}


document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.accordion')) {
        initAccordion();
    }
    initScrollToTop();
    if (typeof ymaps !== 'undefined') {
        initYandexMap();
    }
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    // Открытие/закрытие мобильного меню
    burgerBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        
        // Блокировка скролла при открытом меню
        if (mobileNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Закрытие меню при клике на ссылку
    const navLinks = mobileNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            burgerBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Закрытие меню при клике вне его области
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.header') && 
            !event.target.closest('.mobile-nav')) {
            mobileNav.classList.remove('active');
            burgerBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

let current = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 5000); // меняем слайд каждые 5 секунды


// Обработка нажатия на карточки (для мобильных)
document.querySelectorAll('.service-card').forEach(card => {
    // Добавляем визуальный feedback при нажатии
    card.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
    });
    
    card.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
        const title = this.querySelector('.card-title').textContent;
        console.log(`Выбрана услуга: ${title}`);
        // Здесь будет переход на страницу услуги
    });
    
    // Для десктопов
    card.addEventListener('click', function() {
        const title = this.querySelector('.card-title').textContent;
        console.log(`Выбрана услуга: ${title}`);
    });
});


// Плавный переход между страницами
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        const url = this.getAttribute('href');
        
        // Анимация нажатия
        this.style.transform = 'scale(0.98)';
        
        // Задержка для анимации
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    });
});


// Аккордеон для страницы правил
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}


// Плавная прокрутка наверх
function initScrollToTop() {
    const scrollButton = document.querySelector('.scroll-to-top');
    let lastScrollPosition = 0;
    
    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset;
        
        // Показываем только при прокрутке вниз ниже 300px
        if (currentScrollPosition > 300 && currentScrollPosition > lastScrollPosition) {
            scrollButton.classList.add('visible');
        } 
        // Скрываем при любой прокрутке вверх
        else if (currentScrollPosition < lastScrollPosition) {
            scrollButton.classList.remove('visible');
        }
        // Скрываем если в верхней части страницы
        else if (currentScrollPosition <= 300) {
            scrollButton.classList.remove('visible');
        }
        
        lastScrollPosition = currentScrollPosition;
    });

    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}




// Инициализация Яндекс.Карты
function initYandexMap() {
    if (document.getElementById('yandex-map')) {
        ymaps.ready(function() {
            const map = new ymaps.Map('yandex-map', {
                center: [53.684512, 23.839050], // Координаты ГрГУ
                zoom: 16,
                controls: ['zoomControl', 'typeSelector', 'fullscreenControl', 'trafficControl']
            }, {
                trafficControlSize: 'small'
            });
            
            // Добавляем метку
            const placemark = new ymaps.Placemark([53.684512, 23.839050], {
                hintContent: 'ГрГУ им. Янки Купалы',
                balloonContent: 'ул. Ожешко, 22'
            }, {
                preset: 'islands#redIcon' // Встроенные стили меток
            });
            
            map.geoObjects.add(placemark);
        });
    }
}


