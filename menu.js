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
                heading.textContent = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

                parentElement.appendChild(heading)

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

					const itemPrice = document.createElement('p');
					itemPrice.classList.add('item-price');

					if (category === 'specialty-pizza') {
						itemPrice.textContent = '$' + menuItem.priceLg.toFixed(2);
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
