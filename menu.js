const menuElement = document.getElementById('menu');

fetch('menu.json')
	.then((response) => response.json())
	.then((data) => {
		for (const category in data.menu) {
			if (data.menu.hasOwnProperty(category)) {
				const parentElement = document.createElement('div');
				parentElement.id = category;

				parentElement.classList.add('menu-category');
				parentElement.classList.add('fade-in');

				const heading = document.createElement('h2');
				heading.textContent = category
					.split('-')
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' ');

				parentElement.appendChild(heading);

				if (category === 'specialty-pizza') {
					const fakeRow = document.createElement('div');
					fakeRow.classList.add('food-row');
					fakeRow.classList.add('fake-row');

					const fakeItem = document.createElement('div');
					fakeRow.appendChild(fakeItem);

					const fakeDivider = document.createElement('div');
					fakeRow.appendChild(fakeDivider);

					const largeMed = document.createElement('div');
					largeMed.classList.add('price-wrapper-specialty');

					const largeTitle = document.createElement('p');
					largeTitle.textContent = 'Large';
					largeTitle.classList.add('small-text');
					largeMed.appendChild(largeTitle);

					const medTitle = document.createElement('p');
					medTitle.textContent = 'Med';
					medTitle.classList.add('small-text');
					largeMed.appendChild(medTitle);

					fakeRow.appendChild(largeMed);

					parentElement.appendChild(fakeRow);
				}

				data.menu[category].forEach((menuItem) => {
					const foodRow = document.createElement('div');
					foodRow.classList.add('food-row');

					const foodItem = document.createElement('p');
					foodItem.classList.add('food-item');
					foodItem.textContent = menuItem.item;
					foodRow.appendChild(foodItem);

					const divider = document.createElement('div');
					divider.classList.add('menu-divider');
					foodRow.appendChild(divider);

					let itemPrice = document.createElement('p');

					if (category === 'specialty-pizza') {
						itemPrice = document.createElement('div');
						itemPrice.classList.add('price-wrapper-specialty');

						const largePrice = document.createElement('p');
						largePrice.textContent = `$${menuItem['priceLg'].toFixed(2)}`;
						itemPrice.appendChild(largePrice);

						const medPrice = document.createElement('p');
						medPrice.textContent = `$${menuItem['priceMed'].toFixed(2)}`;
						itemPrice.appendChild(medPrice);
					} else {
						itemPrice.textContent = '$' + menuItem.price.toFixed(2);
					}

					foodRow.appendChild(itemPrice);

					if (menuItem.hasOwnProperty('description')) {
						foodRow.classList.add('food-row-description');

						const descriptionElement = document.createElement('span');
						descriptionElement.textContent = menuItem.description;
						descriptionElement.classList.add('menu-description');

						foodRow.appendChild(descriptionElement);
					}

					parentElement.appendChild(foodRow);
				});
				if (category === 'gourmet-pizza') {
					parentElement.insertBefore(displayToppings(), parentElement.children[4]);
				}

				if (category === 'pasta') {
					parentElement.insertBefore(displayPasta(), parentElement.children[1]);
				}

				const servedWith = displayServedWith(category);
				if (servedWith) {
					parentElement.insertBefore(servedWith, parentElement.children[1]);
				}

				menuElement.appendChild(parentElement);
			}
		}
	})
	.then(() => {
		setTimeout(() => {
			fadeIn();
			underlineNavLinks();
		}, 50);
	});

function fadeIn() {
	document.querySelectorAll('.fade-in').forEach((element) => {
		element.classList.add('show');
	});
}

function underlineNavLinks() {
	const categories = document.querySelectorAll('.menu-category');
	const navLinks = document.querySelectorAll('.menu-nav-link');

	window.addEventListener('scroll', () => {
		const scrollPosition = window.scrollY + 130;

		categories.forEach((category) => {
			const categoryTop = category.offsetTop;
			const categoryBottom = categoryTop + category.clientHeight;

			if (categoryTop < scrollPosition && categoryBottom > scrollPosition) {
				navLinks.forEach((link) => link.classList.remove('active'));
				document.getElementById(`nav-${category.id}`).classList.add('active');
			}
		});
	});
}

function displayToppings() {
	const toppings = {
		price: '+$3.00',
		items: [
			'Extra Cheese',
			'Eggplant',
			'Peppers',
			'Meatballs',
			'Anchovies',
			'Mushrooms',
			'Pepperoni',
			'Black Olives',
			'Broccoli',
			'Sun Dried Tomato',
			'Bacon',
			'Fresh Tomatoes',
			'Sausage',
			'Ricotta',
			'Pineapple',
		],
	};

	const toppingsContainer = document.createElement('div');
	toppingsContainer.classList.add('toppings-container');

	const toppingsTitle = document.createElement('p');
	toppingsTitle.classList.add('food-item');
	toppingsTitle.textContent = 'Toppings';
	toppingsContainer.appendChild(toppingsTitle);

	const toppingsPrice = document.createElement('span');
	toppingsPrice.textContent = " " + toppings.price;
	toppingsPrice.classList.add('small-red');
	toppingsTitle.appendChild(toppingsPrice);

	const toppingsList = document.createElement('div');
	toppingsList.classList.add('toppings-list');

	toppings.items.forEach((topping) => {
		const toppingItem = document.createElement('span');
		toppingItem.classList.add('topping-item');
		toppingItem.textContent = topping;

		toppingsList.appendChild(toppingItem);
	});

	toppingsContainer.appendChild(toppingsList);

	return toppingsContainer;
}

function displayPasta() {
	const pastas = ['Spaghetti', 'Ziti', 'Penne', 'Rigatone', 'Cappelini', 'Linguini'];

	const pastaContainer = document.createElement('div');
	pastaContainer.classList.add('toppings-container');

	const pastaList = document.createElement('div');
	pastaList.classList.add('toppings-list');

	pastas.forEach((pasta) => {
		const pastaItem = document.createElement('span');
		pastaItem.classList.add('topping-item');
		pastaItem.textContent = pasta;

		pastaList.appendChild(pastaItem);
	});

	pastaContainer.appendChild(pastaList);

	return pastaContainer;
}

function displayServedWith(category) {
	const servedWith = {
		"gourmet-pizza": {
			"served-with": ""
		},
		"specialty-pizza": {
			"served-with": ""
		},
		"salads": {
			"served-with": "Served with bread"
		},
		"pasta": {
			"served-with": "Served with salad or soup and bread"
		},
		"soups": {
			"served-with": ""
		},
		"appetizers": {
			"served-with": ""
		},
		"sandwiches": {
			"served-with": ""
		},
		"rolls": {
			"served-with": ""
		},
		"vegetarian-dishes": {
			"served-with": "Served with pasta or salad"
		},
		"heroes": {
			"served-with": ""
		},
		"seafood": {
			"served-with": "Served with bread and salad"
		},
		"chicken-dishes": {
			"served-with": "Served with pasta or salad"
		},
		"sausage": {
			"served-with": ""
		}
	}

	if (servedWith[category]["served-with"]) {
		const servedWithElement = document.createElement('span');
		servedWithElement.classList.add('small-red');
		servedWithElement.classList.add('served-with');
		servedWithElement.textContent = servedWith[category]["served-with"];

		return servedWithElement;
	}

	return;
}

// if (menuItem.item === 'served-with') {
// 	const servedWith = document.createElement('span');
// 	servedWith.classList.add('small-red');
// 	servedWith.classList.add('served-with');
// 	servedWith.textContent = menuItem.text;

// 	parentElement.appendChild(servedWith);

// 	return;
// }
