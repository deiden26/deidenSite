document.addEventListener("DOMContentLoaded", function() {
	$('.project-carousel').slick({
		dots: true,
		appendDots: $(".dots-container"),
		onBeforeChange: hideExperienceContent
	});
});
window.onscroll = function() {
	if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		var alphaRaw = 1 - (2.5/window.innerHeight) * window.pageYOffset;
		var alpha = Math.max(0, alphaRaw);
		$(".top-image-text").css('opacity', alpha);
	}
};
function scrollTo(target, closeNav){
	//Scroll with animation
	$('html, body').animate({
		scrollTop: $(target).offset().top -40
	}, 500);
	//Close the nav bar menu
	if(closeNav)
		Foundation.libs.topbar.toggle();
}

function hideExperienceContent(){
	toggleExperienceContent(false);
}

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
