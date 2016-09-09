var application = new Vue({
	el: "#app",
	data:{
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
		deleteLink: function(key){
			window.localStorage.removeItem(key);
			this.getStoredLinks();
		},
		linkOpener: function(link){
			chrome.tabs.create({ url: link });
		}
	},
	ready: function(){
		this.getStoredLinks();
	}
});
// load on start up.