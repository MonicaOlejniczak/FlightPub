// On document ready...
$(document).ready(function() {
	// On clicking any input-group, we should toggle the inner checkbox/radio button
	$(".input-group").click(function() {
		var targetElement = $(this).find("input:checkbox, input:radio:not(:checked)");
		targetElement.prop("checked", !targetElement.prop("checked"));
	});
});
