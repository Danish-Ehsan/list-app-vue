//var mainListArray;

//localStorage.removeItem('mainListArrayTwo');


/*
if (localStorage.mainListArrayTwo) {
	mainListArray = JSON.parse(localStorage.mainListArrayTwo);
	console.log('localStorage test1');
} else {
	console.log('localStorage test2');
	mainListArray = [];
}

window.addEventListener('beforeunload', function() {
	localStorage.setItem('mainListArrayTwo', JSON.stringify(mainListArray));
});
*/

var data;

if (localStorage.listAppData) {
	data = JSON.parse(localStorage.listAppData);
	console.log('localStorage test1');
} else {
	console.log('localStorage test2');
	data = {
		lists: [],
		showMainList: true,
		currentIndex: 0,
		showScroll: false,
		deleteMode: false,
		undoMode: false,
		lastDeleted: null,
		settings: {
			settingsMode: false,
			showAboutPanel: false,
			sort: false,
			fontSizeSetting: false,
			fontSize: 'medium',
			nightModeSetting: false,
			nightMode: false
		}
	};
}

window.addEventListener('beforeunload', function() {
	localStorage.setItem('listAppData', JSON.stringify(data));
});