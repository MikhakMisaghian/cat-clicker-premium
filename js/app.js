// ==============  Model
var model = {
	currentCat: null,
	cats: [
		{
			name: 'Cute Happy Cat',
			imgSrc: 'img/cuteCatSmile.jpeg',
			clickCount: 0
		},
		{
			name: 'Dreamer Cat',
			imgSrc: 'img/dreamerCat.jpg',
			clickCount: 0
		},
		{
			name: 'Sleeping Cute Cat',
			imgSrc: 'img/sleepingCuteCat.jpg',
			clickCount: 0
		},
		{
			name: 'Super Cute Cat',
			imgSrc: 'img/superCuteCat.jpg',
			clickCount: 0
		}
	]
};

// ============== View
var catListView = {
	init: function() {
		// store the DOM element for easy access later
		this.catListElem = document.getElementById('cat-list');

		// render this view, update the DOM elements with the right values
		this.render();
	},

	render: function() {
		var cat, elem, i;
		// getting all the cats
		var cats = octopus.getCats();

		// empty the cat list
		this.catListElem.innerHTML = "";

		// loop over the cats
		for (i=0; i < cats.length; i++) {
			cat = cats[i];

			// make a new cat list item and set its text
			elem = document.createElement('li');
			elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
			elem.addEventListener('click', (function(catCopy) {
				return function() {
					octopus.setCurrentCat(catCopy);
					selectedCatView.render();
				};
			})(cat));

			// add the element to the list
			this.catListElem.appendChild(elem);
		}
	}
};

var selectedCatView = {
	init: function() {
		this.catElem = document.getElementById('cat');
		this.catNameElem = document.getElementById('cat-name');
		this.catImgElem = document.getElementById('cat-img');
		this.clickCountElem = document.getElementById('cat-click-count');

		// on click on the current cat, increment the current cat's click counter
		this.catImgElem.addEventListener('click', function() {
			octopus.incrementCatClickCounter();
		});

		// render this view
		this.render();
	},

	render: function() {
		// update the DOM elements with values from the current cat
		var currentCat = octopus.getCurrentCat();
		this.clickCountElem. textContent = currentCat.clickCount;
		this.catNameElem.textContent = currentCat.name;
		this.catImgElem.src = currentCat.imgSrc;
	}
};

// ============== Octopus
var octopus = {
	init: function() {
		// Initialize the current cat to the first cat in the data
		model.currentCat = model.cats[0];

		// initialize the views
		catListView.init();
		selectedCatView.init();
	},

	// gets the current cat from data
	getCurrentCat: function() {
		return model.currentCat;
	},

	// sets the current cat to be the object passed in
	setCurrentCat: function(cat) {
		model.currentCat = cat;
	},

	// gets all the cat sfrom data
	getCats: function() {
		return model.cats;
	},

	// increments the number of times selected cat is being clicked
	incrementCatClickCounter: function() {
		model.currentCat.clickCount++;
		selectedCatView.render();
	}
};


octopus.init();

