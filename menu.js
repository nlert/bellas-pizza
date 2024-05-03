fetch('menu.json')
	.then((response) => response.json())
	.then((data) => {
		for (const category in data.menu) {
			if (data.menu.hasOwnProperty(category)) {
				const parentElement = document.getElementById(category);

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
				});
			}
		}
	})
	.then(() => {
        document.querySelectorAll('.fade-in').forEach(element => {
            element.classList.add("show");
        });
    });
