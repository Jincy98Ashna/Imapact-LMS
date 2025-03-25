document.addEventListener('DOMContentLoaded', function() {
   
    const slideshow = document.querySelector('.slideshow');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;
    const slideTime = 8000; 
    
    function initSlideshow() {
        if (slides.length === 0) return;
        
        slides[currentSlide].classList.add('active');
        startSlideShow();
        
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        if (slideshow) {
            slideshow.addEventListener('mouseenter', pauseSlideShow);
            slideshow.addEventListener('mouseleave', startSlideShow);
        }
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        resetSlideShow();
    }
    
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, slideTime);
    }
    
    function pauseSlideShow() {
        clearInterval(slideInterval);
    }
    
    function resetSlideShow() {
        pauseSlideShow();
        startSlideShow();
    }
    
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(26, 26, 46, 0.9)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'transparent';
                header.style.boxShadow = 'none';
            }
        });
    }
    const announcements = [
        "New community features coming next week!",
        "Join our webinar on effective learning strategies - June 15th 2PM EST",
        "System upgrade scheduled for June 20th (2AM-4AM EST)",
        "New analytics dashboard launching next month!"
    ];

    const announcementContent = document.querySelector('.announcement-content p');
    const announcementIcon = document.querySelector('.announcement-icon');
    let currentAnnouncement = 0;

    function rotateAnnouncement() {
        if (!announcementContent) return;
        
        announcementContent.style.transition = 'opacity 0.3s ease';
        announcementContent.style.opacity = '0';
        
        setTimeout(() => {
            currentAnnouncement = (currentAnnouncement + 1) % announcements.length;
            announcementContent.textContent = announcements[currentAnnouncement];
            if (announcementIcon) {
                announcementIcon.style.animation = 'none';
                void announcementIcon.offsetWidth;
                announcementIcon.style.animation = 'ring 0.5s ease 2';
            }
            announcementContent.style.opacity = '1';
        }, 300);
    }

    if (announcementContent) {
        setInterval(rotateAnnouncement, 8000);
        
        if (announcementIcon) {
            announcementIcon.addEventListener('mouseenter', function() {
                this.style.animation = 'none';
                void this.offsetWidth; 
                this.style.animation = 'ring 0.5s ease 2';
            });
        }
    }
    const learningJourney = document.querySelector('.learning-journey');
    if (learningJourney) {
        learningJourney.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        learningJourney.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    }
    initSlideshow();
});