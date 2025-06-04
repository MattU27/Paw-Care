document.addEventListener('DOMContentLoaded', function() {
    // Dashboard Navigation
    const dashboardNavItems = document.querySelectorAll('.dashboard-nav li a');
    const dashboardSections = document.querySelectorAll('.dashboard-section');
    
    // Handle dashboard navigation clicks
    dashboardNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Get the section id from the href
            const hrefValue = this.getAttribute('href');
            
            // Check if it's an external link (e.g., shop.html, vetcare.html)
            if (hrefValue.includes('.html')) {
                // Let the browser handle external links normally
                return;
            }
            
            // Prevent default action for internal navigation
            e.preventDefault();
            
            // First hide all sections and remove active class from nav items
            dashboardNavItems.forEach(navItem => {
                navItem.parentElement.classList.remove('active');
            });
            
            dashboardSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Activate the clicked nav item
            this.parentElement.classList.add('active');
            
            // Show the corresponding section
            const sectionId = hrefValue;
            const targetSection = document.querySelector(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Scroll to top of the section on mobile
                if (window.innerWidth < 768) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Handle nav links from dashboard cards (e.g., "View All" links)
    const viewAllLinks = document.querySelectorAll('.dashboard-card .view-all');
    viewAllLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href');
            
            // Find and click the corresponding nav item
            dashboardNavItems.forEach(navItem => {
                if (navItem.getAttribute('href') === sectionId) {
                    navItem.click();
                }
            });
        });
    });
    
    // Handle buttons that trigger section changes
    const actionButtons = document.querySelectorAll('.dashboard-content button[data-section]');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                // Find and click the corresponding nav item
                dashboardNavItems.forEach(navItem => {
                    if (navItem.getAttribute('href') === sectionId) {
                        navItem.click();
                    }
                });
            }
        });
    });
    
    // Handle logout button click
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real application, this would call an API to logout
            // For now we'll just redirect to the homepage
            window.location.href = '../index.html';
        });
    }
    
    // Handle health record tabs
    const healthRecordTabs = document.querySelectorAll('.health-record-tabs .tab-btn');
    
    healthRecordTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            healthRecordTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Here you would load the health records for the selected pet
            // This is a placeholder for future backend integration
            const petId = this.getAttribute('data-pet');
            console.log(`Loading health records for pet: ${petId}`);
            
            // For now just show a message in the console
            // In a real app, this would fetch data from a server
        });
    });
    
    // Add to cart functionality in recommended products
    const addToCartButtons = document.querySelectorAll('.product-slide .btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productSlide = this.closest('.product-slide');
            const productName = productSlide.querySelector('h4').textContent;
            const productPrice = productSlide.querySelector('.product-price').textContent;
            const productImage = productSlide.querySelector('img').src;
            
            // This would typically add the item to the cart via the main cart functionality
            // For now, just show a message
            this.textContent = 'Added!';
            this.classList.add('added');
            
            // Reset button after 1.5 seconds
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.classList.remove('added');
            }, 1500);
            
            console.log(`Added to cart: ${productName} - ${productPrice}`);
            
            // Trigger a custom event that the main cart script could listen for
            const addToCartEvent = new CustomEvent('dashboard-add-to-cart', {
                detail: {
                    name: productName,
                    price: productPrice,
                    image: productImage
                }
            });
            
            document.dispatchEvent(addToCartEvent);
        });
    });

    // Handle Settings menu tabs
    const settingsMenuItems = document.querySelectorAll('.settings-menu li');
    const settingsPanels = document.querySelectorAll('.settings-panel');
    
    if (settingsMenuItems.length > 0) {
        settingsMenuItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all menu items
                settingsMenuItems.forEach(menuItem => {
                    menuItem.classList.remove('active');
                });
                
                // Add active class to clicked menu item
                this.classList.add('active');
                
                // Hide all panels
                settingsPanels.forEach(panel => {
                    panel.classList.remove('active');
                });
                
                // Show the selected panel
                const targetPanel = this.getAttribute('data-target');
                document.getElementById(targetPanel).classList.add('active');
            });
        });
    }
    
    // Handle appointment tabs
    const appointmentTabs = document.querySelectorAll('.appointment-tab');
    if (appointmentTabs.length > 0) {
        appointmentTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                appointmentTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Here you would fetch and display appointments based on the selected tab
                console.log(`Showing ${this.textContent.trim()} appointments`);
                
                // For a complete implementation, you would fetch data and update the UI
                // For now, we're just changing the active state
            });
        });
    }
    
    // Handle orders filter dropdown
    const orderFilterDropdown = document.querySelector('.filter-dropdown');
    if (orderFilterDropdown) {
        orderFilterDropdown.addEventListener('change', function() {
            const selectedFilter = this.value;
            console.log(`Filtering orders by: ${selectedFilter}`);
            
            // For a complete implementation, you would filter the orders based on the selected value
            // For now, we're just logging the selected filter
            
            // Example of how you might filter orders:
            // const orderCards = document.querySelectorAll('.order-card');
            // orderCards.forEach(card => {
            //     const orderStatus = card.querySelector('.order-status').classList[1];
            //     card.style.display = (selectedFilter === 'all' || orderStatus === selectedFilter) ? 'block' : 'none';
            // });
        });
    }
    
    // Handle order search box
    const orderSearchBox = document.querySelector('.search-box input');
    const orderSearchButton = document.querySelector('.search-box button');
    
    if (orderSearchBox && orderSearchButton) {
        const searchOrders = () => {
            const searchTerm = orderSearchBox.value.trim().toLowerCase();
            console.log(`Searching for: ${searchTerm}`);
            
            // For a complete implementation, you would search orders based on the search term
            // For now, we're just logging the search term
        };
        
        orderSearchButton.addEventListener('click', searchOrders);
        orderSearchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchOrders();
            }
        });
    }
    
    // Handle pagination buttons
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    if (paginationButtons.length > 0) {
        paginationButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.classList.contains('active') || this.classList.contains('next')) {
                    return; // Skip if already active or it's the next button
                }
                
                // Remove active class from all pagination buttons
                paginationButtons.forEach(btn => {
                    if (!btn.classList.contains('next')) {
                        btn.classList.remove('active');
                    }
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // For a complete implementation, you would fetch and display the next page of orders
                console.log(`Showing page: ${this.textContent.trim()}`);
            });
        });
    }
    
    // Handle reward redemption
    const redeemButtons = document.querySelectorAll('.reward-card .btn:not(.disabled)');
    if (redeemButtons.length > 0) {
        redeemButtons.forEach(button => {
            button.addEventListener('click', function() {
                const rewardCard = this.closest('.reward-card');
                const rewardName = rewardCard.querySelector('h4').textContent;
                const pointsRequired = rewardCard.querySelector('.points-required').textContent;
                
                console.log(`Redeeming: ${rewardName} (${pointsRequired})`);
                
                // Show a confirmation or success message
                const originalText = this.textContent;
                this.textContent = 'Redeeming...';
                this.disabled = true;
                
                // Simulate a server request with a timeout
                setTimeout(() => {
                    this.textContent = 'Redeemed!';
                    this.classList.add('disabled');
                    
                    // In a real application, you would update the user's points and available rewards
                    // after successful redemption
                }, 1500);
            });
        });
    }
    
    // Handle color theme selection in settings
    const colorOptions = document.querySelectorAll('.color-option');
    if (colorOptions.length > 0) {
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all color options
                colorOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Get the color class
                const colorClass = this.querySelector('.color-circle').classList[1];
                console.log(`Selected color accent: ${colorClass}`);
                
                // For a complete implementation, you would apply the selected color accent to the UI
                // This might involve changing CSS variables or adding a class to the body element
            });
        });
    }
    
    // Handle password strength meter
    const newPasswordInput = document.getElementById('new-password');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', function() {
            const password = this.value;
            const strengthMeter = document.querySelector('.strength-meter');
            const strengthText = document.querySelector('.strength-text');
            const strengthSegments = document.querySelectorAll('.strength-segment');
            
            // Simple password strength calculation
            let strength = 0;
            
            if (password.length >= 8) strength++;
            if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
            if (password.match(/\d/)) strength++;
            if (password.match(/[^a-zA-Z0-9]/)) strength++;
            
            // Update the strength meter UI
            strengthSegments.forEach((segment, index) => {
                if (index < strength) {
                    segment.style.backgroundColor = getStrengthColor(strength);
                } else {
                    segment.style.backgroundColor = '#e0e0e0';
                }
            });
            
            // Update the strength text
            const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
            if (password.length > 0) {
                strengthText.textContent = `Password strength: ${strengthLabels[strength - 1] || 'Very Weak'}`;
            } else {
                strengthText.textContent = 'Password strength: Choose a password';
            }
        });
    }
    
    function getStrengthColor(strength) {
        switch(strength) {
            case 1: return '#ff4d4d'; // Weak - Red
            case 2: return '#ffa64d'; // Fair - Orange
            case 3: return '#99cc00'; // Good - Light Green
            case 4: return '#00cc44'; // Strong - Green
            default: return '#e0e0e0'; // Default - Gray
        }
    }
    
    // Handle theme selector
    const themeSelectors = document.querySelectorAll('.theme-selector');
    if (themeSelectors.length > 0) {
        themeSelectors.forEach(selector => {
            selector.addEventListener('click', function() {
                // Remove active class from all selectors
                themeSelectors.forEach(sel => sel.classList.remove('active'));
                
                // Add active class to clicked selector
                this.classList.add('active');
                
                // Apply the selected theme
                const themeType = this.classList.contains('dark') ? 'dark' : 
                                 this.classList.contains('light') ? 'light' : 'system';
                
                console.log(`Theme changed to: ${themeType}`);
                
                // Apply theme immediately for preview
                if (themeType === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    if (themeToggle && themeToggle.querySelector('i')) {
                        const themeIcon = themeToggle.querySelector('i');
                        themeIcon.classList.remove('fa-moon');
                        themeIcon.classList.add('fa-sun');
                    }
                } else if (themeType === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                    if (themeToggle && themeToggle.querySelector('i')) {
                        const themeIcon = themeToggle.querySelector('i');
                        themeIcon.classList.remove('fa-sun');
                        themeIcon.classList.add('fa-moon');
                    }
                } else if (themeType === 'system') {
                    // Check system preference
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
                    
                    if (themeToggle && themeToggle.querySelector('i')) {
                        const themeIcon = themeToggle.querySelector('i');
                        if (prefersDark) {
                            themeIcon.classList.remove('fa-moon');
                            themeIcon.classList.add('fa-sun');
                        } else {
                            themeIcon.classList.remove('fa-sun');
                            themeIcon.classList.add('fa-moon');
                        }
                    }
                }
            });
        });
    }

    // Handle "Add New Pet" button click
    const addPetButton = document.querySelector('.add-pet');
    if (addPetButton) {
        addPetButton.addEventListener('click', function() {
            // Find and click the My Pets nav item
            dashboardNavItems.forEach(navItem => {
                if (navItem.getAttribute('href') === '#my-pets') {
                    navItem.click();
                }
            });
        });
    }

    // Make sure the first dashboard section is active by default
    if (dashboardSections.length > 0 && !document.querySelector('.dashboard-section.active')) {
        dashboardSections[0].classList.add('active');
        
        // Also make sure the corresponding nav item is active
        if (dashboardNavItems.length > 0) {
            dashboardNavItems[0].parentElement.classList.add('active');
        }
    }

    // Handle pet management functionality
    const addNewPetBtn = document.getElementById('addNewPetBtn');
    const addPetCard = document.getElementById('addPetCard');
    const addPetForm = document.getElementById('addPetForm');
    const cancelAddPet = document.getElementById('cancelAddPet');
    const healthRecordsSection = document.getElementById('healthRecordsSection');
    const petNameForRecords = document.getElementById('petNameForRecords');
    
    // Show the add pet form when clicking the Add New Pet button or card
    if (addNewPetBtn) {
        addNewPetBtn.addEventListener('click', function() {
            addPetForm.style.display = 'block';
            window.scrollTo({
                top: addPetForm.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    }
    
    if (addPetCard) {
        addPetCard.addEventListener('click', function() {
            addPetForm.style.display = 'block';
            window.scrollTo({
                top: addPetForm.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    }
    
    // Hide the add pet form when clicking Cancel
    if (cancelAddPet) {
        cancelAddPet.addEventListener('click', function() {
            addPetForm.style.display = 'none';
        });
    }
    
    // Handle file upload for pet photo
    const petPhotoInput = document.getElementById('pet-photo');
    const fileNameDisplay = document.querySelector('.file-name');
    
    if (petPhotoInput && fileNameDisplay) {
        petPhotoInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                fileNameDisplay.textContent = this.files[0].name;
                
                // For a complete implementation, you would handle the file preview here
                // const reader = new FileReader();
                // reader.onload = function(e) {
                //     // Display preview image
                // }
                // reader.readAsDataURL(this.files[0]);
            } else {
                fileNameDisplay.textContent = 'No file chosen';
            }
        });
    }
    
    // Show health records when clicking the Health Records button
    const healthRecordButtons = document.querySelectorAll('.pet-actions .secondary-btn');
    
    if (healthRecordButtons.length > 0) {
        healthRecordButtons.forEach(button => {
            button.addEventListener('click', function() {
                const petCard = this.closest('.pet-card');
                const petName = petCard.querySelector('h3').textContent;
                
                // Update the pet name in the health records section
                if (petNameForRecords) {
                    petNameForRecords.textContent = petName;
                }
                
                // Show the health records section
                if (healthRecordsSection) {
                    healthRecordsSection.style.display = 'block';
                    window.scrollTo({
                        top: healthRecordsSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Close the health records section
    const closeHealthRecordsBtn = document.querySelector('.health-records-section .close-section-btn');
    
    if (closeHealthRecordsBtn && healthRecordsSection) {
        closeHealthRecordsBtn.addEventListener('click', function() {
            healthRecordsSection.style.display = 'none';
        });
    }
    
    // Handle the shop category pills
    const categoryPills = document.querySelectorAll('.category-pill');
    
    if (categoryPills.length > 0) {
        categoryPills.forEach(pill => {
            pill.addEventListener('click', function() {
                // Remove active class from all pills
                categoryPills.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked pill
                this.classList.add('active');
                
                // In a complete implementation, you would filter the products based on the category
                console.log(`Filtering by category: ${this.textContent.trim()}`);
            });
        });
    }
    
    // Handle the add to cart buttons in the shop section
    const shopAddToCartButtons = document.querySelectorAll('#shop .product-card .btn');
    
    if (shopAddToCartButtons.length > 0) {
        shopAddToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.price').textContent;
                const productImage = productCard.querySelector('img').src;
                
                // Show added to cart confirmation
                const originalText = this.textContent;
                this.textContent = 'Added!';
                this.classList.add('added');
                
                // Reset button after 1.5 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('added');
                }, 1500);
                
                // In a complete implementation, you would add the product to the cart
                console.log(`Added to cart: ${productName} - ${productPrice}`);
                
                // Trigger a custom event that the main cart script could listen for
                const addToCartEvent = new CustomEvent('dashboard-add-to-cart', {
                    detail: {
                        name: productName,
                        price: productPrice,
                        image: productImage
                    }
                });
                
                document.dispatchEvent(addToCartEvent);
                
                // Update cart badge
                const cartBadge = document.querySelector('.cart-badge');
                if (cartBadge) {
                    const currentCount = parseInt(cartBadge.textContent) || 0;
                    cartBadge.textContent = currentCount + 1;
                }
            });
        });
    }
    
    // Handle service filters in the Vet Care section
    const serviceFilters = document.querySelectorAll('.service-filter');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (serviceFilters.length > 0 && serviceCards.length > 0) {
        serviceFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                serviceFilters.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                // Get the filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter the service cards
                serviceCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Handle booking form for Vet Care
    const bookServiceButtons = document.querySelectorAll('.book-service-btn');
    const appointmentForm = document.getElementById('appointmentForm');
    const cancelBookingBtn = document.getElementById('cancelBooking');
    const closeFormBtn = document.querySelector('.close-form-btn');
    
    if (bookServiceButtons.length > 0 && appointmentForm) {
        bookServiceButtons.forEach(button => {
            button.addEventListener('click', function() {
                const serviceCard = this.closest('.service-card');
                const serviceName = serviceCard.querySelector('h3').textContent;
                
                // Pre-select the service in the form
                const serviceTypeSelect = document.getElementById('service-type');
                if (serviceTypeSelect) {
                    for (let i = 0; i < serviceTypeSelect.options.length; i++) {
                        if (serviceTypeSelect.options[i].text === serviceName) {
                            serviceTypeSelect.selectedIndex = i;
                            break;
                        }
                    }
                }
                
                // Show the appointment booking form
                appointmentForm.style.display = 'block';
                window.scrollTo({
                    top: appointmentForm.offsetTop - 100,
                    behavior: 'smooth'
                });
            });
        });
    }
    
    // Close the appointment booking form
    if (cancelBookingBtn && appointmentForm) {
        cancelBookingBtn.addEventListener('click', function() {
            appointmentForm.style.display = 'none';
        });
    }
    
    if (closeFormBtn && appointmentForm) {
        closeFormBtn.addEventListener('click', function() {
            appointmentForm.style.display = 'none';
        });
    }
    
    // Also handle the "Schedule Appointment" button in the header
    const scheduleAppointmentBtn = document.querySelector('#vetcare .dashboard-header .btn');
    
    if (scheduleAppointmentBtn && appointmentForm) {
        scheduleAppointmentBtn.addEventListener('click', function() {
            appointmentForm.style.display = 'block';
            window.scrollTo({
                top: appointmentForm.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    }
}); 