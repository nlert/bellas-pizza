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

				if (category === "specialty-pizza") {
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
					if (menuItem.item === "Toppings") {
						const toppingsContainer = document.createElement('div');
						toppingsContainer.classList.add('toppings-container');

						const toppingsTitle = document.createElement('p');
						toppingsTitle.classList.add('food-item');
						toppingsTitle.textContent = menuItem.item + " ";
						toppingsContainer.appendChild(toppingsTitle);

						const toppingsPrice = document.createElement('span');
						toppingsPrice.textContent = menuItem.price;
						toppingsPrice.classList.add('small-red');
						toppingsTitle.appendChild(toppingsPrice);

						const toppingsList = displayToppingsList(menuItem.toppings);
						toppingsContainer.appendChild(toppingsList);

						parentElement.appendChild(toppingsContainer);

						return;
					}

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
                        largePrice.textContent = `$${menuItem["priceLg"].toFixed(2)}`;
                        itemPrice.appendChild(largePrice);

                        const medPrice = document.createElement('p');
                        medPrice.textContent = `$${menuItem["priceMed"].toFixed(2)}`;
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

function displayToppingsList(toppings) {
	const toppingsList = document.createElement('div');
	toppingsList.classList.add('toppings-list');

	toppings.forEach((topping) => {
		const toppingItem = document.createElement('span');
		toppingItem.classList.add('topping-item');
		toppingItem.textContent = topping;

		toppingsList.appendChild(toppingItem);
	});

	return toppingsList;
}
