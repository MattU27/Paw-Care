document.addEventListener('DOMContentLoaded', function() {
    // API URL
    const API_URL = 'http://localhost:3000/api';
    
    // User data storage
    const users = JSON.parse(localStorage.getItem('pawcare_users')) || [];
    
    // Form elements
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');
    
    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Helper function to show error message
    function showError(element, message) {
        // Check if error element already exists
        let errorElement = element.parentElement.querySelector('.error-message');
        
        if (!errorElement) {
            // Create error element if it doesn't exist
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = '#ff3860';
            errorElement.style.fontSize = '0.8rem';
            errorElement.style.marginTop = '5px';
            element.parentElement.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        element.style.borderColor = '#ff3860';
    }
    
    // Helper function to clear error message
    function clearError(element) {
        const errorElement = element.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
        }
        element.style.borderColor = '';
    }
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to validate password strength
    function isStrongPassword(password) {
        // Password must be at least 8 characters
        return password.length >= 8;
    }
    
    // Sign up form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fullname = document.getElementById('fullname').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const termsChecked = document.getElementById('terms').checked;
            
            // Validate form inputs
            let isValid = true;
            
            // Validate name
            if (fullname === '') {
                showError(document.getElementById('fullname'), 'Please enter your full name');
                isValid = false;
            } else {
                clearError(document.getElementById('fullname'));
            }
            
            // Validate email
            if (email === '') {
                showError(document.getElementById('signup-email'), 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError(document.getElementById('signup-email'), 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(document.getElementById('signup-email'));
            }
            
            // Validate password
            if (password === '') {
                showError(document.getElementById('signup-password'), 'Please enter a password');
                isValid = false;
            } else if (!isStrongPassword(password)) {
                showError(document.getElementById('signup-password'), 'Password must be at least 8 characters');
                isValid = false;
            } else {
                clearError(document.getElementById('signup-password'));
            }
            
            // Validate confirm password
            if (confirmPassword === '') {
                showError(document.getElementById('confirm-password'), 'Please confirm your password');
                isValid = false;
            } else if (password !== confirmPassword) {
                showError(document.getElementById('confirm-password'), 'Passwords do not match');
                isValid = false;
            } else {
                clearError(document.getElementById('confirm-password'));
            }
            
            // Validate terms
            if (!termsChecked) {
                showError(document.getElementById('terms'), 'You must agree to the Terms of Service');
                isValid = false;
            } else {
                clearError(document.getElementById('terms'));
            }
            
            // If form is valid, register user
            if (isValid) {
                // Show loading state
                const submitBtn = signupForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = 'Creating Account...';
                submitBtn.disabled = true;
                
                // Send registration request to API
                fetch(`${API_URL}/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fullname,
                        email,
                        password
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'User registered successfully') {
                        // Store user info in session storage
                        sessionStorage.setItem('pawcare_current_user', JSON.stringify({
                            id: data.user.id,
                            name: `${data.user.firstName} ${data.user.lastName}`,
                            email: data.user.email
                        }));
                        
                        // Show success message
                        alert('Registration successful! Welcome to PawCare Connect.');
                        
                        // Redirect to login success page
                        window.location.href = "login-success.html";
                    } else {
                        // Show error message
                        showError(document.getElementById('signup-email'), data.message || 'Registration failed');
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                    }
                })
                .catch(error => {
                    console.error('Registration error:', error);
                    showError(document.getElementById('signup-email'), 'An error occurred during registration. Please try again.');
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
            }
        });
    }
    
    // Sign in form submission
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember').checked;
            
            // Validate form inputs
            let isValid = true;
            
            // Validate email
            if (email === '') {
                showError(document.getElementById('email'), 'Please enter your email address');
                isValid = false;
            } else {
                clearError(document.getElementById('email'));
            }
            
            // Validate password
            if (password === '') {
                showError(document.getElementById('password'), 'Please enter your password');
                isValid = false;
            } else {
                clearError(document.getElementById('password'));
            }
            
            // If form is valid, attempt login
            if (isValid) {
                // Show loading state
                const submitBtn = signinForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = 'Signing In...';
                submitBtn.disabled = true;
                
                // Send login request to API
                fetch(`${API_URL}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'Login successful') {
                        // Store user info in session storage
                        sessionStorage.setItem('pawcare_current_user', JSON.stringify({
                            id: data.user.id,
                            name: data.user.name,
                            email: data.user.email
                        }));
                        
                        // If remember me is checked, store in local storage too
                        if (rememberMe) {
                            localStorage.setItem('pawcare_remembered_user', JSON.stringify({
                                id: data.user.id,
                                name: data.user.name,
                                email: data.user.email
                            }));
                        } else {
                            localStorage.removeItem('pawcare_remembered_user');
                        }
                        
                        // Redirect to login success page
                        window.location.href = "login-success.html";
                    } else {
                        // Show error message
                        showError(document.getElementById('password'), data.message || 'Login failed');
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                    }
                })
                .catch(error => {
                    console.error('Login error:', error);
                    showError(document.getElementById('password'), 'An error occurred during login. Please try again.');
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
            }
        });
    }
    
    // Links to switch between sign in and sign up
    const showSignupLink = document.getElementById('showSignup');
    const showSigninLink = document.getElementById('showSignin');
    
    if (showSignupLink) {
        showSignupLink.addEventListener('click', function(e) {
            e.preventDefault();
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            document.querySelector('[data-tab="signup"]').classList.add('active');
            document.getElementById('signup').classList.add('active');
        });
    }
    
    if (showSigninLink) {
        showSigninLink.addEventListener('click', function(e) {
            e.preventDefault();
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            document.querySelector('[data-tab="signin"]').classList.add('active');
            document.getElementById('signin').classList.add('active');
        });
    }
    
    // Check if user is already logged in
    function checkLoggedInUser() {
        const currentUser = JSON.parse(sessionStorage.getItem('pawcare_current_user'));
        const rememberedUser = JSON.parse(localStorage.getItem('pawcare_remembered_user'));
        
        if (currentUser || rememberedUser) {
            // User is already logged in, redirect to login success page
            window.location.href = "login-success.html";
        }
    }
    
    // Check login status on page load
    checkLoggedInUser();
    
    // Social login buttons (placeholders for future implementation)
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Social login will be implemented in the future.');
        });
    });
    
    // Pre-fill LeBron's credentials for demo purposes
    const lebronDemoBtn = document.createElement('button');
    lebronDemoBtn.textContent = 'Demo Login (LeBron)';
    lebronDemoBtn.className = 'btn secondary-btn';
    lebronDemoBtn.style.width = '100%';
    lebronDemoBtn.style.marginTop = '10px';
    
    lebronDemoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('email').value = 'lebron@example.com';
        document.getElementById('password').value = 'password123';
    });
    
    // Add the demo button after the signin button
    if (signinForm) {
        const signinButton = signinForm.querySelector('button[type="submit"]');
        signinButton.parentNode.insertBefore(lebronDemoBtn, signinButton.nextSibling);
    }
}); 