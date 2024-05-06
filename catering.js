const menuElement = document.getElementById('menu');

fetch('catering.json')
	.then((response) => response.json())
	.then((data) => {
		for (const category in data.menu) {
			if (data.menu.hasOwnProperty(category)) {
				const parentElement = document.createElement('div');
                parentElement.id = category;

                parentElement.classList.add('menu-category');
                parentElement.classList.add('fade-in');

                const heading = document.createElement('h2');
                heading.textContent = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

                parentElement.appendChild(heading)

                if (category === 'meatless-dishes' || category === 'pasta-trays' || category === 'meat-trays') {
                    const fakeRow = document.createElement('div');
                    fakeRow.classList.add('food-row');
                    fakeRow.classList.add('fake-row');

                    const fakeItem = document.createElement('div');
					fakeRow.appendChild(fakeItem);

                    const fakeDivider = document.createElement('div');
					fakeRow.appendChild(fakeDivider);

                    const halfWhole = document.createElement('div');
					halfWhole.classList.add('price-wrapper');

                    const wholeTitle = document.createElement('p');
                    wholeTitle.textContent = 'Whole';
                    wholeTitle.classList.add('small-text');
                    halfWhole.appendChild(wholeTitle);

                    const halfTitle = document.createElement('p');
                    halfTitle.textContent = 'Half';
                    halfTitle.classList.add('small-text');
                    halfWhole.appendChild(halfTitle);

                    fakeRow.appendChild(halfWhole);

                    parentElement.appendChild(fakeRow);
                } else if (category === 'antipasto-platters') {
                    const fakeRow = document.createElement('div');
                    fakeRow.classList.add('food-row');
                    fakeRow.classList.add('fake-row');

                    const fakeItem = document.createElement('div');
					fakeRow.appendChild(fakeItem);

                    const fakeDivider = document.createElement('div');
					fakeRow.appendChild(fakeDivider);

                    const sml = document.createElement('div');
					sml.classList.add('price-wrapper-sml');

                    const largeTitle = document.createElement('p');
                    largeTitle.textContent = 'Large';
                    largeTitle.classList.add('small-text');
                    sml.appendChild(largeTitle);

                    const mediumTitle = document.createElement('p');
                    mediumTitle.textContent = 'Med';
                    mediumTitle.classList.add('small-text');
                    sml.appendChild(mediumTitle);

                    const smallTitle = document.createElement('p');
                    smallTitle.textContent = 'Small';
                    smallTitle.classList.add('small-text');
                    sml.appendChild(smallTitle);

                    fakeRow.appendChild(sml);

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
					
					if (category === 'appetizers-/-side-dishes') {
                        itemPrice.textContent = `$${menuItem.price} for ${menuItem.pieces} pieces`;
					} else if (category === 'meatless-dishes' || category === 'pasta-trays' || category === 'meat-trays') {
                        itemPrice = document.createElement('div');
                        itemPrice.classList.add('price-wrapper');

                        const wholePrice = document.createElement('p');
                        wholePrice.textContent = `$${menuItem["price-whole"]}`;
                        itemPrice.appendChild(wholePrice);

                        const halfPrice = document.createElement('p');
                        halfPrice.textContent = `$${menuItem["price-half"]}`;
                        itemPrice.appendChild(halfPrice);
                    } else if (category === 'antipasto-platters') {
                        itemPrice = document.createElement('div');
                        itemPrice.classList.add('price-wrapper-sml');

                        const largePrice = document.createElement('p');
                        largePrice.textContent = `$${menuItem['price-lg']}`;
                        itemPrice.appendChild(largePrice);

                        const mediumPrice = document.createElement('p');
                        mediumPrice.textContent = `$${menuItem['price-md']}`;
                        itemPrice.appendChild(mediumPrice);

                        const smallPrice = document.createElement('p');
                        smallPrice.textContent = `$${menuItem['price-sm']}`;
                        itemPrice.appendChild(smallPrice);
                    } else if (category === 'party-subs') {
                        itemPrice.textContent = `$${menuItem.price} / foot`;
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
                    menuElement.appendChild(parentElement);
				});
			}
		}
	})
    .then(() => {
        setTimeout(() => {
            fadeIn();
			underlineNavLinks()
        }, 50);
    })

function fadeIn() {
    document.querySelectorAll('.fade-in').forEach(element => {
        element.classList.add("show");
    })
} 

function underlineNavLinks() {
	const categories = document.querySelectorAll('.menu-category');
	const navLinks = document.querySelectorAll('.menu-nav-link');

	window.addEventListener('scroll', () => {
		const scrollPosition = window.scrollY + 125;

		categories.forEach(category => {
			const categoryTop = category.offsetTop;
			const categoryBottom = categoryTop + category.clientHeight;

			if (categoryTop < scrollPosition && categoryBottom > scrollPosition) {
				navLinks.forEach(link => link.classList.remove('active'));
				document.getElementById(`nav-${category.id}`).classList.add('active');
			}
		})
	})
}
