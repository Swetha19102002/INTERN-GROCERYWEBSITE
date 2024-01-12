document.addEventListener('DOMContentLoaded', function () {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    cartItems.forEach(cartItem => {
        const cartItemCard = createCartItemCard(cartItem);
        cartItemsContainer.appendChild(cartItemCard);
    });
    updateGrandTotal(cartItems);
});
function createCartItemCard(cartItem) {
    const cartItemCard = document.createElement('div');
    cartItemCard.classList.add('cart-item-card');

    const cartItemImage = document.createElement('img');
    cartItemImage.src = cartItem.image;
    cartItemImage.alt = cartItem.name;
    cartItemImage.classList.add('cart-item-image');
    cartItemCard.appendChild(cartItemImage);

    const cartItemDetails = document.createElement('div');
    cartItemDetails.classList.add('cart-item-details');

    const cartItemName = document.createElement('h3');
    cartItemName.textContent = cartItem.name;
    cartItemDetails.appendChild(cartItemName);

    const cartItemPrice = document.createElement('p');
    cartItemPrice.textContent = ` ₹ ${cartItem.price.toFixed(2)}`;
    cartItemDetails.appendChild(cartItemPrice);

    const quantityControls = createQuantityControls(cartItem);
    cartItemDetails.appendChild(quantityControls);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn');
    removeButton.addEventListener('click', () => removeCartItem(cartItem));
    cartItemDetails.appendChild(removeButton);

    const totalPriceDisplay = document.createElement('p');
    totalPriceDisplay.textContent = `Total: ₹${calculateTotalPrice(cartItem)}`;
    cartItemDetails.appendChild(totalPriceDisplay);

    cartItemCard.appendChild(cartItemDetails);
    return cartItemCard;
}
function createQuantityControls(cartItem) {
    const quantityControls = document.createElement('div');
    quantityControls.classList.add('quantity-controls');

    const decreaseButton = document.createElement('button');
    decreaseButton.textContent = '-';
    decreaseButton.addEventListener('click', function () {
        handleQuantityChange(cartItem, -1);
    });
    quantityControls.appendChild(decreaseButton);

    const quantityDisplay = document.createElement('span');
    quantityDisplay.textContent = cartItem.quantity;
    quantityControls.appendChild(quantityDisplay);

    const increaseButton = document.createElement('button');
    increaseButton.textContent = '+';
    increaseButton.addEventListener('click', function () {
        handleQuantityChange(cartItem, 1);
    });
    quantityControls.appendChild(increaseButton);

    return quantityControls;
}
function handleQuantityChange(cartItem, change) {
    if (cartItem.quantity + change > 0) {
        cartItem.quantity += change;
        updateCartItem(cartItem);
        updateCart();
    }
}
function removeCartItem(cartItem) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cartItems.filter(item => item.id !== cartItem.id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCart();
}
function updateCartItem(cartItem) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cartItems.map(item => (item.id === cartItem.id ? cartItem : item));
    localStorage.setItem('cart', JSON.stringify(updatedCart));
}
function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    localStorage.setItem('cart', JSON.stringify(cartItems));

    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; 
   
    cartItems.forEach(cartItem => {
        const cartItemCard = createCartItemCard(cartItem);
        cartItemsContainer.appendChild(cartItemCard);
    });
    updateGrandTotal(cartItems);
}

function calculateTotalPrice(cartItem) {
    return (cartItem.price * cartItem.quantity).toFixed(2);
}

function updateGrandTotal(cartItems) {
    const grandTotalContainer = document.getElementById('grandTotal');
    let grandTotal = 0;

    cartItems.forEach(cartItem => {
        grandTotal += parseFloat(calculateTotalPrice(cartItem));
    });

    grandTotalContainer.textContent = `Grand Total: ₹${grandTotal.toFixed(2)}`;
}

