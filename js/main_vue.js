
var vm = new Vue({
	el: '#vueApp',
	data: data,
	methods: {
		showIndvList: function(index) {
			this.currentIndex = index;
			this.showMainList = false;
			this.deleteMode = false;
			this.undoMode = false;
			this.$nextTick(function () {
				const listItems = document.getElementsByClassName('list-item');
				for (const item of listItems) {
					this.calcTextArea(item);
				}
			});
		},
		addList: function() {
			if (this.showMainList) {
				this.lists.push({ name: '', timestamp: this.getTimestamp(), items: [{ content: '', crossedOff: false, timestamp: this.getTimestamp() }] });
				this.currentIndex = this.lists.length - 1;
				this.showMainList = false;
				//offset by the length of css animation +50ms
				//setTimeout(() => {
					this.$nextTick(function () { 
						this.$refs.newTitle.focus();
					});
				//}, 550);
			} else {
				this.lists[this.currentIndex].items.push({ content: '', crossedOff: false, timestamp: this.getTimestamp() });
				//focus on the new list item by selecting the last list item which isn't crossed off
				this.$nextTick(function () {
					this.focusOnItem();
				});
			}
		},
		deleteList: function(index) {
			console.log('delete test');
			if (this.showMainList) {
				this.lastDeleted = this.lists.splice(index, 1);
				this.deleteMode = false;
				this.undoMode = true;
				setTimeout( () => {
					//arrow function used for proper 'this' reference
					this.undoMode = false;
					console.log('undo test');
				}, 3000);
			} else {
				this.lastDeleted = this.lists[this.currentIndex].items.splice(index, 1);
				this.deleteMode = false;
				this.undoMode = true;
				setTimeout( () => {
					//arrow function used for proper 'this' reference
					this.undoMode = false;
					console.log('undo test');
				}, 2500);
			}
		},
		checkClass: function(item) {
			return !item.classList.contains('crossed-off');
		},
		focusOnItem: function() {
			var listItems = document.getElementsByClassName('list-input');
			listItems = Array.from(listItems);
			var filteredList = listItems.filter(this.checkClass);
			filteredList[filteredList.length - 1].focus();
		},
		listFunction: function(index) {
			if (!this.deleteMode && this.showMainList) {
				this.showIndvList(index);
			} else if (this.deleteMode) {
				this.deleteList(index);
			}
		},
		undoDelete: function() {
			if (this.showMainList) {
				this.lists.push(this.lastDeleted[0]);
				this.undoMode = false;
				this.lastDeleted = null;
			} else {
				this.lists[this.currentIndex].items.push(this.lastDeleted[0]);
				this.undoMode = false;
				this.lastDeleted = null;
			}
		},
		onKeydown: function (e, index) {
			var target = e.target;
			var key = e.which;
			if (key == 13) { //if key is ENTER
				e.preventDefault();
				this.addList();
			} else if (key == 8 && !this.lists[this.currentIndex].items[index].content.length) { //if key is BACKSPACE
				console.log('BACKSPACE test');
				e.preventDefault();
				this.lists[this.currentIndex].items.splice(this.lists[this.currentIndex].items.length - 1, 1);
				this.$nextTick(function () {
					this.focusOnItem();
				});
			}
		},
		calcTextArea: function (target) {
			target.rows = 1;
			console.log('scrollHeight: ' + target.scrollHeight);
			console.log('offsetHeight: ' + target.offsetHeight);
			while ((target.scrollHeight - 3) > target.offsetHeight) {
				var rows = target.rows;
				target.rows = rows + 1;
			}
		},
		getTimestamp: function() {
			return Date.now();
		},
		sortList: function(sortType) {
			if (this.showMainList) {
				if (sortType == 'name') {
					this.lists.sort(function(a, b) {
						if (a.name > b.name) {
							return 1;
						} else if (a.name < b.name) {
							return -1;
						} else {
							return 0;
						}
					});
				} else if (sortType == 'date') {
					this.lists.sort(function(a, b) {
						if (a.timestamp < b.timestamp) {
							return -1;
						} else if (a.timestamp > b.timestamp) {
							return 1;
						} else {
							return 0;
						}
					});
				}
			} else {
				if (sortType == 'name') {
					this.lists[this.currentIndex].items.sort(function(a, b) {
						if (a.content > b.content) {
							return 1;
						} else if (a.content < b.content) {
							return -1;
						} else {
							return 0;
						}
					});
				} else if (sortType == 'date') {
					this.lists[this.currentIndex].items.sort(function(a, b) {
						if (a.timestamp < b.timestamp) {
							return -1;
						} else if (a.timestamp > b.timestamp) {
							return 1;
						} else {
							return 0;
						}
					});
				}
			}
		},
		setFontSize: function(size) {
			switch(size) {
				case 'small':
					if (!this.settings.nightMode) {
						document.body.className = 'smallFont';
					} else {
						document.body.className = 'smallFont nightmode';
					}
					this.settings.fontSize = 'small';
					break;
				case 'medium':
					if(!this.settings.nightMode) {
						document.body.classList.remove('smallFont', 'largeFont');
						console.log('medium test');
					} else {
						document.body.className = 'nightmode';
					}
					this.settings.fontSize = 'medium';
					break;
				case 'large':
					if (!this.settings.nightMode) {
						document.body.className = 'largeFont';
					} else {
						document.body.className = 'largeFont nightmode';
					}
					this.settings.fontSize = 'large';
					break;
			}
		},
		toggleNightMode: function(toggle) {
			if (toggle == 'on') {
				this.settings.nightMode = true;
				document.body.classList.add('nightmode');
			} else if (toggle == 'off') {
				this.settings.nightMode = false;
				document.body.classList.remove('nightmode');
			}
		}
	},
	computed: {
		
	}
});

//if nightMode is active when app starts add nightmode class to body
if (vm.settings.nightMode) vm.toggleNightMode('on');
//set fontSize if not default value
if (vm.settings.fontSize != 'medium') vm.setFontSize(vm.settings.fontSize);
