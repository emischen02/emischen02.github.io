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
});