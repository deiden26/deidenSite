// Cached global variables for scroll-fading
var mobile = false;
var topImageText;
var topImageTextOpacity;

// Initializer for when the page finishes loading
document.addEventListener('DOMContentLoaded', function() {

    // Disable fading and parralax for mobile
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
        .test(navigator.userAgent)
    ) {
        mobile = true;
        var topImage = document.querySelector('.top-image');
        topImage.style.backgroundAttachment = 'scroll';
    } else {
        // Cache reference to top image text for fading
        topImageText = document.querySelector('#top-image-text');
        // initialize to proper fade
        fade();
    }
});

// Response to scrolling that causes top image text to fade
window.onscroll = fade;
function fade() {
    if (!mobile) {
        topImageTextOpacity = 1 - (2.5/window.innerHeight) * window.pageYOffset;
        window.requestAnimationFrame(fadeAnimate);
    }
};

// Fade animate function
function fadeAnimate() {
    topImageText.style.opacity = topImageTextOpacity;
};

// Top bar button scrolling response
// eslint-disable-next-line no-unused-vars
function scrollToSection(target, closeNav) {
    // Scroll with animation
    $('html, body').animate({
        scrollTop: $(target).offset().top -40,
    }, 500);
    // Close the nav bar menu
    if (closeNav) {
        Foundation.libs.topbar.toggle();
    }
}
