fetch('menu.json')
.then(response => response.json())
.then(data => {
    for (const category in data.menu) {
        if (data.menu.hasOwnProperty(category)) {
            const parentElement = document.getElementById(category);

            data.menu[category].forEach((menuItem) => {
                if (category === "specialty-pizza") {
                    return;
                }

                const foodRow = document.createElement('div');
                foodRow.classList.add('food-row');

                const foodItem = document.createElement('p');
                foodItem.textContent = menuItem.item;
                foodRow.appendChild(foodItem);

                const divider = document.createElement('div');
                divider.classList.add('divider');
                foodRow.appendChild(divider);

                const itemPrice = document.createElement('p');
                itemPrice.textContent = "$" + menuItem.price.toFixed(2);
                foodRow.appendChild(itemPrice);

                parentElement.appendChild(foodRow);
            })
        }
    }
})