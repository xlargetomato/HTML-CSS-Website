document.addEventListener('DOMContentLoaded', function() {
    const pageLinks = document.querySelectorAll('.nav-item');
    const pageSections = document.querySelectorAll('.page-section');
    const sliderDots = document.querySelectorAll('.dot');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const birthdayImage = document.querySelector('.birthday-image');
    const birthdayForm = document.querySelector('.birthday-form');
    const thankYouMessage = document.querySelector('.thank-you-message');
    const submitBirthdayWish = document.getElementById('submitBirthdayWish');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.slide').length;
    
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            pageLinks.forEach(item => item.classList.remove('active'));
            pageSections.forEach(section => section.classList.remove('active'));
            
            this.classList.add('active');
            
            const pageId = this.getAttribute('data-page');
            
            document.getElementById(pageId).classList.add('active');
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    if (birthdayImage && birthdayForm) {
        setTimeout(() => {
            birthdayImage.classList.add('hidden');
            birthdayForm.classList.remove('hidden');
        }, 5000);
    }
    
    if (submitBirthdayWish) {
        submitBirthdayWish.addEventListener('click', function() {
            birthdayForm.classList.add('hidden');
            thankYouMessage.classList.remove('hidden');
        });
    }
    
    function showSlide(n) {
        currentSlide = (n + totalSlides) % totalSlides;
        
        if (sliderWrapper) {
            sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        if (sliderDots) {
            sliderDots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentSlide);
            });
        }
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }
    
    if (sliderDots) {
        sliderDots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                showSlide(idx);
            });
        });
    }
    
    let slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
    
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        });
    }
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                alert(`Thank you, ${name}! Your message has been received.`);
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    const animateElements = () => {
        const elements = [
            document.querySelectorAll('.hobby-card'),
            document.querySelectorAll('.gallery-item'),
            document.querySelectorAll('.timeline-item')
        ];
        
        elements.forEach(elementGroup => {
            if (elementGroup.length) {
                elementGroup.forEach((el, idx) => {
                    setTimeout(() => {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(20px)';
                        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, 100);
                    }, idx * 150);
                });
            }
        });
    };
    
    pageLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(animateElements, 100);
        });
    });
    
    animateElements();
}); 