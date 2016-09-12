var application = new Vue({
	el: "#app",
	data:{
		newTabUrl: "chrome://newtab/",
		tab: null,
		rows: [],
		filterable: ""
	},
	methods: {
		getStoredLinks: function(){
			this.rows = [];
			var localStorage = window.localStorage;
			var length = localStorage.length;
			for (var i = 0; i < length; i++) {
				var key = localStorage.key(i);
				var data = JSON.parse(localStorage[key]);
			    this.rows.push({
			    	key: key, 
			    	title: data.title,
			    	url: data.url
			    });
			}
		},
		openLink: function(key){
			var data = JSON.parse(window.localStorage[key]);
			var url = data.url;
			if(!url){
				alert('Url seems like empty!');
				return;
			}
    		this.linkOpener(url);
			this.deleteLink(key);
		},
		isEmptyTab: function(){
			// get the current tab information
			var that = this;
			chrome.tabs.query({active: true}, function(tabs){
				that.tab = tabs[0];
			});
		},
		deleteLink: function(key){
			window.localStorage.removeItem(key);
			this.getStoredLinks();
		},
		linkOpener: function(link){
			if(this.tab.url == this.newTabUrl){
				chrome.tabs.update(this.tab.id, { url: link});
			} else{
				chrome.tabs.create({ url: link });
			}
		}
	},
	ready: function(){
		this.getStoredLinks();
		// is called here, cause the callback is promise needs time.
		this.isEmptyTab();
	}
});
// load on start up.