//Cached global variables for scroll-fading
var mobile = false;
var topImageText;
var topImageTextOpacity;
//Initializer for when the page finishes loading
document.addEventListener("DOMContentLoaded", function() {
	//Initialize carousel
	$('.project-carousel').slick({
		dots: true,
		appendDots: $(".dots-container"),
		onBeforeChange: hideExperienceContent
	});
	//Initialize cached variables for scroll-fading
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		mobile = true;
	}
	topImageText = document.querySelector("#top-image-text")
});
//Response to scrolling that causes top image text to fade
window.onscroll = function() {
	if(!mobile) {
		topImageTextOpacity = 1 - (2.5/window.innerHeight) * window.pageYOffset;
		window.requestAnimationFrame(fade);
	}
};
//Fade function
function fade() {
	topImageText.style.opacity = topImageTextOpacity;
};
//Top bar button scrolling response
function scrollTo(target, closeNav){
	//Scroll with animation
	$('html, body').animate({
		scrollTop: $(target).offset().top -40
	}, 500);
	//Close the nav bar menu
	if(closeNav)
		Foundation.libs.topbar.toggle();
}
//Hide the content of the "My contributions" div
function hideExperienceContent(){
	toggleExperienceContent(false);
}

//Toggle the content of the "My contributions" div
//showHide=true -> only show
//showHide=false -> only hide
//showHide=undefined -> toggle
function toggleExperienceContent(showHide){
	var contentLabels = ["divit", "shindg", "anser"];
	var index = $(".project-carousel").slickCurrentSlide();
	var target = contentLabels[index];
	var content = $("#"+target+"-content");
	var contentButtonText = $(".content-button-text");
	if (showHide === true && content.is(':visible'))
		return;
	else if (showHide === false && !content.is(':visible'))
		return;
	else {
		//Show or hide the content
		content.slideToggle(400);
		//Add or remove the down arrow
		$("#content-arrow").toggleClass("fa fa-angle-double-down fa-3x");
		//Add or remove the up arrow
		$("#content-arrow").toggleClass("fa fa-angle-double-up fa-3x");
		//Change test
		if(contentButtonText.text() === "Show My Contributions")
			contentButtonText.html("Hide My Contributions");
		else
			contentButtonText.html("Show My Contributions");

	}
}
