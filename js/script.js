document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');
    
    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('nav-link')) {
                burger.classList.remove('active');
                nav.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Text rotation in hero section
    const textRotate = document.querySelector('.text-rotate');
    if (textRotate) {
        const words = JSON.parse(textRotate.getAttribute('data-rotate'));
        let currentWord = 0;
        
        function rotateText() {
            textRotate.style.opacity = '0';
            
            setTimeout(() => {
                currentWord = (currentWord + 1) % words.length;
                textRotate.textContent = words[currentWord];
                textRotate.style.opacity = '1';
            }, 500);
        }
        
        setInterval(rotateText, 3000);
    }
    
    // Animate numbers counting
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateNumbers() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    stat.textContent = target + '+';
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 16);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('step')) {
                    entry.target.classList.add('active');
                }
                
                if (entry.target.classList.contains('mosaic-item')) {
                    entry.target.classList.add('active');
                }
                
                if (entry.target.classList.contains('stat-number') && !entry.target.hasAttribute('data-animated')) {
                    entry.target.setAttribute('data-animated', 'true');
                    animateNumbers();
                }
                
                if (entry.target.classList.contains('fade-in-up')) {
                    entry.target.style.animationPlayState = 'running';
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.step, .mosaic-item, .stat-number, .fade-in-up').forEach(el => {
        observer.observe(el);
    });
    
    // Case studies slider
    const caseSlides = document.querySelectorAll('.case-slide');
    const caseDotsContainer = document.querySelector('.case-dots');
    const prevBtn = document.querySelector('.case-prev');
    const nextBtn = document.querySelector('.case-next');
    let currentSlide = 0;
    
    // Create dots
    caseSlides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('case-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        caseDotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.case-dot');
    
    function updateSlider() {
        caseSlides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % caseSlides.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + caseSlides.length) % caseSlides.length;
        updateSlider();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-rotate slides
    let slideInterval = setInterval(nextSlide, 5000);
    
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    nextBtn.addEventListener('click', resetInterval);
    prevBtn.addEventListener('click', resetInterval);
    dots.forEach(dot => dot.addEventListener('click', resetInterval));
    
    // Cursor follower
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursorFollower.style.left = `${e.clientX}px`;
            cursorFollower.style.top = `${e.clientY}px`;
        });
        
        // Change cursor size on hover interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .case-dot, input, textarea');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
                cursorFollower.style.opacity = '0.5';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.opacity = '1';
            });
        });
    }
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'white';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.padding = '15px 0';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.boxShadow = 'none';
            header.style.padding = '20px 0';
        }
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show an alert
            alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }
    
    // Initialize animations for elements already in view
    document.querySelectorAll('.step, .mosaic-item').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            el.classList.add('active');
        }
    });
});