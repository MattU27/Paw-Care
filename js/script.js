document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        
        // Check for saved theme preference or use OS preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set initial theme
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (themeIcon.classList.contains('fa-moon')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            if (themeIcon.classList.contains('fa-sun')) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
        
        // Handle theme toggle
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Update document theme
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Update toggle icon
            if (newTheme === 'dark') {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
            
            // Save preference to localStorage
            localStorage.setItem('theme', newTheme);
        });
    }

    // Open cart function
    function openCart() {
        if (cartPopup) {
            cartPopup.classList.add('open');
            document.body.classList.add('cart-open');
        }
    }
    window.openCart = openCart; // Expose to window

    // Close cart function
    function closeCart() {
        if (cartPopup) {
            cartPopup.classList.remove('open');
            document.body.classList.remove('cart-open');
        }
    }
    window.closeCart = closeCart; // Expose to window

    // Cart Functionality - Use the existing functions
    const cartButton = document.querySelector('.cart-button');
    const cartPopup = document.getElementById('cartPopup');
    const closeCartButton = document.querySelector('.close-cart');
    
    if (cartButton && cartPopup) {
        cartButton.addEventListener('click', function(e) {
            if (e.preventDefault) e.preventDefault();
            openCart();
        });
        
        if (closeCartButton) {
            closeCartButton.addEventListener('click', closeCart);
            
            // Add hover effect to close button
            closeCartButton.addEventListener('mouseover', function() {
                this.style.backgroundColor = '#f0f0f0';
            });
            
            closeCartButton.addEventListener('mouseout', function() {
                this.style.backgroundColor = '';
            });
        }
        
        // Close cart when clicking outside
        document.addEventListener('click', function(event) {
            if (cartPopup.classList.contains('open') && 
                !event.target.closest('.cart-popup-content') && 
                !event.target.closest('.cart-button')) {
                closeCart();
            }
        });
    }

    // Mobile Navigation Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            mainNav.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', 
                mainNav.classList.contains('active') ? 'true' : 'false');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-nav') && !event.target.closest('.menu-toggle')) {
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        }
    });

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tab content
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Show tab content for clicked tab
            const tabId = this.getAttribute('data-tab');
            const activeTabContent = document.getElementById(tabId);
            if (activeTabContent) {
                activeTabContent.classList.add('active');
            }
        });
    });

    // Product Carousel
    const carouselPrev = document.querySelector('.carousel-arrow.prev');
    const carouselNext = document.querySelector('.carousel-arrow.next');
    const productContainer = document.querySelector('.product-container');
    
    if (carouselPrev && carouselNext && productContainer) {
        // Auto-scroll carousel
        let autoScrollInterval;
        
        const startAutoScroll = () => {
            autoScrollInterval = setInterval(() => {
                const scrollAmount = productContainer.offsetWidth;
                const maxScroll = productContainer.scrollWidth - productContainer.offsetWidth;
                
                if (productContainer.scrollLeft >= maxScroll - 10) {
                    productContainer.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    productContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }, 5000);
        };
        
        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
        };
        
        // Start auto-scroll
        startAutoScroll();
        
        // Stop auto-scroll on hover
        productContainer.addEventListener('mouseenter', stopAutoScroll);
        productContainer.addEventListener('mouseleave', startAutoScroll);
        
        carouselNext.addEventListener('click', function() {
            stopAutoScroll();
            const scrollAmount = productContainer.offsetWidth;
            productContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            setTimeout(startAutoScroll, 3000);
        });
        
        carouselPrev.addEventListener('click', function() {
            stopAutoScroll();
            const scrollAmount = productContainer.offsetWidth;
            productContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            setTimeout(startAutoScroll, 3000);
        });
    }

    // Service Filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked filter button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Add fade effect to cards
            serviceCards.forEach(card => {
                card.classList.add('filtering');
                
                setTimeout(() => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.remove('filtering');
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature, .service-card, .product-card, .category-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            // Check if element is in viewport
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.classList.add('in-view');
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Cart data
    let cartItems = [];
    window.cartItems = cartItems; // Expose to window for dashboard.js to access
    
    let cartSubtotal = 0;
    let cartCount = 0;
    let discountApplied = 0;
    let isFirstTimeDiscount = false;
    const cartBadge = document.querySelector('.cart-badge');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartSubtotalElement = document.getElementById('cartSubtotal');
    const cartDiscountElement = document.getElementById('cartDiscount');
    const discountRow = document.getElementById('discountRow');
    const promoCodeInput = document.getElementById('promoCodeInput');
    const applyPromoBtn = document.getElementById('applyPromoBtn');
    const firstBuyerDiscount = document.querySelector('.first-buyer-discount');
    
    // Available promo codes (normally would be in a database)
    const promoCodes = {
        'WELCOME10': 10,
        'PAWCARE20': 20,
        'FREESHIP': 5
    };
    
    // Create a checkout modal if it doesn't exist
    let checkoutModal = document.getElementById('checkoutModal');
    if (!checkoutModal) {
        checkoutModal = document.createElement('div');
        checkoutModal.id = 'checkoutModal';
        checkoutModal.classList.add('modal-overlay');
        
        checkoutModal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-header">
                    <h3 class="modal-title">Sign in Required</h3>
                </div>
                <div class="modal-body">
                    <p>Please sign in to complete your purchase or booking.</p>
                </div>
                <div class="modal-footer">
                    <button class="modal-btn secondary" id="cancelCheckoutBtn">Cancel</button>
                    <button class="modal-btn primary" id="proceedSignInBtn">Sign In</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(checkoutModal);
    }
    
    const cancelCheckoutBtn = document.getElementById('cancelCheckoutBtn');
    const proceedSignInBtn = document.getElementById('proceedSignInBtn');
    
    // For backwards compatibility with the cart overlay
    let cartOverlay = document.querySelector('.cart-overlay');
    if (!cartOverlay) {
        cartOverlay = document.createElement('div');
        cartOverlay.classList.add('cart-overlay');
        document.body.appendChild(cartOverlay);
    }
    
    cartOverlay.addEventListener('click', function() {
        closeCart();
    });

    // Add to cart functionality
    document.querySelectorAll('.btn.primary-btn').forEach(button => {
        if (button.textContent.trim() === 'Add to Cart') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const productCard = this.closest('.product-card');
                if (!productCard) return;
                
                const productName = productCard.querySelector('h3').textContent;
                const productPriceElement = productCard.querySelector('.price');
                const productImage = productCard.querySelector('img').src;
                
                if (!productPriceElement) return;
                
                const productPrice = productPriceElement.textContent;
                const price = parseFloat(productPrice.replace(/[^\d.-]/g, ''));
                
                if (isNaN(price)) return;
                
                cartItems.push({
                    name: productName,
                    price: '$' + price.toFixed(2),
                    numericPrice: price,
                    image: productImage
                });
                
                updateCartPrices();
                cartCount++;
                
                updateCartBadge();
                updateCartItems();
                
                // Simple animation
                this.textContent = 'Added!';
                this.classList.add('added');
                
                setTimeout(() => {
                    this.textContent = 'Add to Cart';
                    this.classList.remove('added');
                }, 1500);
            });
        }
    });
    
    // Listen for custom add-to-cart events from dashboard.js
    document.addEventListener('dashboard-add-to-cart', function(e) {
        if (e.detail) {
            cartItems.push({
                name: e.detail.name,
                price: e.detail.price,
                numericPrice: e.detail.numericPrice || parseFloat(e.detail.price.replace(/[^\d.-]/g, '')),
                image: e.detail.image
            });
            
            cartCount++;
            updateCartPrices();
            updateCartBadge();
            updateCartItems();
        }
    });
    
    // Apply promo code
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', function() {
            const code = promoCodeInput.value.trim().toUpperCase();
            
            if (promoCodes[code]) {
                // Apply discount
                const discount = promoCodes[code];
                discountApplied = (cartSubtotal * discount) / 100;
                isFirstTimeDiscount = false;
                
                // Show success message
                alert(`Promo code applied! ${discount}% discount`);
                
                // Update cart
                updateCartPrices();
                updateCartItems();
            } else {
                alert('Invalid promo code');
            }
        });
    }
    
    // Apply first-time buyer discount
    if (firstBuyerDiscount) {
        firstBuyerDiscount.addEventListener('click', function() {
            // In a real app, we'd check if user is actually a first-time buyer
            const discount = 15;
            discountApplied = (cartSubtotal * discount) / 100;
            isFirstTimeDiscount = true;
            
            // Update cart
            updateCartPrices();
            updateCartItems();
            
            // Show feedback
            alert('First-time buyer discount applied! 15% OFF');
        });
    }
    
    // Update cart prices
    function updateCartPrices() {
        cartSubtotal = 0;
        
        cartItems.forEach(item => {
            if (item.numericPrice) {
                cartSubtotal += item.numericPrice;
            }
        });
        
        // Calculate total after discount
        const cartTotal = Math.max(0, cartSubtotal - discountApplied);
        
        // Update totals
        if (cartSubtotalElement) {
            cartSubtotalElement.textContent = `$${cartSubtotal.toFixed(2)}`;
        }
        if (cartTotalElement) {
            cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
        }
    }
    window.updateCartPrices = updateCartPrices; // Expose to window
    
    // Update cart badge
    function updateCartBadge() {
        if (cartBadge) {
            cartBadge.textContent = cartCount;
            
            // Show/hide badge based on count
            if (cartCount > 0) {
                cartBadge.style.display = 'flex';
            } else {
                cartBadge.style.display = 'none';
            }
        }
    }
    window.updateCartBadge = updateCartBadge; // Expose to window
    
    // Update cart items
    function updateCartItems() {
        if (!cartItemsList) return;
        
        cartItemsList.innerHTML = '';
        
        if (cartItems.length === 0) {
            cartItemsList.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
            return;
        }
        
        cartItems.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            
            cartItemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">${item.price}</p>
                </div>
                <button class="remove-item" data-index="${index}">&times;</button>
            `;
            
            cartItemsList.appendChild(cartItemElement);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeCartItem(index);
            });
        });
        
        // Show/hide discount row based on whether discount is applied
        if (discountRow) {
            if (discountApplied > 0) {
                discountRow.style.display = 'flex';
                if (cartDiscountElement) {
                    cartDiscountElement.textContent = `-$${discountApplied.toFixed(2)}`;
                }
            } else {
                discountRow.style.display = 'none';
            }
        }
    }
    window.updateCartItems = updateCartItems; // Expose to window

    // Remove item from cart
    function removeCartItem(index) {
        const item = cartItems[index];
        if (!item) return;
        
        cartItems.splice(index, 1);
        cartCount--;
        
        // Recalculate totals
        updateCartPrices();
        updateCartBadge();
        updateCartItems();
    }
    window.removeCartItem = removeCartItem; // Expose to window

    // Custom Modal Functions
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    // Checkout function
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            openModal('checkoutModal');
        });
    }
    
    // Cancel checkout
    if (cancelCheckoutBtn) {
        cancelCheckoutBtn.addEventListener('click', function() {
            closeModal('checkoutModal');
        });
    }
    
    // Proceed to sign in
    if (proceedSignInBtn) {
        proceedSignInBtn.addEventListener('click', function() {
            window.location.href = window.location.pathname.includes('/pages/') 
                ? 'auth.html' 
                : 'pages/auth.html';
        });
    }

    // Initialize cart
    updateCartItems();

    // Book Now functionality 
    document.querySelectorAll('.btn.primary-btn, .vet-card .secondary-btn').forEach(button => {
        if (button.textContent.trim() === 'Book Now' || button.textContent.trim() === 'Book Appointment') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get service details (if available)
                let serviceName = '';
                let servicePrice = '';
                const serviceCard = this.closest('.service-card');
                
                if (serviceCard) {
                    serviceName = serviceCard.querySelector('h3').textContent || '';
                    servicePrice = serviceCard.querySelector('.service-price').textContent || '';
                }
                
                // Create booking confirmation modal if it doesn't exist
                let bookingModal = document.getElementById('bookingModal');
                if (!bookingModal) {
                    bookingModal = document.createElement('div');
                    bookingModal.id = 'bookingModal';
                    bookingModal.classList.add('modal-overlay');
                    
                    const modalContent = `
                        <div class="modal-dialog">
                            <div class="modal-header">
                                <h3 class="modal-title">Sign in Required</h3>
                            </div>
                            <div class="modal-body">
                                <p>Please sign in to book ${serviceName}</p>
                                <p>${servicePrice}</p>
                            </div>
                            <div class="modal-footer">
                                <button class="modal-btn secondary" id="cancelBookingBtn">Cancel</button>
                                <button class="modal-btn primary" id="proceedBookingBtn">Sign In</button>
                            </div>
                        </div>
                    `;
                    
                    bookingModal.innerHTML = modalContent;
                    document.body.appendChild(bookingModal);
                    
                    // Add event listeners
                    document.getElementById('cancelBookingBtn').addEventListener('click', function() {
                        closeModal('bookingModal');
                    });
                    
                    document.getElementById('proceedBookingBtn').addEventListener('click', function() {
                        window.location.href = window.location.pathname.includes('/pages/') 
                            ? 'auth.html' 
                            : 'pages/auth.html';
                    });
                } else {
                    // Update modal content if it exists
                    const modalBody = bookingModal.querySelector('.modal-body');
                    if (modalBody) {
                        modalBody.innerHTML = `
                            <p>Please sign in to book ${serviceName}</p>
                            <p>${servicePrice}</p>
                        `;
                    }
                }
                
                openModal('bookingModal');
            });
        }
    });

    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide and activate the dot
        if (testimonialSlides[index]) {
            testimonialSlides[index].style.display = 'block';
            dots[index].classList.add('active');
        }
    }

    // Initialize the slider
    if (testimonialSlides.length > 0) {
        // Show the first slide initially
        showSlide(currentSlide);
        
        // Set up dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Auto slide
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // Handle search button click
    const searchButtons = document.querySelectorAll('.search-button');
    searchButtons.forEach(button => {
        button.addEventListener('click', function() {
            openSearchOverlay();
        });
    });

    // Create and setup search overlay
    function openSearchOverlay() {
        // Check if overlay already exists
        let searchOverlay = document.getElementById('searchOverlay');
        
        if (!searchOverlay) {
            // Create overlay if it doesn't exist
            searchOverlay = document.createElement('div');
            searchOverlay.id = 'searchOverlay';
            searchOverlay.className = 'search-overlay';
            
            searchOverlay.innerHTML = `
                <div class="search-container">
                    <div class="search-header">
                        <h3>Search PawCare Connect</h3>
                        <button class="close-search">&times;</button>
                    </div>
                    <div class="search-form">
                        <input type="text" id="searchInput" placeholder="Search for products, services, or information...">
                        <button id="submitSearch"><i class="fas fa-search"></i></button>
                    </div>
                    <div class="quick-links">
                        <h4>Popular Searches</h4>
                        <div class="quick-links-grid">
                            <a href="pages/shop.html" class="quick-link">Dog Food</a>
                            <a href="pages/shop.html" class="quick-link">Cat Toys</a>
                            <a href="pages/vetcare.html" class="quick-link">Vaccinations</a>
                            <a href="pages/vetcare.html" class="quick-link">Grooming</a>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(searchOverlay);
            
            // Add event listeners
            const closeBtn = searchOverlay.querySelector('.close-search');
            const searchInput = searchOverlay.querySelector('#searchInput');
            const submitBtn = searchOverlay.querySelector('#submitSearch');
            
            closeBtn.addEventListener('click', closeSearchOverlay);
            
            submitBtn.addEventListener('click', function() {
                performSearch(searchInput.value);
            });
            
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch(searchInput.value);
                }
            });
            
            // Focus on input after creating overlay
            setTimeout(() => {
                searchInput.focus();
            }, 100);
        }
        
        // Show overlay
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeSearchOverlay() {
        const searchOverlay = document.getElementById('searchOverlay');
        if (searchOverlay) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    function performSearch(query) {
        if (!query || query.trim() === '') {
            alert('Please enter a search term');
            return;
        }
        
        console.log(`Searching for: ${query}`);
        // In a real implementation, you would redirect to a search results page
        // For now, let's just redirect to shop page
        window.location.href = window.location.pathname.includes('/pages/') 
            ? 'shop.html' 
            : 'pages/shop.html';
    }
}); 