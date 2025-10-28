document.addEventListener('DOMContentLoaded', () => {
    // Create Lightbox Overlay if it doesn't exist
    let lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        document.body.appendChild(lightbox);
    }

    // Select all images inside the project section
    const images = document.querySelectorAll('.project-item img');

    images.forEach(image => {
        image.addEventListener('click', e => {
            e.preventDefault(); // Prevent default action (if inside a link)
            e.stopPropagation(); // Stops event bubbling

            // Add lightbox overlay
            lightbox.classList.add('active');

            // If there's already an img element, update its src; otherwise create one
            let img = lightbox.querySelector('img');
            if (!img) {
                img = document.createElement('img');
                lightbox.appendChild(img);
            }
            img.src = image.src;
        });

        // Support touch events on mobile
        image.addEventListener('touchend', e => {
            e.preventDefault();
            image.click();
        }, {passive: false});
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', e => {
        if (e.target !== e.currentTarget) return;
        lightbox.classList.remove('active');
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            lightbox.classList.remove('active');
        }
    });

    // Cool Interactive Effects
    initCoolEffects();
});

function initCoolEffects() {
    // Parallax effect for background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.resume');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.backgroundPosition = `center ${speed}px`;
        }
    });

    // Floating animation for project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
        // Add random floating animation
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2;
        
        item.style.animationDelay = `${randomDelay}s`;
        item.style.animationDuration = `${randomDuration}s`;
        
        // Add mouse follow effect
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Typing effect for headers
    const headers = document.querySelectorAll('h1, h2');
    headers.forEach(header => {
        const text = header.textContent;
        header.textContent = '';
        header.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                header.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 500);
    });

    // Glowing effect for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.animation = 'glow 1s ease-in-out infinite alternate';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.animation = '';
        });
    });

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all project items
    projectItems.forEach(item => {
        observer.observe(item);
    });

    // Add particle effect to background
    createParticles();
}

function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '1';
    document.body.appendChild(particleContainer);

    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(60, 132, 83, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particleContainer.appendChild(particle);
    }
}

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});