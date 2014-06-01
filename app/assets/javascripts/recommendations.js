// On document ready...
$(document).ready(function() {
	// On clicking any input-group, we should toggle the inner checkbox/radio button
	$(".input-group").click(function(e) {
		// Make sure we don't send a double click event to the checkbox if we click directly on it.
		if (e.target.className !== "flight-checkbox") {
			var targetElement = $(this).find("input:checkbox, input:radio:not(:checked)");
			targetElement.prop("checked", !targetElement.prop("checked"));
		}
	});
});
