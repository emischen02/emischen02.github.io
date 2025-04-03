// Create Lightbox Overlay
const lightbox = document.createElement("div");
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

// Select all images inside the project section
const images = document.querySelectorAll('.project-item img');

images.forEach(image => {
    image.addEventListener('click', e => {
        e.preventDefault(); // Prevent default action (if inside a link)
        e.stopPropagation(); // Stops event bubbling

        // Add lightbox overlay
        lightbox.classList.add('active');
        
        // Create new image element for the lightbox
        const img = document.createElement('img');
        img.src = image.src;
        
        // Remove any existing images inside lightbox before adding new one
        while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild);
        }

        lightbox.appendChild(img);
    });
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', e => {
    if (e.target !== e.currentTarget) return;
    lightbox.classList.remove('active');
});