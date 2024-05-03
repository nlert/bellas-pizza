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
					foodItem.textContent = menuItem.item;
					foodRow.appendChild(foodItem);

					const divider = document.createElement('div');
					divider.classList.add('divider');
					foodRow.appendChild(divider);

					const itemPrice = document.createElement('p');

					if (category === 'specialty-pizza') {
						itemPrice.textContent = '$' + menuItem.priceLg.toFixed(2);
					} else {
						itemPrice.textContent = '$' + menuItem.price.toFixed(2);
					}

					foodRow.appendChild(itemPrice);

					parentElement.appendChild(foodRow);
                    menuElement.appendChild(parentElement);
				});
			}
		}
	})
    .then(() => {
        setTimeout(() => {
            fadeIn();
        }, 50);
    })

function fadeIn() {
    document.querySelectorAll('.fade-in').forEach(element => {
        element.classList.add("show");
    })
} 
