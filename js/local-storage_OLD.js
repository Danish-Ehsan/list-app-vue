var mainListArray;

if (localStorage.mainListArrayTwo) {
	mainListArray = JSON.parse(localStorage.mainListArrayTwo);
	console.log('localStorage test1');
} else {
	console.log('localStorage test2');
	mainListArray = [
			{
				name: 'List One',
				items: [
					{ 
						content: 'item one',
						crossedOff: false
					},{ 
						content: 'item two',
						crossedOff: false
					},{ 
						content: 'item three',
						crossedOff: false
					}
				]
			},{
				name: 'List Two',
				items: [
					{ 
						content: 'item four',
						crossedOff: false
					},{ 
						content: 'item five',
						crossedOff: false
					},{ 
						content: 'item six',
						crossedOff: false
					}
				]
			},{
				name: 'List Three',
				items: [
					{ 
						content: 'item seven',
						crossedOff: false
					},{ 
						content: 'item eight',
						crossedOff: false
					},{ 
						content: 'item nine',
						crossedOff: false
					}
				]
			}
		]
}

window.addEventListener('beforeunload', function() {
	localStorage.setItem('mainListArrayTwo', JSON.stringify(mainListArray));
});