const products = [
    { id: 1, name: 'BRINJAL 1kg',category:'Vegetables', price: 40, image: '/static/images/1.png' },
    { id: 2, name: 'ONION 1kg',category:'Vegetables', price: 75, image: '/static/images/2.png' },
    { id: 3, name: 'STRAWBERRY 1kg',category:'Fruits', price: 35, image: '/static/images/3.png' },
    { id: 4, name: 'CAULIFLOWER 1kg',category:'Vegetables', price: 15, image: '/static/images/4.png' },
    { id: 5, name: 'PUMPKIN 1kg',category:'Vegetables', price: 25, image: '/static/images/5.png' },
    { id: 6, name: 'SUNFLOWER OIL 1kg', category:'Oil',price: 180, image: '/static/images/6.png' },
    { id: 7, name: 'COCACOLA 1liter',category:'Snacks', price: 25, image: '/static/images/7.png' },
    { id: 8, name: 'Doughnut 1kg',category:'Snacks', price: 80, image: '/static/images/8.png' },
    { id: 9, name: 'RUSK 1', category:'Snacks',price: 55, image: '/static/images/9.png' },
    { id: 10, name: 'APPLE 1kg',category:'Fruits', price: 60, image: '/static/images/10.png' },
     { id: 11, name: 'FROOTI 500ML',category:'Snacks', price: 35, image: '/static/images/11.png' },
    { id: 12, name: 'SPRITE 1L',category:'Snacks', price: 40, image: '/static/images/12.png' },
    { id: 13, name: 'MANGO 1kg',category:'Fruits', price: 30, image: '/static/images/13.png' },
    { id: 14, name: 'BANANA 1kg',category:'Fruits', price: 25, image: '/static/images/14.png' },
    { id: 15, name: 'BROCCOLI 1kg',category:'Vegetables', price: 55, image: '/static/images/15.png' },
    { id: 15, name: 'SPINACH',category:'Vegetables', price: 20, image: '/static/images/16.png' },
    { id: 17, name: 'VIMBAR 1',category:'products', price: 35, image: '/static/images/17.png' },
    { id: 18, name: 'DOMEX 1',category:'products', price: 45, image: '/static/images/18.png' },
    { id: 19, name: 'MOSAMBI 1kg',category:'Fruits', price: 45, image: '/static/images/19.png' },
    { id: 20, name: 'CUPCAKES 1kg',category:'Snacks', price: 80, image: '/static/images/20.png' },
    { id: 21, name: 'MIRANDA 1L',category:'Snacks', price: 30, image: '/static/images/21.png' },
    { id: 22, name: 'PEDIGREE 1kg', category:'products',price: 150, image: '/static/images/22.png'},
    { id: 23, name: 'VIM LIQUID 1liter', category:'products',price: 110, image: '/static/images/23.png' },
    { id: 24, name: 'ODONIL 1', price: 30,category:'products', image: '/static/images/24.png' },
    { id: 25, name: 'NOODELS 1',category:'Snacks', price: 40, image: '/static/images/25.jpg' }
    

    ];
    document.addEventListener('DOMContentLoaded', function () {
        const productGallery = document.getElementById('productGallery');
        const searchInput = document.querySelector('.fa');
        const categoryLinks = document.querySelectorAll('.sub-dropdown a');
        populateProductGallery(products);
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
            productGallery.innerHTML = '';
            populateProductGallery(filteredProducts);
        });
        categoryLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                const selectedCategory = this.textContent;
                const filteredProducts = products.filter(product => product.category === selectedCategory);
                productGallery.innerHTML = '';
                populateProductGallery(filteredProducts);
            });
        });
    });
    function populateProductGallery(productsToDisplay) {
        productsToDisplay.forEach(product => {
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
    }
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