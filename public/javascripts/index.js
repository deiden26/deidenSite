function scrollTo(target, closeNav){
	//Scroll with animation
	$('html, body').animate({
		scrollTop: $(target).offset().top -40
	}, 500);
	//Close the nav bar menu
	if(closeNav)
		Foundation.libs.topbar.toggle();
}
function showExperienceContent(target){
	//Show or hide the content
	$("."+target+"-content").slideToggle(400);
	//Add or remove the down arrow
	$("#"+target+"-arrow").toggleClass("fa fa-angle-down fa-3x");
	//Add or remove the up arrow
	$("#"+target+"-arrow").toggleClass("fa fa-angle-up fa-3x");
}