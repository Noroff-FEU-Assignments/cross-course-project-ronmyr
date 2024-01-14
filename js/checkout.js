document.addEventListener('DOMContentLoaded', function () {
    const buyNowButtons = document.querySelectorAll('.cta-button');
    const cartCounter = document.querySelector('.cart-counter');
    const cartContainer = document.querySelector('.cart-container');
    const cartForm = document.getElementById('cart');
    const detailsTitle = document.querySelector('.title');
    const detailsPrice = document.querySelector('.details h4');
    const cartItemTotal = document.querySelector('.cart-item-total');
    const cartItemContainer = document.querySelector('.cart-item');
    const totalPriceElement = document.querySelector('.total-price');

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};

    updateCounterAndTotal();
    displayCartItems();

    buyNowButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const price = parseFloat(detailsPrice.textContent.replace('$', '').trim());
            const title = detailsTitle.textContent.trim();

            if (cartItems.hasOwnProperty(title)) {
                cartItems[title]++;
            } else {
                cartItems[title] = 1;
            }
            updateCounterAndTotal();
            displayCartItems();

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        });
    });

    cartContainer.addEventListener('click', function () {
        if (cartForm.style.display === 'block') {
            cartForm.style.display = 'none';
        } else {
            cartForm.style.display = 'block';
            displayCartItems();
        }
    });

    cartItemContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('fa-regular') && event.target.classList.contains('fa-trash-can')) {
            const title = detailsTitle.textContent.trim();
            if (cartItems.hasOwnProperty(title) && cartItems[title] > 0) {
                cartItems[title]--;
                if (cartItems[title] === 0) {
                    delete cartItems[title];
                }
                updateCounterAndTotal();
                displayCartItems();

                localStorage.setItem('cartItems', JSON.stringify(cartItems));

                // Legg til denne linjen for å skjule kurvformularet når det er tomt
                if (Object.keys(cartItems).length === 0) {
                    cartForm.style.display = 'none';
                }
            }
        }
    });

    function updateCounterAndTotal() {
        cartCounter.textContent = Object.values(cartItems).reduce((acc, val) => acc + val, 0);
        updateCartItemTotal();
    }

    function updateCartItemTotal() {
        const quantity = parseInt(cartCounter.textContent) || 0;
        const price = parseFloat(detailsPrice.textContent.replace('$', '').trim());
        const total = quantity * price;

        if (cartItemTotal) {
            cartItemTotal.textContent = `Total: ${quantity} items - ${total.toFixed(2)} $`;
        }

        if (totalPriceElement) {
            totalPriceElement.textContent = `Total Price: ${total.toFixed(2)} $`;
        }
    }

    function displayCartItems() {
        while (cartItemContainer.firstChild) {
            cartItemContainer.removeChild(cartItemContainer.firstChild);
        }

        for (const [title, quantity] of Object.entries(cartItems)) {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `<p class="cart-item-text">${title} x${quantity} <i class="fa-regular fa-trash-can" aria-hidden="true"></i></p>`;
            cartItemContainer.appendChild(cartItem);
        }
    }
});
