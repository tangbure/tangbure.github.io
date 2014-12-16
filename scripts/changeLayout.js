//自适应窗口大小
function changeLayout() {
	var height = $(window).height();
	var width = $(window).width();
	$("section").each(function(index){
		$(this).height(height);
		$(this).width(width);
	});
}
jQuery(document).ready(changeLayout);
$(window).bind("resize",changeLayout);


