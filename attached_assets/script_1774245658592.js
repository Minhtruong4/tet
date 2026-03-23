document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('product-modal');
    const cartModal = document.getElementById('cart-modal');
    const modalImage = document.getElementById('modal-image');
    const modalName = document.getElementById('modal-name');
    const modalShortDesc = document.getElementById('modal-short-desc');
    const modalLongDesc = document.getElementById('modal-long-desc');
    const modalActions = document.querySelector('.modal-actions');
    const closeBtn = document.querySelector('#product-modal .close');
    const cartCloseBtn = document.querySelector('#cart-modal .close');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const cartIcon = document.getElementById('cart-icon');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    let cart = [];

    function updateCartCount() {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (total > 0) {
            cartCount.textContent = total;
            cartCount.classList.add('visible');
        } else {
            cartCount.classList.remove('visible');
        }
    }

    function openModal(trigger) {
        const proDiv = trigger.closest('.pro');
        const isProduct = !!proDiv;
        const imgSrc = isProduct ? proDiv.querySelector('img').src : '';
        modalImage.src = imgSrc;
        modalImage.style.display = imgSrc ? 'block' : 'none';

        if (isProduct) {
            modalName.textContent = proDiv.querySelector('h5').textContent;
            modalShortDesc.textContent = proDiv.querySelector('span').textContent;
            modalLongDesc.textContent = proDiv.dataset.longDesc || '';
        } else {
            modalName.textContent = trigger.dataset.name;
            modalShortDesc.textContent = trigger.dataset.shortDesc;
            modalLongDesc.textContent = trigger.dataset.longDesc;
        }

        modalActions.style.display = isProduct ? 'flex' : 'none';
        document.getElementById('modal-quantity').value = 1;
        modal.classList.add('show');
    }

    function addToCart(name, image, quantity, priceText) {
        const priceMatch = priceText.match(/[\d.]+/);
        const price = priceMatch ? parseFloat(priceMatch[0]) : 0;
        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({ name, image, quantity, price });
        }
        updateCartCount();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartCount();
        displayCart();
    }

    function displayCart() {
        cartItems.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Qty: ${item.quantity}</p>
                        <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                `;
                cartItems.appendChild(itemDiv);
                total += item.price * item.quantity;
            });
        }

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                removeFromCart(parseInt(this.dataset.index));
            });
        });
    }

    // Cart icon click
    cartIcon.addEventListener('click', function (e) {
        e.preventDefault();
        displayCart();
        cartModal.classList.add('show');
    });

    // Product cart icons
    document.querySelectorAll('.cart').forEach(icon => {
        icon.addEventListener('click', function (e) {
            e.preventDefault();
            openModal(this);
        });
    });

    // Buttons with data-name (About, Collections)
    document.querySelectorAll('button[data-name]').forEach(btn => {
        btn.addEventListener('click', function () {
            openModal(this);
        });
    });

    // Close modals
    closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    cartCloseBtn.addEventListener('click', () => cartModal.classList.remove('show'));
    window.addEventListener('click', e => {
        if (e.target === modal) modal.classList.remove('show');
        if (e.target === cartModal) cartModal.classList.remove('show');
    });

    // Add to cart from product modal
    addToCartBtn.addEventListener('click', () => {
        const qty = parseInt(document.getElementById('modal-quantity').value) || 1;
        const name = modalName.textContent;
        const image = modalImage.src;
        const priceText = modalLongDesc.closest('.modal-details')
            ? modalShortDesc.closest('.modal-details')
                ? modalShortDesc.textContent
                : ''
            : '';
        // Find price from product card
        const allProducts = document.querySelectorAll('#product1 .pro');
        let priceStr = '';
        allProducts.forEach(pro => {
            if (pro.querySelector('h5') && pro.querySelector('h5').textContent === name) {
                priceStr = pro.querySelector('h4') ? pro.querySelector('h4').textContent : '';
            }
        });
        addToCart(name, image, qty, priceStr);
        modal.classList.remove('show');
    });

    // Checkout
    document.getElementById('checkout-btn').addEventListener('click', () => {
        alert('Checkout functionality coming soon.');
    });

    // Newsletter
    const newsletterBtn = document.querySelector('#newsletter button');
    newsletterBtn.addEventListener('click', () => {
        const emailInput = document.querySelector('#newsletter input');
        const email = emailInput.value.trim();
        if (email && email.includes('@')) {
            alert('Thank you for subscribing to Oculus Noctis!');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
});