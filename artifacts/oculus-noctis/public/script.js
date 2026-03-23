document.addEventListener('DOMContentLoaded', function () {

    /* ===========================
       HAMBURGER MENU (all pages)
    =========================== */
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
    const navOverlay = document.getElementById('nav-overlay');

    if (hamburger && navbar) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navbar.classList.toggle('active');
            if (navOverlay) navOverlay.classList.toggle('active');
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', function () {
            hamburger && hamburger.classList.remove('active');
            navbar && navbar.classList.remove('active');
            navOverlay.classList.remove('active');
        });
    }

    /* ===========================
       PRODUCT MODAL (index only)
    =========================== */
    const modal = document.getElementById('product-modal');
    const cartModal = document.getElementById('cart-modal');

    if (!modal) return; // Skip modal logic on non-index pages

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

    if (cartIcon) {
        cartIcon.addEventListener('click', function (e) {
            e.preventDefault();
            displayCart();
            cartModal.classList.add('show');
        });
    }

    document.querySelectorAll('.cart').forEach(icon => {
        icon.addEventListener('click', function (e) {
            e.preventDefault();
            openModal(this);
        });
    });

    document.querySelectorAll('button[data-name]').forEach(btn => {
        btn.addEventListener('click', function () {
            openModal(this);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', () => cartModal.classList.remove('show'));

    window.addEventListener('click', e => {
        if (e.target === modal) modal.classList.remove('show');
        if (e.target === cartModal) cartModal.classList.remove('show');
    });

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const qty = parseInt(document.getElementById('modal-quantity').value) || 1;
            const name = modalName.textContent;
            const image = modalImage.src;
            let priceStr = '';
            document.querySelectorAll('#product1 .pro, section .pro').forEach(pro => {
                if (pro.querySelector('h5') && pro.querySelector('h5').textContent === name) {
                    priceStr = pro.querySelector('h4') ? pro.querySelector('h4').textContent : '';
                }
            });
            addToCart(name, image, qty, priceStr);
            modal.classList.remove('show');
        });
    }

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }

    const newsletterBtn = document.querySelector('#newsletter button');
    if (newsletterBtn) {
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
    }

});

/* ===========================
   SHOP FILTER (shop.html)
=========================== */
document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
    const shopGrid = document.getElementById('shop-grid');
    const productCount = document.getElementById('product-count');
    const sortSelect = document.getElementById('sort-select');

    if (!shopGrid) return;

    const allProducts = Array.from(shopGrid.querySelectorAll('.pro'));

    function filterProducts(category) {
        let visible = 0;
        allProducts.forEach(pro => {
            if (category === 'all' || pro.dataset.category === category) {
                pro.style.display = '';
                visible++;
            } else {
                pro.style.display = 'none';
            }
        });
        if (productCount) {
            productCount.textContent = `Showing ${visible} product${visible !== 1 ? 's' : ''}`;
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterProducts(this.dataset.filter);
        });
    });

    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            const order = this.value;
            const visibleProducts = allProducts.filter(p => p.style.display !== 'none');

            visibleProducts.sort((a, b) => {
                const priceA = parseFloat(a.dataset.price);
                const priceB = parseFloat(b.dataset.price);
                const nameA = a.querySelector('h5').textContent;
                const nameB = b.querySelector('h5').textContent;

                if (order === 'price-asc') return priceA - priceB;
                if (order === 'price-desc') return priceB - priceA;
                if (order === 'name') return nameA.localeCompare(nameB);
                return 0;
            });

            visibleProducts.forEach(p => shopGrid.appendChild(p));
        });
    }

    const priceSlider = document.getElementById('price-slider');
    const priceMax = document.getElementById('price-max');

    if (priceSlider) {
        priceSlider.addEventListener('input', function () {
            const max = parseInt(this.value);
            priceMax.textContent = '$' + max;
            let visible = 0;
            allProducts.forEach(pro => {
                if (parseFloat(pro.dataset.price) <= max) {
                    if (pro.style.display !== 'none' || pro.dataset.hiddenByPrice !== 'true') {
                        pro.style.display = '';
                        visible++;
                    }
                } else {
                    pro.style.display = 'none';
                    pro.dataset.hiddenByPrice = 'true';
                }
            });
            if (productCount) {
                productCount.textContent = `Showing ${visible} product${visible !== 1 ? 's' : ''}`;
            }
        });
    }
});
