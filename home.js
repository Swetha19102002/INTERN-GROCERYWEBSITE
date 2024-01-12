const products = [
    { id: 1, name: 'SUNFLOWER OIL 1kg', price: 180, image: './images/1.png' },
    { id: 2, name: 'PEDIGREE 1kg', price: 150, image: './images/2.png' },
    { id: 3, name: 'VIM LIQUID 1liter', price: 110, image: './images/3.png' },
    { id: 4, name: 'ODONIL 1', price: 30, image: './images/4.png' },
    { id: 5, name: 'COCACOLA 1liter', price: 25, image: './images/5.png' },
    { id: 6, name: 'Doughnut 1kg', price: 80, image: './images/6.png' },
    { id: 6, name: 'RUSK 1', price: 55, image: './images/7.png' },
    { id: 6, name: 'APPLE 1kg', price: 60, image: './images/8.png' },
    { id: 6, name: 'BRINJAL 1kg', price: 40, image: './images/9.png' },
    { id: 6, name: 'ONION 1kg', price: 75, image: './images/10.png' },
    ];
document.addEventListener('DOMContentLoaded', function () {
    const productGallery = document.getElementById('productGallery');

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.name;
        productImage.classList.add('product-image');
        productCard.appendChild(productImage);

        const productDetails = document.createElement('div');
        productDetails.classList.add('product-details');

        const productName = document.createElement('h3');
        productName.textContent = product.name;
        productDetails.appendChild(productName);

        const productPrice = document.createElement('p');
        productPrice.textContent = ` ₹ ${product.price.toFixed(2)}`;
        productDetails.appendChild(productPrice);

        const cartButton = document.createElement('button');
        cartButton.textContent = 'Add to Cart';
        cartButton.classList.add('cart-btn');
        cartButton.addEventListener('click', () => {
            addToCart(product);
            showPopup(`${product.name} added to cart successfully!`);
        });
        productDetails.appendChild(cartButton);

        productCard.appendChild(productDetails);
        productGallery.appendChild(productCard);
    });
});

function addToCart(product) {
    
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cartItems.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1; 
    } else {
      
        cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
}

function showPopup(message) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.textContent = message;
    
    document.body.appendChild(popup);

    const leftPos = (window.innerWidth - popup.offsetWidth) / 2;
    const topPos = (window.innerHeight - popup.offsetHeight) / 2;
    popup.style.left = `${leftPos}px`;
    popup.style.top = `${topPos}px`;

    setTimeout(() => {
        document.body.removeChild(popup);
    }, 5000);
}