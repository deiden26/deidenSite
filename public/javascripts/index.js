function scrollTo(target, closeNav){
	$('html, body').animate({
		scrollTop: $(target).offset().top
	}, 500);
	if(closeNav)
		Foundation.libs.topbar.toggle();
}