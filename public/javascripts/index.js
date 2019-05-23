// Cached global variables for scroll-fading
var mobile = false;
var topImageText;
var topImageTextOpacity;

// Global variable for carousel content labels
var contentLabels = ['anser', 'divit', 'shindg'];

// Initializer for when the page finishes loading
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    $('.project-carousel').slick({
        dots: true,
        appendDots: $('.dots-container'),
        onBeforeChange: beforeSlideChange,
    });

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

function beforeSlideChange(slick, currentSlide, nextSlide) {
    var currentSlideLabel = contentLabels[currentSlide];
    var nextSlideLabel = contentLabels[nextSlide];
    ga(
        'send',
        'event',
        'Project Carousel - ' + currentSlideLabel,
        'click',
        'To - '+ nextSlideLabel
    );
    // Hide the content of the "My contributions" div
    toggleExperienceContent(false);
}

// Toggle the content of the "My contributions" div
// showHide=true -> only show
// showHide=false -> only hide
// showHide=undefined -> toggle
function toggleExperienceContent(showHide) {
    var index = $('.project-carousel').slickCurrentSlide();
    var target = contentLabels[index];
    var content = $('#' + target + '-content');
    var contentButtonText = $('.content-button-text');
    if ((showHide === true && content.is(':visible')) ||
        (showHide === false && !content.is(':visible'))
    ) {
        return;
    }

    // Show or hide the content
    content.slideToggle(400);
    // Add or remove the down arrow
    $('#content-arrow').toggleClass('fa fa-angle-double-down fa-3x');
    // Add or remove the up arrow
    $('#content-arrow').toggleClass('fa fa-angle-double-up fa-3x');
    // Change test
    if (contentButtonText.text() === 'Show My Contributions') {
        contentButtonText.html('Hide My Contributions');
        ga(
            'send',
            'event',
            'Project Contributions - ' + taget,
            'click',
            'Show'
        );
    } else {
        contentButtonText.html('Show My Contributions');
        ga(
            'send',
            'event',
            'Project Contributions - ' + target,
            'click',
            'Hide'
        );
    }
}
