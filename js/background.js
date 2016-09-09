// callback to be called on click performed.
function saveLink(info, tab){
	// broadcast a message to the current tab
	chrome.tabs.query({active: true}, function(tabs) {
		// set message object to pass
	    var message = { "message": "linqueue_get_anchor_title" };
	    var key = getCurrentTime();
	    var value = {};
	    // send broadcast
	    chrome.tabs.sendMessage(tabs[0].id, message, function(response){
	    	// get the title from the response
	    	var title = response && response.title;
	    	// check if the title is present
	    	if(!title){
	    		title = tabs[0].title;;
	    	}
	    	// get the url
	    	var url = info.linkUrl;
	    	// set the title to value
	    	value.title = title;
	    	// set the url to value
	    	value.url = url;
	    	// save the url and title
	    	saveData(key, value)
	    });
	});
};

// save the data to local storage
function saveData(key, value){
	window.localStorage[key] = JSON.stringify(value);
}

// get the current time using moment.js
function getCurrentTime(){
	return moment().format('MM-DD-YY hh:mm:ss');
}

// add to context menu.
chrome.contextMenus.create({
    title: "Add to linqueue", // context menu title
    contexts:["link"],  // ContextType
    onclick: saveLink // A callback function
});