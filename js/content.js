var title = "";

// get the link name from the context menu click
// used delegate to retrive the values even after the dom loads
$(document).on("contextmenu", "a", function(){ 
	title = $(this).text().trim();
});

// broadcasted messages listener
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// check the message
	if(request.message === "linqueue_get_anchor_title"){
		// return response
		var response = {'title': title};
		sendResponse(response);
	}
});